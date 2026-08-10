/**
 * TARGET-BASED CONTEXTUAL PARAGRAPH INJECTOR (V2)
 * Places text inside the lower SEO section and applies an orange link style.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const MAPPING_FILE = path.join(ROOT_DIR, 'links_mapping.json');

if (!fs.existsSync(MAPPING_FILE)) {
    console.error("❌ Error: links_mapping.json file not found in the root directory!");
    process.exit(1);
}

const data = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'));
const targetPages = data.TARGET_PAGES;

console.log("🚀 Starting Upgraded Internal Link Injection...\n");

Object.keys(targetPages).forEach(targetUrl => {
    const targetData = targetPages[targetUrl];
    const sourceLinks = targetData.source_links;

    Object.keys(sourceLinks).forEach(sourceFolder => {
        const filePath = path.join(ROOT_DIR, sourceFolder, 'index.html');
        let paragraphText = sourceLinks[sourceFolder];

        if (!fs.existsSync(filePath)) {
            console.log(`❌ Source folder or file missing: ${sourceFolder}/index.html`);
            return;
        }

        let content = fs.readFileSync(filePath, 'utf8');

        // FORCE LINKS TO BE ORANGE:
        // Automatically injects your site's bright orange styling class to any <a> tags in the paragraph
        paragraphText = paragraphText.replace(/<a /gi, '<a class="text-orange-500 hover:text-orange-600 font-semibold underline" ');

        // Safety: Don't inject if this specific link already exists in the file
        if (content.includes(targetUrl)) {
            console.log(`箱️  Skipping (Already Linked): ${sourceFolder} -> ${targetUrl}`);
            return;
        }

        // Clean block layout styled for lower article presentation
        const htmlSnippet = `
        <!-- Internal SEO Linking Segment -->
        <div class="mt-6 mb-6">
            <p class="text-gray-600 leading-relaxed text-base">${paragraphText}</p>
        </div>
        `;

        let updated = false;

        // NEW PLACEMENT STRATEGY: Target exactly before the "Frequently Asked Questions" section
        // This Regex looks for the structural transition between the end of the main article container
        // and the start of the FAQ section.
        const faqRegex = /(<\/div>\s*<\/div>\s*<\/section>\s*<section[^>]*>\s*<div[^>]*>\s*<h2[^>]*>Frequently Asked Questions<\/h2>)/i;

        if (faqRegex.test(content)) {
            // Injects the snippet inside the main article container, just before it closes
            content = content.replace(faqRegex, `${htmlSnippet}\n$1`);
            updated = true;
        } else if (content.includes('</main>')) {
            // Fallback 1: If no FAQ section, look for main
            content = content.replace('</main>', `${htmlSnippet}\n</main>`);
            updated = true;
        } else if (content.includes('</section>')) {
            // Fallback 2: Append before the very last section
            const lastIndex = content.lastIndexOf('</section>');
            content = content.substring(0, lastIndex) + htmlSnippet + content.substring(lastIndex);
            updated = true;
        }

        if (updated) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Injected Lower SEO Link: [${sourceFolder}/index.html]`);
        } else {
            console.log(`⚠️  Could not find valid structural anchor tags in: ${sourceFolder}`);
        }
    });
});

console.log("\n✨ System processing complete.");
