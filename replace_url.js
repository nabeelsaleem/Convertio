const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const SEARCH_URL = 'https://simpliconvert.com/social_media_tools/';
const REPLACE_URL = 'https://simpliconvert.com/seo_tools/';

function scanAndReplace(directory) {
    const files = fs.readdirSync(directory);

    files.forEach(file => {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            // Skip node_modules and .git to save time
            if (file !== 'node_modules' && file !== '.git') {
                scanAndReplace(fullPath);
            }
        } else if (stat.isFile()) {
            // Only check relevant text-based files
            if (/\.(html|js|json|txt|md|yml|css)$/i.test(file)) {
                try {
                    // Skip this script itself
                    if (file === 'replace_url.js') return;

                    const content = fs.readFileSync(fullPath, 'utf8');
                    
                    if (content.includes(SEARCH_URL)) {
                        // Use split/join for global replacement without regex escaping issues
                        const newContent = content.split(SEARCH_URL).join(REPLACE_URL);
                        fs.writeFileSync(fullPath, newContent, 'utf8');
                        console.log(`✅ Replaced in: ${fullPath}`);
                    }
                } catch (err) {
                    console.error(`❌ Error reading ${fullPath}:`, err.message);
                }
            }
        }
    });
}

console.log(`🚀 Starting replacement:`);
console.log(`   From: "${SEARCH_URL}"`);
console.log(`   To:   "${REPLACE_URL}"`);
console.log('---------------------------------------------------');

scanAndReplace(ROOT_DIR);

console.log('---------------------------------------------------');
console.log('✨ Done processing.');
