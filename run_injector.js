/**
 * TARGET-BASED CONTEXTUAL PARAGRAPH INJECTOR
 * Tailored for Gemini's structured target-to-source JSON format.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const MAPPING_FILE = path.join(ROOT_DIR, 'links_mapping.json');

// Check if mapping file exists
if (!fs.existsSync(MAPPING_FILE)) {
    console.error("❌ Error: links_mapping.json file not found in the root directory!");
    process.exit(1);
}

// Load and parse the JSON data
const rawData = fs.readFileSync(MAPPING_FILE, 'utf8');
const data = JSON.parse(rawData);
const targetPages = data.TARGET_PAGES;

console.log("🚀 Starting Target-Based Internal Link Injection...\n");

// Iterate through each Target URL block
Object.keys(targetPages).forEach(targetUrl => {
    const targetData = targetPages[targetUrl];
    const sourceLinks = targetData.source_links;

    // Iterate through each Source Folder that needs to link to this target URL
    Object.keys(sourceLinks).forEach(sourceFolder => {
        const filePath = path.join(ROOT_DIR, sourceFolder, 'index.html');
        const paragraphText = sourceLinks[sourceFolder];

        if (!fs.existsSync(filePath)) {
            console.log(`❌ Source folder or file missing: ${sourceFolder}/index.html`);
            return;
        }

        let content = fs.readFileSync(filePath, 'utf8');
        
        // Safety: Don't inject if this specific link/paragraph layout already exists
        if (content.includes(targetUrl) || content.includes(paragraphText)) {
            console.log(`⏭️  Skipping (Already Linked): ${sourceFolder} -> ${targetUrl}`);
            return;
        }

        // Build HTML wrapper matching your site template (Tailwind style)
        const htmlSnippet = `
            <div class="container mx-auto px-4 mt-6 mb-4 text-center">
            <p class="text-gray-600 max-w-2xl mx-auto text-sm">${paragraphText}</p>
        </div>
        `;

        // Inject near the bottom of standard sections to avoid breaking logic layout structures
        let updated = false;
        if (content.includes('</section>')) {
            content = content.replace('</section>', `${htmlSnippet}\n</section>`);
            updated = true;
        } else if (content.includes('</main>')) {
            content = content.replace('</main>', `${htmlSnippet}\n</main>`);
            updated = true;
        }

        if (updated) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Injected Link: [${sourceFolder}/index.html] now links to target.`);
        } else {
            console.log(`⚠️  Could not find valid structural structural injection tag in: ${sourceFolder}`);
        }
    });
});

console.log("\n✨ Automation task processing complete.");
