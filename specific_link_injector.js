/**
 * SPECIFIC LINK INJECTOR
 * 
 * Usage:
 * 1. Paste your list into TARGET_PAGES below.
 * 2. Run: node specific_link_injector.js
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;

// ==============================================================================
// 1. CONFIGURE YOUR MAPPING HERE
// Format: "Folder_Name": [ { keyword: "text to find", url: "link to add" } ]
// ==============================================================================
const TARGET_PAGES = {
    "instagram_caption_line_break": [
        { keyword: "ascii art", url: "https://simpliconvert.com/text_to_ascii_art_generator/" },
        { keyword: "image resizer", url: "https://simpliconvert.com/image_resizer/" }
    ],
    "text_to_ascii_art_generator": [
        { keyword: "instagram caption", url: "https://simpliconvert.com/instagram_caption_line_break/" },
        { keyword: "markdown editor", url: "https://simpliconvert.com/markdown_editor/" }
    ],
    // ... PASTE YOUR LIST HERE ...
};

// ==============================================================================
// 2. MAIN SCRIPT LOGIC
// ==============================================================================
console.log("🚀 Starting Specific Link Injection...");

Object.keys(TARGET_PAGES).forEach(folderName => {
    const filePath = path.join(ROOT_DIR, folderName, 'index.html');
    
    if (!fs.existsSync(filePath)) {
        console.log(`❌ File not found: ${folderName}/index.html`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    let linksAddedCount = 0;
    
    const linksToInject = TARGET_PAGES[folderName];

    // We scan paragraph tags <p>...</p> to inject links naturally into text
    // This prevents breaking HTML attributes or script tags
    const pTagRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;

    content = content.replace(pTagRegex, (match, innerText) => {
        let newInnerText = innerText;

        linksToInject.forEach(link => {
            // Safety: Don't add if link already exists in this specific paragraph
            if (newInnerText.includes(link.url)) return;

            // Regex: Find whole word, case insensitive, ensure not already inside an <a> tag
            // This prevents double-linking or breaking existing links
            const keywordRegex = new RegExp(`(?<!<a[^>]*>)\\b(${link.keyword})\\b(?!<\\/a>)`, 'i');
            
            if (keywordRegex.test(newInnerText)) {
                // Replace the keyword with the link
                newInnerText = newInnerText.replace(keywordRegex, `<a href="${link.url}" class="text-blue-600 hover:underline" title="Open ${link.keyword}">${link.keyword}</a>`);
                linksAddedCount++;
            }
        });

        return match.replace(innerText, newInnerText);
    });

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ ${folderName}: Injected ${linksAddedCount} links.`);
    } else {
        console.log(`⚠️  ${folderName}: No keywords found for the requested links.`);
    }
});

console.log("\n✨ Done processing.");