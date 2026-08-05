import * as THREE from "three";

/* ----------------------------------------------------------------------
   Small deterministic noise + geometry helpers.
   Nothing here depends on external assets — every specimen is generated
   procedurally so the whole project stays a handful of static files.
------------------------------------------------------------------------*/

function hash(x, y, z) {
  const s = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453;
  return s - Math.floor(s);
}

function noise3(x, y, z) {
  // smooth-ish pseudo noise built from layered sines — cheap and seamless
  // enough for organic-looking vertex displacement without a noise lib.
  const a = Math.sin(x * 1.7 + y * 2.3 - z * 1.1);
  const b = Math.sin(y * 2.1 - z * 1.9 + x * 0.7);
  const c = Math.sin(z * 1.3 + x * 2.6 + y * 1.4);
  const d = hash(Math.floor(x * 3), Math.floor(y * 3), Math.floor(z * 3)) * 2 - 1;
  return (a + b + c) / 3 * 0.75 + d * 0.25;
}

function deform(geometry, amp = 0.15, freq = 1.6, opts = {}) {
  const pos = geometry.attributes.position;
  const v = new THREE.Vector3();
  const squashY = opts.squashY ?? 1;
  const squashX = opts.squashX ?? 1;
  const squashZ = opts.squashZ ?? 1;
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const n = noise3(v.x * freq, v.y * freq, v.z * freq);
    v.addScaledVector(v.clone().normalize(), n * amp);
    v.x *= squashX; v.y *= squashY; v.z *= squashZ;
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geometry.computeVertexNormals();
  return geometry;
}

function organicMaterial(color, opts = {}) {
  return new THREE.MeshPhysicalMaterial({
    color,
    roughness: opts.roughness ?? 0.55,
    metalness: 0.0,
    clearcoat: opts.clearcoat ?? 0.35,
    clearcoatRoughness: 0.4,
    sheen: opts.sheen ?? 0.25,
    sheenColor: new THREE.Color(opts.sheenColor ?? color),
    transmission: opts.transmission ?? 0,
    thickness: opts.thickness ?? 0.5,
    ior: opts.ior ?? 1.3,
    transparent: !!opts.transparent,
    opacity: opts.opacity ?? 1,
    side: opts.side ?? THREE.FrontSide,
  });
}

function organicBlob(radius, { amp = 0.16, freq = 1.6, detail = 4, color = "#c06", squashX = 1, squashY = 1, squashZ = 1, ...mat } = {}) {
  const geo = new THREE.IcosahedronGeometry(radius, detail);
  deform(geo, amp, freq, { squashX, squashY, squashZ });
  const mesh = new THREE.Mesh(geo, organicMaterial(color, mat));
  mesh.castShadow = mesh.receiveShadow = true;
  return mesh;
}

function tube(points, radius, color, opts = {}) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
  const geo = new THREE.TubeGeometry(curve, opts.segments ?? 60, radius, 10, false);
  const mesh = new THREE.Mesh(geo, organicMaterial(color, { roughness: 0.4, clearcoat: 0.5, ...opts }));
  mesh.castShadow = mesh.receiveShadow = true;
  return mesh;
}

function taperedCylinder(rTop, rBottom, height, color, opts = {}) {
  const geo = new THREE.CylinderGeometry(rTop, rBottom, height, 16, 1, false);
  const mesh = new THREE.Mesh(geo, organicMaterial(color, opts));
  mesh.castShadow = mesh.receiveShadow = true;
  return mesh;
}

function lathe(points2d, color, opts = {}) {
  const pts = points2d.map(([x, y]) => new THREE.Vector2(x, y));
  const geo = new THREE.LatheGeometry(pts, opts.segments ?? 32);
  const mesh = new THREE.Mesh(geo, organicMaterial(color, opts));
  mesh.castShadow = mesh.receiveShadow = true;
  return mesh;
}

// Radial-gradient canvas texture, used for the eye's iris.
function irisTexture(baseColor, ringColor) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d");
  const cx = 128, cy = 128;
  const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 128);
  grad.addColorStop(0, "#0a0a0a");
  grad.addColorStop(0.28, "#0a0a0a");
  grad.addColorStop(0.34, ringColor);
  grad.addColorStop(0.7, baseColor);
  grad.addColorStop(1, ringColor);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = "rgba(0,0,0,0.25)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 90; i++) {
    const a = (i / 90) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * 40, cy + Math.sin(a) * 40);
    ctx.lineTo(cx + Math.cos(a) * 120, cy + Math.sin(a) * 120);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Registers a mesh into a group with an explode direction for the
// "exploded view" toolbar action.
function add(group, mesh, explodeDir = [0, 0, 0]) {
  mesh.userData.basePosition = mesh.position.clone();
  mesh.userData.explodeDir = new THREE.Vector3(...explodeDir);
  group.add(mesh);
  return mesh;
}

/* ----------------------------------------------------------------------
   Specimen builders — one per organ id in organData.js
------------------------------------------------------------------------*/

function buildHeart() {
  const g = new THREE.Group();
  const base = organicBlob(1.05, { amp: 0.14, freq: 1.9, color: "#a8433c", squashY: 1.15, squashZ: 0.9, roughness: 0.42, clearcoat: 0.55 });
  base.scale.set(1, 1.25, 1);
  base.position.y = -0.15;
  add(g, base, [0, -0.4, 0]);

  const leftAtrium = organicBlob(0.55, { amp: 0.18, color: "#8a3a3a", clearcoat: 0.5 });
  leftAtrium.position.set(-0.7, 0.75, 0.35);
  add(g, leftAtrium, [-0.6, 0.4, 0.3]);

  const rightAtrium = organicBlob(0.5, { amp: 0.18, color: "#7a4a56", clearcoat: 0.5 });
  rightAtrium.position.set(0.6, 0.85, -0.2);
  add(g, rightAtrium, [0.6, 0.4, -0.2]);

  const aorta = taperedCylinder(0.18, 0.24, 1.1, "#c76a58", { roughness: 0.4, clearcoat: 0.6 });
  aorta.position.set(0.1, 1.55, 0.1);
  aorta.rotation.z = 0.25;
  add(g, aorta, [0.1, 0.7, 0]);

  const pulmonary = taperedCylinder(0.15, 0.2, 0.9, "#6d7fae", { roughness: 0.4, clearcoat: 0.6 });
  pulmonary.position.set(-0.15, 1.5, -0.3);
  pulmonary.rotation.z = -0.3;
  add(g, pulmonary, [-0.3, 0.6, -0.2]);

  for (let i = 0; i < 3; i++) {
    const v = tube(
      [
        [0.2 - i * 0.1, 1.0, 0.9],
        [0.5 - i * 0.2, 0.3, 0.95],
        [0.3 - i * 0.15, -0.6, 0.8],
      ],
      0.045, "#6e2a2a", { roughness: 0.5 }
    );
    add(g, v, [0.2, 0, 0.3]);
  }
  return g;
}

function buildBrain() {
  const g = new THREE.Group();
  const cortex = organicBlob(1.2, { amp: 0.19, freq: 2.6, detail: 5, color: "#cf9aa8", squashY: 0.86, squashZ: 1.05, roughness: 0.6, clearcoat: 0.15, sheen: 0.4 });
  add(g, cortex, [0, 0.3, 0.4]);

  const cerebellum = organicBlob(0.55, { amp: 0.22, freq: 3.4, color: "#c589a0", clearcoat: 0.1 });
  cerebellum.position.set(0, -0.55, -0.95);
  cerebellum.scale.set(1.3, 0.85, 0.9);
  add(g, cerebellum, [0, -0.4, -0.6]);

  const stem = taperedCylinder(0.18, 0.3, 0.9, "#d0a6a6", { roughness: 0.55 });
  stem.position.set(0.05, -1.25, -0.1);
  stem.rotation.x = 0.35;
  add(g, stem, [0, -0.8, -0.1]);

  // longitudinal fissure — a thin dark groove mesh sitting in the midline
  const fissure = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 1.6, 1.9),
    new THREE.MeshPhysicalMaterial({ color: "#5f3a45", roughness: 0.8 })
  );
  fissure.position.y = 0.35;
  add(g, fissure, [0, 0, 0]);

  return g;
}

function buildLungs() {
  const g = new THREE.Group();
  const right = organicBlob(0.95, { amp: 0.13, freq: 2.0, color: "#e2a1a1", squashX: 0.75, squashY: 1.35, clearcoat: 0.3 });
  right.position.set(0.85, 0.0, 0.1);
  add(g, right, [0.6, 0, 0.1]);

  const left = organicBlob(0.85, { amp: 0.13, freq: 2.0, color: "#dd9797", squashX: 0.72, squashY: 1.25, clearcoat: 0.3 });
  left.position.set(-0.85, -0.05, 0.15);
  add(g, left, [-0.6, 0, 0.1]);

  const trachea = taperedCylinder(0.16, 0.19, 0.9, "#e6c9c0", { roughness: 0.4 });
  trachea.position.set(0, 1.35, 0.1);
  add(g, trachea, [0, 0.6, 0]);

  const bronchL = taperedCylinder(0.09, 0.15, 0.7, "#e6c9c0");
  bronchL.position.set(-0.35, 0.85, 0.15);
  bronchL.rotation.z = 0.55;
  add(g, bronchL, [-0.3, 0.3, 0]);

  const bronchR = taperedCylinder(0.09, 0.15, 0.7, "#e6c9c0");
  bronchR.position.set(0.35, 0.85, 0.15);
  bronchR.rotation.z = -0.55;
  add(g, bronchR, [0.3, 0.3, 0]);

  // fine surface vessels for detail, echoing the reference eye's vein look
  for (let i = 0; i < 5; i++) {
    const side = i % 2 === 0 ? 1 : -1;
    const v = tube(
      [
        [side * 0.5, 1.1, 0.5],
        [side * (0.7 + i * 0.05), 0.3 - i * 0.1, 0.65],
        [side * (0.9 + i * 0.03), -0.5 - i * 0.05, 0.4],
      ],
      0.025, "#b23a3a"
    );
    add(g, v, [side * 0.4, 0, 0.2]);
  }
  return g;
}

function buildLiver() {
  const g = new THREE.Group();
  const right = organicBlob(1.15, { amp: 0.15, freq: 1.7, color: "#8f3d33", squashY: 0.7, squashZ: 0.85, clearcoat: 0.5, roughness: 0.4 });
  right.position.set(0.35, 0.1, 0.1);
  right.rotation.z = -0.15;
  add(g, right, [0.4, 0.1, 0.1]);

  const left = organicBlob(0.65, { amp: 0.16, freq: 2.0, color: "#833731", clearcoat: 0.45 });
  left.position.set(-0.85, -0.15, 0.0);
  left.scale.set(1, 0.8, 0.85);
  add(g, left, [-0.6, -0.1, 0]);

  const portal = tube(
    [
      [-0.3, -0.3, 0.9],
      [0, -0.35, 1.05],
      [0.3, -0.3, 0.9],
    ],
    0.07, "#5a6fa0"
  );
  add(g, portal, [0, -0.2, 0.4]);

  return g;
}

function buildKidney(mirror = 1) {
  const geo = new THREE.IcosahedronGeometry(0.85, 4);
  deform(geo, 0.1, 1.8);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    v.y *= 1.55;
    v.z *= 0.85;
    // carve the medial notch (hilum) by pulling vertices near +x, y~0 inward
    const notch = Math.exp(-((v.x - 0.55) ** 2) / 0.25) * Math.exp(-(v.y ** 2) / 0.5);
    v.x -= notch * 0.65;
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  const mesh = new THREE.Mesh(geo, organicMaterial("#823f3f", { roughness: 0.45, clearcoat: 0.5 }));
  mesh.scale.x = mirror;
  mesh.castShadow = mesh.receiveShadow = true;
  return mesh;
}

function buildKidneys() {
  const g = new THREE.Group();
  const right = buildKidney(1);
  right.position.set(0.75, 0, 0);
  add(g, right, [0.6, 0, 0]);

  const left = buildKidney(-1);
  left.position.set(-0.75, -0.1, 0);
  add(g, left, [-0.6, 0, 0]);

  const ureterR = tube([[0.65, -0.7, 0], [0.55, -1.4, 0.1], [0.4, -2.0, 0.15]], 0.05, "#d9b8a0");
  add(g, ureterR, [0.3, -0.6, 0]);
  const ureterL = tube([[-0.65, -0.8, 0], [-0.55, -1.4, 0.1], [-0.4, -2.0, 0.15]], 0.05, "#d9b8a0");
  add(g, ureterL, [-0.3, -0.6, 0]);

  const arteryR = taperedCylinder(0.05, 0.08, 0.5, "#c1544f");
  arteryR.rotation.z = Math.PI / 2;
  arteryR.position.set(1.15, 0.1, 0);
  add(g, arteryR, [0.5, 0, 0]);
  const arteryL = taperedCylinder(0.05, 0.08, 0.5, "#c1544f");
  arteryL.rotation.z = Math.PI / 2;
  arteryL.position.set(-1.15, 0, 0);
  add(g, arteryL, [-0.5, 0, 0]);

  return g;
}

function buildEye() {
  const g = new THREE.Group();
  const sclera = new THREE.Mesh(
    new THREE.SphereGeometry(1, 48, 48),
    organicMaterial("#f2ede0", { roughness: 0.35, clearcoat: 0.6 })
  );
  add(g, sclera, [0, 0, -0.4]);

  // thin red vessels over the sclera surface
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const v = tube(
      [
        [Math.cos(a) * 0.2, Math.sin(a) * 0.2, 0.97],
        [Math.cos(a) * 0.6, Math.sin(a) * 0.6, 0.85],
        [Math.cos(a) * 0.95, Math.sin(a) * 0.95, 0.55],
      ],
      0.018, "#c1544f"
    );
    add(g, v, [0, 0, 0.1]);
  }

  const cornea = new THREE.Mesh(
    new THREE.SphereGeometry(0.62, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.55),
    organicMaterial("#bcd8f0", { roughness: 0.05, clearcoat: 1, transmission: 0.85, thickness: 0.3, ior: 1.4, transparent: true, opacity: 0.95 })
  );
  cornea.rotation.x = Math.PI / 2;
  cornea.position.z = 0.95;
  add(g, cornea, [0, 0, 0.3]);

  const irisTex = irisTexture("#6a4a2f", "#3a2a1a");
  const iris = new THREE.Mesh(
    new THREE.CircleGeometry(0.42, 40),
    new THREE.MeshPhysicalMaterial({ map: irisTex, roughness: 0.5, clearcoat: 0.6 })
  );
  iris.position.z = 0.88;
  add(g, iris, [0, 0, 0.2]);

  const pupil = new THREE.Mesh(
    new THREE.CircleGeometry(0.15, 32),
    new THREE.MeshBasicMaterial({ color: "#050505" })
  );
  pupil.position.z = 0.89;
  add(g, pupil, [0, 0, 0.2]);

  const opticNerve = taperedCylinder(0.16, 0.22, 0.7, "#e8dfce", { roughness: 0.6 });
  opticNerve.rotation.x = Math.PI / 2;
  opticNerve.position.set(0.15, -0.05, -1.25);
  add(g, opticNerve, [0.1, 0, -0.5]);

  // extraocular muscles (simple capsule-ish tapered cylinders)
  const musclePositions = [
    [0.9, 0.35, 0.2, 0.4],
    [-0.9, 0.35, 0.2, -0.4],
    [0, 0.95, -0.1, 0.5],
  ];
  musclePositions.forEach(([x, y, z, ex]) => {
    const m = taperedCylinder(0.08, 0.14, 0.9, "#e0a99c", { roughness: 0.55 });
    m.position.set(x, y, z);
    m.rotation.z = x !== 0 ? Math.PI / 2 : 0;
    add(g, m, [ex, 0.2, 0]);
  });

  return g;
}

function buildIntestine() {
  const g = new THREE.Group();
  // duodenum — short C-curve near the top
  const duo = tube(
    [
      [0.15, 1.3, 0.2], [0.55, 1.1, 0.25], [0.6, 0.75, 0.15], [0.3, 0.6, 0.1],
    ],
    0.14, "#dba598", { segments: 30 }
  );
  add(g, duo, [0.3, 0.5, 0.1]);

  // long coiled small intestine
  const coilPts = [];
  const loops = 4.5;
  for (let i = 0; i <= 140; i++) {
    const t = i / 140;
    const ang = t * Math.PI * 2 * loops;
    const r = 0.85 - t * 0.55;
    const y = 0.55 - t * 1.5 + Math.sin(ang * 2) * 0.05;
    coilPts.push([Math.cos(ang) * r, y, Math.sin(ang) * r * 0.9]);
  }
  const coil = tube(coilPts, 0.13, "#dfaa9d", { segments: 200 });
  add(g, coil, [0, -0.2, 0.4]);

  // large intestine framing the coil like a picture frame
  const framePts = [
    [0.75, 1.0, -0.3], [0.9, 0.1, -0.5], [0.8, -0.9, -0.4],
    [0.2, -1.35, -0.3], [-0.5, -1.3, -0.2], [-0.95, -0.6, -0.1],
    [-0.9, 0.5, 0.0], [-0.55, 1.05, 0.05],
  ];
  const colon = tube(framePts, 0.19, "#c98d7f", { segments: 120 });
  add(g, colon, [0.3, -0.6, -0.4]);

  return g;
}

function buildPancreas() {
  const g = new THREE.Group();
  const pts = [];
  const segs = 40;
  for (let i = 0; i <= segs; i++) {
    const t = i / segs;
    pts.push([-1.1 + t * 2.0, Math.sin(t * Math.PI) * 0.12 - 0.05, Math.sin(t * Math.PI * 1.4) * 0.15]);
  }
  const curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)));
  const radii = (t) => 0.2 + Math.sin(Math.min(t, 0.85) * Math.PI * 0.6) * 0.42 * (1 - t * 0.3);
  // build a tapered tube manually via TubeGeometry then scale radius per-vertex
  const tubularSegments = 64;
  const radialSegments = 14;
  const ringSize = radialSegments + 1; // TubeGeometry duplicates the seam vertex per ring
  const tubGeo = new THREE.TubeGeometry(curve, tubularSegments, 1, radialSegments, false);
  const posAttr = tubGeo.attributes.position;
  const centerPts = curve.getSpacedPoints(tubularSegments);
  for (let i = 0; i <= tubularSegments; i++) {
    const t = i / tubularSegments;
    const scale = radii(t);
    const c = centerPts[i];
    for (let j = 0; j < ringSize; j++) {
      const idx = i * ringSize + j;
      if (idx >= posAttr.count) continue;
      const vx = posAttr.getX(idx), vy = posAttr.getY(idx), vz = posAttr.getZ(idx);
      const dx = vx - c.x, dy = vy - c.y, dz = vz - c.z;
      posAttr.setXYZ(idx, c.x + dx * scale, c.y + dy * scale, c.z + dz * scale);
    }
  }
  tubGeo.computeVertexNormals();
  const mesh = new THREE.Mesh(tubGeo, organicMaterial("#cf9c52", { roughness: 0.5, clearcoat: 0.35 }));
  mesh.castShadow = mesh.receiveShadow = true;
  add(g, mesh, [0, 0, 0.3]);
  return g;
}

function buildSkin() {
  const g = new THREE.Group();
  const w = 2.2, d = 2.0;
  const layerDefs = [
    { h: 0.18, y: 1.0, color: "#e8cba0", name: "epidermis" },
    { h: 0.55, y: 0.55, color: "#d99a86", name: "dermis" },
    { h: 0.55, y: -0.15, color: "#e8c974", name: "hypodermis" },
  ];
  layerDefs.forEach((L, i) => {
    const geo = new THREE.BoxGeometry(w, L.h, d, 12, 2, 12);
    const pos = geo.attributes.position;
    const v = new THREE.Vector3();
    for (let k = 0; k < pos.count; k++) {
      v.fromBufferAttribute(pos, k);
      v.z += Math.sin(v.x * 1.4) * 0.06 + noise3(v.x * 2, 0, v.z * 2) * 0.03;
      pos.setXYZ(k, v.x, v.y, v.z);
    }
    geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, organicMaterial(L.color, { roughness: 0.65, clearcoat: i === 0 ? 0.4 : 0.1 }));
    mesh.position.y = L.y - 1.0;
    add(g, mesh, [0, -i * 0.35, 0.3]);
  });

  // hair follicle piercing through the layers
  const follicle = taperedCylinder(0.03, 0.05, 1.3, "#e8dfce", { roughness: 0.5 });
  follicle.position.set(0.55, 0.35, 0.9);
  follicle.rotation.z = 0.25;
  add(g, follicle, [0.3, 0.3, 0.4]);
  const hair = taperedCylinder(0.015, 0.025, 0.7, "#3a2a1f");
  hair.position.set(0.65, 1.15, 0.95);
  hair.rotation.z = 0.25;
  add(g, hair, [0.3, 0.5, 0.4]);

  // coiled sweat gland
  const glandPts = [];
  for (let i = 0; i <= 24; i++) {
    const t = i / 24;
    const ang = t * Math.PI * 2 * 2.5;
    glandPts.push([-0.5 + Math.cos(ang) * 0.12, -0.55 + t * 0.4, 0.85 + Math.sin(ang) * 0.12]);
  }
  const gland = tube(glandPts, 0.03, "#e0b3a0", { segments: 60 });
  add(g, gland, [-0.2, -0.2, 0.4]);

  return g;
}

const BUILDERS = {
  heart: buildHeart,
  brain: buildBrain,
  lungs: buildLungs,
  liver: buildLiver,
  kidneys: buildKidneys,
  eye: buildEye,
  intestine: buildIntestine,
  pancreas: buildPancreas,
  skin: buildSkin,
};

export function buildSpecimen(id) {
  const fn = BUILDERS[id] || buildHeart;
  const group = fn();
  group.name = id;
  return group;
}
