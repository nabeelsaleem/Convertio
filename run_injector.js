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

        // NEW PLACEMENT STRATEGY: Strictly target the section above the FAQ
        const faqRegex = /Frequently Asked Questions/i;
        const faqIndex = content.search(faqRegex);

        if (faqIndex !== -1) {
            // 1. Get all the HTML content BEFORE the FAQ keyword
            const beforeFaq = content.substring(0, faqIndex);
            
            // 2. Find the last closing </section> BEFORE the FAQ (this marks the end of the reading content)
            const lastSectionCloseIndex = beforeFaq.lastIndexOf('</section>');
            
            if (lastSectionCloseIndex !== -1) {
                // 3. Extract the content of that specific reading section
                const sectionContent = beforeFaq.substring(0, lastSectionCloseIndex);
                
                // 4. Match the closing </div> tags at the very end of this section to inject inside them
                const trailingDivsMatch = sectionContent.match(/(\s*<\/div>\s*)+$/i);
                
                if (trailingDivsMatch) {
                    // Inject before the closing divs so it stays inside the content container (like the "prose" div)
                    const insertPos = lastSectionCloseIndex - trailingDivsMatch[0].length;
                    content = 
                        content.substring(0, insertPos) + 
                        `\n${htmlSnippet}\n` + 
                        content.substring(insertPos);
                    updated = true;
                } else {
                    // Safety Fallback: Insert directly before </section> if no layout divs exist
                    content = 
                        content.substring(0, lastSectionCloseIndex) + 
                        `\n${htmlSnippet}\n` + 
                        content.substring(lastSectionCloseIndex);
                    updated = true;
                }
            }
        } 
        
        // GLOBAL FALLBACKS: Only runs if the page doesn't have an FAQ section at all
        if (!updated && content.includes('</main>')) {
            content = content.replace('</main>', `${htmlSnippet}\n</main>`);
            updated = true;
        } else if (!updated && content.includes('</section>')) {
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
