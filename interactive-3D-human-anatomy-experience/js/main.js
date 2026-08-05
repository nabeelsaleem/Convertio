import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { ORGANS, getOrgan } from "./organData.js";
import { buildSpecimen } from "./organGeometry.js";

/* ============================================================
   Scene setup
============================================================ */
const canvas = document.getElementById("scene");
const viewport = document.querySelector(".viewport");

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.localClippingEnabled = true;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
const DEFAULT_CAM_POS = new THREE.Vector3(2.6, 1.4, 3.4);
camera.position.copy(DEFAULT_CAM_POS);

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 1.8;
controls.maxDistance = 8;
controls.target.set(0, 0, 0);
controls.autoRotateSpeed = 1.6;

/* ---- lighting ---- */
const key = new THREE.DirectionalLight(0xfff2e0, 2.2);
key.position.set(3, 4, 3);
key.castShadow = true;
key.shadow.mapSize.set(1024, 1024);
key.shadow.bias = -0.001;
scene.add(key);

const fill = new THREE.DirectionalLight(0x9fd8ff, 0.6);
fill.position.set(-4, 1.5, -2);
scene.add(fill);

const rim = new THREE.DirectionalLight(0x55d6c2, 0.9);
rim.position.set(-1, 2, -4);
scene.add(rim);

const ambient = new THREE.AmbientLight(0x223040, 0.5);
scene.add(ambient);

// soft contact shadow catcher
const shadowMat = new THREE.ShadowMaterial({ opacity: 0.28 });
const ground = new THREE.Mesh(new THREE.CircleGeometry(6, 48), shadowMat);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -1.7;
ground.receiveShadow = true;
scene.add(ground);

/* ============================================================
   Specimen root + state
============================================================ */
const specimenRoot = new THREE.Group();
scene.add(specimenRoot);

const clipPlane = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0);

const state = {
  organId: null,
  organ: null,
  meshes: [],
  hotspots: [],
  markerEls: new Map(),
  exploded: false,
  crossSection: false,
  markersVisible: true,
  ambient: true,
  selectedMarker: null,
  time: 0,
};

/* ============================================================
   Build / load a specimen
============================================================ */
function clearSpecimen() {
  for (const child of [...specimenRoot.children]) {
    specimenRoot.remove(child);
    child.traverse?.((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) {
        (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
      }
    });
  }
  document.getElementById("markerLayer").innerHTML = "";
  state.markerEls.clear();
}

function loadSpecimen(id) {
  const organ = getOrgan(id);
  state.organId = id;
  state.organ = organ;
  state.exploded = false;
  state.crossSection = false;
  state.selectedMarker = null;
  hideMarkerNote();
  clearSpecimen();

  const group = buildSpecimen(id);
  specimenRoot.add(group);
  state.group = group;
  state.meshes = [];
  group.traverse((o) => { if (o.isMesh) state.meshes.push(o); });

  buildMarkers(organ);
  updateDossier(organ);
  updateTopbar(organ);
  applyCrossSection(false);
  updateSidebarActive(id);

  // gentle intro: the animate() loop eases scale up from this on each frame
  group.scale.setScalar(0.001);
  group.userData.introStart = performance.now();
}

/* ============================================================
   Hotspot markers (2D overlay synced to 3D positions each frame)
============================================================ */
function buildMarkers(organ) {
  const layer = document.getElementById("markerLayer");
  organ.hotspots.forEach((h) => {
    const el = document.createElement("div");
    el.className = "marker";
    el.style.setProperty("--marker-color", organ.accent);
    el.innerHTML = `<span class="marker-ping"></span><span class="marker-dot"></span><span class="marker-label">${h.label}</span>`;
    el.addEventListener("click", () => selectMarker(h, el));
    layer.appendChild(el);
    state.markerEls.set(h.id, { el, hotspot: h });
  });
}

function selectMarker(hotspot, el) {
  document.querySelectorAll(".marker.selected").forEach((n) => n.classList.remove("selected"));
  el.classList.add("selected");
  state.selectedMarker = hotspot.id;
  document.getElementById("markerNoteEyebrow").textContent = `◆ ${state.organ.name.toUpperCase()} MARKER`;
  document.getElementById("markerNoteTitle").textContent = hotspot.label;
  document.getElementById("markerNoteDesc").textContent = hotspot.desc;
  document.getElementById("markerNote").hidden = false;
  showDossier();
}
function hideMarkerNote() {
  document.getElementById("markerNote").hidden = true;
}
document.getElementById("markerNoteClose").addEventListener("click", () => {
  hideMarkerNote();
  document.querySelectorAll(".marker.selected").forEach((n) => n.classList.remove("selected"));
});

const _v = new THREE.Vector3();
const _normal = new THREE.Vector3();
const _camDir = new THREE.Vector3();
function syncMarkers() {
  if (!state.markersVisible) return;
  const rect = viewport.getBoundingClientRect();
  state.markerEls.forEach(({ el, hotspot }) => {
    _v.set(...hotspot.position);
    // account for exploded offset so markers travel with their part
    _v.applyMatrix4(state.group.matrixWorld);
    _normal.set(...hotspot.position).normalize().transformDirection(state.group.matrixWorld);
    _camDir.copy(_v).sub(camera.position).normalize();
    const facing = _normal.dot(_camDir);

    const proj = _v.clone().project(camera);
    const x = (proj.x * 0.5 + 0.5) * rect.width;
    const y = (-proj.y * 0.5 + 0.5) * rect.height;
    const inFront = proj.z < 1;

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    const visible = inFront && facing < 0.35;
    el.style.opacity = visible ? "1" : "0";
    el.style.pointerEvents = visible ? "auto" : "none";
  });
}

/* ============================================================
   UI: sidebar
============================================================ */
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

function buildSidebar() {
  const list = document.getElementById("specimenList");
  list.innerHTML = "";
  ORGANS.forEach((organ, i) => {
    const item = document.createElement("div");
    item.className = "specimen-item";
    item.dataset.id = organ.id;
    item.innerHTML = `
      <span class="specimen-num">${ROMAN[i] || i + 1}</span>
      <span class="specimen-icon" style="color:${organ.accent}">${organ.icon}</span>
      <span class="specimen-meta">
        <span class="specimen-title">${organ.name}</span>
        <span class="specimen-system">${organ.system}</span>
      </span>
    `;
    item.addEventListener("click", () => {
      loadSpecimen(organ.id);
      document.querySelector(".rail-left").classList.remove("open");
      document.getElementById("navBackdrop")?.classList.remove("visible");
    });
    list.appendChild(item);
  });
}
function updateSidebarActive(id) {
  document.querySelectorAll(".specimen-item").forEach((el) => {
    el.classList.toggle("active", el.dataset.id === id);
  });
}

/* ============================================================
   UI: topbar + dossier
============================================================ */
function updateTopbar(organ) {
  const idx = ORGANS.findIndex((o) => o.id === organ.id);
  document.getElementById("specimenNum").textContent = ROMAN[idx] || idx + 1;
  document.getElementById("specimenName").textContent = organ.name;
  document.getElementById("specimenSystem").textContent = organ.system;
  document.getElementById("viewportCaption").textContent = `3D SPECIMEN · ${organ.name.toUpperCase()} · CLICK A MARKER TO EXPLORE`;
}

function updateDossier(organ) {
  document.getElementById("dossierEyebrow").textContent = `◆ ${organ.system.toUpperCase()}`;
  document.getElementById("dossierTitle").textContent = organ.name;
  document.getElementById("dossierTagline").textContent = organ.tagline;
  document.getElementById("dossierDesc").textContent = organ.description;
  document.getElementById("medText").textContent = organ.medical;
  document.getElementById("funText").textContent = organ.fun;

  const list = document.getElementById("factList");
  list.innerHTML = organ.facts
    .map((f) => `<li><span class="fact-key">${f.key}</span><span class="fact-val">${f.val}</span></li>`)
    .join("");
}

function showDossier() {
  document.getElementById("dossier").classList.remove("hidden");
}

/* ============================================================
   Toolbar actions
============================================================ */
function resetView() {
  animateCamera(DEFAULT_CAM_POS, new THREE.Vector3(0, 0, 0));
  state.exploded = false;
  state.crossSection = false;
  document.querySelector('[data-tool="exploded"]').classList.remove("active");
  document.querySelector('[data-tool="crosssection"]').classList.remove("active");
  applyCrossSection(false);
}

function animateCamera(pos, target, ms = 650) {
  const startPos = camera.position.clone();
  const startTarget = controls.target.clone();
  const t0 = performance.now();
  controls.enabled = false;
  function step() {
    const t = Math.min(1, (performance.now() - t0) / ms);
    const e = 1 - Math.pow(1 - t, 3);
    camera.position.lerpVectors(startPos, pos, e);
    controls.target.lerpVectors(startTarget, target, e);
    controls.update();
    if (t < 1) requestAnimationFrame(step);
    else controls.enabled = true;
  }
  step();
}

function applyCrossSection(on) {
  state.meshes.forEach((m) => {
    if (!m.material) return;
    m.material.clippingPlanes = on ? [clipPlane] : [];
    m.material.needsUpdate = true;
  });
}

function toggleExploded() {
  state.exploded = !state.exploded;
  document.querySelector('[data-tool="exploded"]').classList.toggle("active", state.exploded);
}

function toggleCrossSection() {
  state.crossSection = !state.crossSection;
  applyCrossSection(state.crossSection);
  document.querySelector('[data-tool="crosssection"]').classList.toggle("active", state.crossSection);
}

function toggleAutorotate() {
  controls.autoRotate = !controls.autoRotate;
  document.querySelector('[data-tool="autorotate"]').classList.toggle("active", controls.autoRotate);
}

function toggleMarkers() {
  state.markersVisible = !state.markersVisible;
  document.getElementById("markerLayer").style.display = state.markersVisible ? "block" : "none";
  document.querySelector('[data-tool="labels"]').classList.toggle("active", state.markersVisible);
}

document.querySelectorAll(".tool-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const tool = btn.dataset.tool;
    if (tool === "reset") resetView();
    if (tool === "autorotate") toggleAutorotate();
    if (tool === "crosssection") toggleCrossSection();
    if (tool === "exploded") toggleExploded();
    if (tool === "labels") toggleMarkers();
  });
});
document.querySelector('[data-tool="labels"]').classList.add("active");

/* misc chrome */
document.getElementById("tipClose").addEventListener("click", () => {
  document.getElementById("tipCard").classList.add("hidden");
});
document.getElementById("toggleInfoBtn").addEventListener("click", () => {
  document.getElementById("dossier").classList.toggle("hidden");
});
const menuToggleBtn = document.getElementById("menuToggleBtn");
const navBackdrop = document.getElementById("navBackdrop");
function toggleMobileNav(force) {
  const railLeft = document.querySelector(".rail-left");
  const open = force ?? !railLeft.classList.contains("open");
  railLeft.classList.toggle("open", open);
  navBackdrop?.classList.toggle("visible", open);
}
menuToggleBtn?.addEventListener("click", () => toggleMobileNav());
navBackdrop?.addEventListener("click", () => toggleMobileNav(false));
const ambientSwitch = document.getElementById("ambientSwitch");
ambientSwitch.classList.add("on");
ambientSwitch.addEventListener("click", () => {
  state.ambient = !state.ambient;
  ambientSwitch.classList.toggle("on", state.ambient);
});

/* ============================================================
   Resize
============================================================ */
function resize() {
  const rect = viewport.getBoundingClientRect();
  renderer.setSize(rect.width, rect.height, false);
  camera.aspect = rect.width / rect.height;
  camera.updateProjectionMatrix();
}
window.addEventListener("resize", resize);

/* ============================================================
   Animation loop
============================================================ */
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const dt = clock.getDelta();
  state.time += dt;

  controls.update();

  // exploded view: lerp each part toward/away from its explode offset
  if (state.meshes.length) {
    const explodeAmt = state.exploded ? 1 : 0;
    state.meshes.forEach((m) => {
      if (!m.userData.basePosition) return;
      const target = m.userData.basePosition.clone().addScaledVector(m.userData.explodeDir, explodeAmt * 0.9);
      m.position.lerp(target, 1 - Math.pow(0.001, dt));
    });
  }

  // intro pop-in + ambient "living specimen" breathing pulse, combined so
  // they never fight over the same scale value
  if (state.group) {
    const introT = Math.min(1, (performance.now() - (state.group.userData.introStart || 0)) / 480);
    const introEase = 1 - Math.pow(1 - introT, 3);
    const breathe = state.ambient ? 1 + Math.sin(state.time * 1.3) * 0.012 : 1;
    state.group.scale.setScalar(Math.max(0.001, introEase) * breathe);
  }

  syncMarkers();
  renderer.render(scene, camera);
}

/* ============================================================
   Boot
============================================================ */
buildSidebar();
resize();
loadSpecimen(ORGANS[0].id);
animate();

// Tell the inline watchdog in index.html that the app actually booted, so
// it doesn't fall back to the "failed to load" state after its timeout.
window.__corpusReady = true;

setTimeout(() => {
  document.getElementById("loading").classList.add("done");
}, 550);
