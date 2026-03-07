const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');

const filesToDelete = [
    "age-calculator-guide.jpg",
    "ai-api-cost-calculators-guide.jpg",
    "ai-security-tools-dashboard.jpg",
    "base64-encoding-guide.jpg",
    "best-image-cropper-2026.jpg",
    "bmi-calculator-guide.jpg",
    "broken-link-checker-guide.jpg",
    "color-palette-generator-guide.jpg",
    "content-creation-tools-guide.jpg",
    "contrast-checker-guide.jpg",
    "count-pdf-pages-guide.jpg",
    "creator-economy-earnings-guide.jpg",
    "crypto-profit-calculator-guide.jpg",
    "date-to-unix-guide.jpg",
    "download-time-calculator-guide.jpg",
    "duplicate-word-remover-guide.jpg",
    "ecommerce-margins-guide.jpg",
    "epoch-converter-guide.jpg",
    "freelance-tax-calculators-guide.jpg",
    "heading-checker-seo-guide.jpg",
    "hours-calculator-guide.jpg",
    "hreflang-generator-guide.jpg",
    "html-minifier-guide.jpg",
    "image-sharpen-guide.jpg",
    "image-tools-guide-2026.jpg",
    "instagram-caption-spacer-guide.jpg",
    "invert-image-colors-guide.jpg",
    "markdown-to-html-guide.jpg",
    "mastering-seo-metadata-2026.jpg",
    "meta-tag-generator-guide.jpg",
    "mobile-friendly-test-guide.jpg",
    "online-stopwatch-guide.jpg",
    "overtime-calculator-guide.jpg",
    "pdf-tools-guide.jpg",
    "percentage-calculator-guide.jpg",
    "percentage-difference-guide.jpg",
    "permalink-generator-guide.jpg",
    "png-to-jpg-guide-2026.jpg",
    "productivity-dashboard-hacks.jpg",
    "profile-picture-cropper-guide.jpg",
    "qr-code-generator-guide.jpg",
    "reading-time-calculator-guide.jpg",
    "robots-txt-code-screen.jpg",
    "salary-calculator-guide.jpg",
    "sales-tax-calculator-guide.jpg",
    "savings-calculator-guide.jpg",
    "schema-generator-guide.jpg",
    "slug-converter-guide.jpg",
    "social-media-resizer-hero.jpg",
    "text-rewriter-guide.jpg",
    "text-sorter-guide.jpg",
    "text-to-emoji-guide.jpg",
    "time-duration-calculator-hero.jpg"
];

if (!fs.existsSync(imagesDir)) {
    console.error(`Images directory not found at: ${imagesDir}`);
    process.exit(1);
}

console.log(`Scanning ${imagesDir} for files to delete...`);

filesToDelete.forEach(file => {
    const filePath = path.join(imagesDir, file);
    if (fs.existsSync(filePath)) {
        try {
            fs.unlinkSync(filePath);
            console.log(`✅ Deleted: ${file}`);
        } catch (err) {
            console.error(`❌ Error deleting ${file}:`, err.message);
        }
    }
});