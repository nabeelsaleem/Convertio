const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;

const TARGET_FOLDERS = [
    'veo3_json_prompt_generator',
    'robots_txt_generator',
    'instagram_caption_line_break',
    'compress_pdf',
    'png_to_gif',
    'html_color_by_code',
    'meta_tag_generator',
    'to_do_list',
    'image_format_converter'
];

const RAW_LINKS = `
https://simpliconvert.com/tiktok-live-gifts-calculator
https://simpliconvert.com/tiktok-diamond-calculator
https://simpliconvert.com/tiktok-earnings-uk
https://simpliconvert.com/instagram-engagement-calculator
https://simpliconvert.com/instagram-reels-calculator
https://simpliconvert.com/patreon-earnings-calculator
https://simpliconvert.com/onlyfans-earnings-calculator
https://simpliconvert.com/spotify-revenue-calculator
https://simpliconvert.com/affiliate-earnings-calculator
https://simpliconvert.com/affiliate-commission-calculator
https://simpliconvert.com/creator-growth-calculator
https://simpliconvert.com/creator-split-calculator
https://simpliconvert.com/monthly-creator-income-calculator
https://simpliconvert.com/audience-revenue-calculator
https://simpliconvert.com/monetization-checker
https://simpliconvert.com/reel-rpm-calculator
https://simpliconvert.com/rpm-calculator
https://simpliconvert.com/shorts-rpm-calculator
https://simpliconvert.com/cpm-to-earnings-calculator
https://simpliconvert.com/pageviews-to-revenue-calculator
https://simpliconvert.com/website-traffic-revenue-calculator
https://simpliconvert.com/display-ads-calculator
https://simpliconvert.com/push-revenue-calculator
https://simpliconvert.com/vat-calculator
https://simpliconvert.com/vat-calculator-uk
https://simpliconvert.com/gst-calculator-india
https://simpliconvert.com/digital-product-tax-calculator
https://simpliconvert.com/salary-after-tax-calculator
https://simpliconvert.com/hourly-earnings-calculator
https://simpliconvert.com/weekly-earnings-calculator
https://simpliconvert.com/monthly-to-yearly-calculator
https://simpliconvert.com/hourly-to-salary-calculator
https://simpliconvert.com/salary-to-hourly-calculator
https://simpliconvert.com/overtime-pay-calculator
https://simpliconvert.com/customer-lifetime-value-calculator
https://simpliconvert.com/churn-rate-calculator
https://simpliconvert.com/arr-calculator
https://simpliconvert.com/cac-calculator
https://simpliconvert.com/saas-mrr-calculator
https://simpliconvert.com/roi-calculator
https://simpliconvert.com/utm-roi-calculator
https://simpliconvert.com/break-even-calculator
https://simpliconvert.com/product-cost-calculator
https://simpliconvert.com/profit-margin-calculator
https://simpliconvert.com/dropshipping-profit-calculator
https://simpliconvert.com/shipping-cost-calculator
https://simpliconvert.com/cashback-value-calculator
https://simpliconvert.com/work-hours-calculator
https://simpliconvert.com/crypto-roi-calculator
https://simpliconvert.com/crypto-profit-calculator
https://simpliconvert.com/gas-fee-calculator
https://simpliconvert.com/token-market-cap-calculator
https://simpliconvert.com/nft-royalty-calculator
https://simpliconvert.com/staking-rewards-calculator
https://simpliconvert.com/claude-api-calculator
https://simpliconvert.com/openai-api-calculator
https://simpliconvert.com/llm-token-converter
https://simpliconvert.com/tiktok-hashtag-checker
https://simpliconvert.com/youtube-tag-generator
`;

const TOOLS = RAW_LINKS.trim().split('\n').map(l => l.trim()).filter(l => l.startsWith('http'));

function getIcon(url) {
    const lower = url.toLowerCase();
    if (lower.includes('tiktok')) return 'fab fa-tiktok';
    if (lower.includes('instagram')) return 'fab fa-instagram';
    if (lower.includes('youtube')) return 'fab fa-youtube';
    if (lower.includes('spotify')) return 'fab fa-spotify';
    if (lower.includes('patreon')) return 'fab fa-patreon';
    if (lower.includes('onlyfans')) return 'fas fa-lock';
    if (lower.includes('twitch')) return 'fab fa-twitch';
    if (lower.includes('discord')) return 'fab fa-discord';
    if (lower.includes('twitter')) return 'fab fa-twitter';
    if (lower.includes('facebook')) return 'fab fa-facebook';
    if (lower.includes('linkedin')) return 'fab fa-linkedin';
    if (lower.includes('pinterest')) return 'fab fa-pinterest';
    if (lower.includes('reddit')) return 'fab fa-reddit';
    if (lower.includes('snapchat')) return 'fab fa-snapchat';
    if (lower.includes('whatsapp')) return 'fab fa-whatsapp';
    if (lower.includes('telegram')) return 'fab fa-telegram';
    if (lower.includes('amazon')) return 'fab fa-amazon';
    if (lower.includes('google')) return 'fab fa-google';
    if (lower.includes('apple')) return 'fab fa-apple';
    if (lower.includes('android')) return 'fab fa-android';
    if (lower.includes('ebay')) return 'fab fa-ebay';
    if (lower.includes('etsy')) return 'fab fa-etsy';
    if (lower.includes('paypal')) return 'fab fa-paypal';
    if (lower.includes('stripe')) return 'fab fa-stripe';
    if (lower.includes('bitcoin') || lower.includes('crypto')) return 'fab fa-bitcoin';
    if (lower.includes('ethereum')) return 'fab fa-ethereum';
    
    if (lower.includes('money') || lower.includes('cash') || lower.includes('dollar') || lower.includes('price') || lower.includes('cost') || lower.includes('tax') || lower.includes('vat') || lower.includes('gst') || lower.includes('salary') || lower.includes('earnings') || lower.includes('revenue') || lower.includes('profit') || lower.includes('commission') || lower.includes('monetization') || lower.includes('rpm') || lower.includes('cpm')) return 'fas fa-money-bill-wave';
    
    if (lower.includes('calculator')) return 'fas fa-calculator';
    if (lower.includes('chart') || lower.includes('graph') || lower.includes('analytics') || lower.includes('metrics') || lower.includes('roi') || lower.includes('growth') || lower.includes('traffic') || lower.includes('pageviews')) return 'fas fa-chart-line';
    if (lower.includes('user') || lower.includes('customer') || lower.includes('audience') || lower.includes('subscriber')) return 'fas fa-users';
    if (lower.includes('time') || lower.includes('hour') || lower.includes('week') || lower.includes('month') || lower.includes('year')) return 'fas fa-clock';
    if (lower.includes('robot') || lower.includes('ai') || lower.includes('bot') || lower.includes('gpt') || lower.includes('claude') || lower.includes('openai')) return 'fas fa-robot';
    if (lower.includes('code') || lower.includes('api') || lower.includes('token') || lower.includes('json') || lower.includes('html') || lower.includes('css')) return 'fas fa-code';
    if (lower.includes('image') || lower.includes('photo') || lower.includes('picture') || lower.includes('png') || lower.includes('gif') || lower.includes('jpg')) return 'fas fa-image';
    if (lower.includes('video') || lower.includes('movie') || lower.includes('film') || lower.includes('reel') || lower.includes('shorts')) return 'fas fa-video';
    if (lower.includes('music') || lower.includes('audio') || lower.includes('sound')) return 'fas fa-music';
    if (lower.includes('file') || lower.includes('pdf') || lower.includes('doc') || lower.includes('txt')) return 'fas fa-file-alt';
    if (lower.includes('link') || lower.includes('url')) return 'fas fa-link';
    if (lower.includes('search') || lower.includes('seo')) return 'fas fa-search';
    if (lower.includes('map') || lower.includes('location')) return 'fas fa-map-marker-alt';
    if (lower.includes('lock') || lower.includes('security')) return 'fas fa-lock';
    
    return 'fas fa-tools';
}

function getTitle(url) {
    const slug = url.split('/').filter(Boolean).pop();
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function generateHTML(tools) {
    const cards = tools.map(url => {
        const urlObject = new URL(url);
        const relativeUrl = urlObject.pathname;
        const title = getTitle(url);
        const icon = getIcon(url);
        const displayTitle = title.replace('Calculator', 'Calc').replace('Generator', 'Gen');
        const description = title.replace('Calculator', '').replace('Generator', '').trim();
        
        return `                <a href="${relativeUrl}" class="tool-card bg-white p-4 rounded-xl border border-slate-100 hover:border-[#da3f0b] flex items-start gap-4">
                    <div class="w-10 h-10 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center shrink-0"><i class="${icon} text-lg"></i></div>
                    <div><h3 class="font-bold text-slate-800 text-sm mb-1">${displayTitle}</h3><p class="text-xs text-slate-500">Estimate ${description.toLowerCase()}.</p></div>
                </a>`;
    }).join('\n');

    return `
    <section class="bg-gray-50 pb-16">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200 pt-16">
            <h2 class="text-2xl font-bold text-center text-slate-800 mb-10">Popular Tools on SimpliConvert</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
${cards}
            </div>
        </div>
    </section>
    `;
}

const toolsPerFolder = Math.ceil(TOOLS.length / TARGET_FOLDERS.length);

TARGET_FOLDERS.forEach((folder, index) => {
    const start = index * toolsPerFolder;
    const end = start + toolsPerFolder;
    const folderTools = TOOLS.slice(start, end);
    
    if (folderTools.length === 0) return;

    const indexPath = path.join(ROOT_DIR, folder, 'index.html');
    
    if (fs.existsSync(indexPath)) {
        let content = fs.readFileSync(indexPath, 'utf8');
        
        if (content.includes('Popular Tools on SimpliConvert')) {
            console.log(`Skipping ${folder}: Already has section.`);
            return;
        }
        
        const html = generateHTML(folderTools);
        
        if (content.includes('<div id="footer">')) {
            content = content.replace('<div id="footer">', html + '\n    <div id="footer">');
            fs.writeFileSync(indexPath, content);
            console.log(`✅ Updated ${folder}`);
        } else if (content.includes('</body>')) {
            content = content.replace('</body>', html + '\n</body>');
            fs.writeFileSync(indexPath, content);
            console.log(`✅ Updated ${folder} (before body)`);
        } else {
            console.log(`⚠️  Could not find injection point for ${folder}`);
        }
    } else {
        console.log(`❌ Missing ${folder}/index.html`);
    }
});

console.log('Done.');
