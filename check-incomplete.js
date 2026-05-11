const fs = require('fs');
const path = require('path');

const rootDir = './'; // change if needed
const results = [];

function scanDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            scanDir(fullPath);
        } else if (entry.name.endsWith('.html')) {
            const content = fs.readFileSync(fullPath, 'utf-8');
            const missingHtmlClose = !content.includes('</html>');
            const missingBodyClose = !content.includes('</body>');
            // also check if the file ends abruptly (no closing tag at all)
            const trimmed = content.trimEnd();
            const endsWithNoTag = !trimmed.endsWith('</html>') && !trimmed.endsWith('</body>');
            if (missingHtmlClose || missingBodyClose || endsWithNoTag) {
                results.push({
                    path: fullPath,
                    missingHtmlClose,
                    missingBodyClose,
                    endsWithNoTag,
                    sizeKB: (content.length / 1024).toFixed(1)
                });
            }
        }
    }
}

scanDir(rootDir);
console.log('Files that appear incomplete:');
results.forEach(r => {
    console.log(`\n${r.path} (${r.sizeKB} KB)`);
    if (r.missingHtmlClose) console.log('  - Missing </html>');
    if (r.missingBodyClose) console.log('  - Missing </body>');
    if (r.endsWithNoTag) console.log('  - Ends abruptly (no closing tag)');
});
console.log(`\nTotal incomplete files: ${results.length}`);