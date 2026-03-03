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
    
    // Social Platforms
    if (lower.includes('tiktok')) return 'fab fa-tiktok';
    if (lower.includes('instagram')) return 'fab fa-instagram';
    if (lower.includes('youtube') || lower.includes('shorts')) return 'fab fa-youtube';
    if (lower.includes('spotify')) return 'fab fa-spotify';
    if (lower.includes('patreon')) return 'fab fa-patreon';
    if (lower.includes('onlyfans')) return 'fas fa-lock';
    if (lower.includes('twitch')) return 'fab fa-twitch';
    if (lower.includes('discord')) return 'fab fa-discord';
    if (lower.includes('twitter') || lower.includes('x.com')) return 'fab fa-twitter';
    if (lower.includes('facebook')) return 'fab fa-facebook';
    if (lower.includes('linkedin')) return 'fab fa-linkedin';
    if (lower.includes('pinterest')) return 'fab fa-pinterest';
    if (lower.includes('reddit')) return 'fab fa-reddit';
    if (lower.includes('snapchat')) return 'fab fa-snapchat';
    if (lower.includes('whatsapp')) return 'fab fa-whatsapp';
    if (lower.includes('telegram')) return 'fab fa-telegram';
    
    // E-commerce & Payment
    if (lower.includes('amazon')) return 'fab fa-amazon';
    if (lower.includes('ebay')) return 'fab fa-ebay';
    if (lower.includes('etsy')) return 'fab fa-etsy';
    if (lower.includes('paypal')) return 'fab fa-paypal';
    if (lower.includes('stripe')) return 'fab fa-stripe';
    if (lower.includes('shopify')) return 'fab fa-shopify';
    if (lower.includes('woocommerce')) return 'fab fa-wordpress';
    if (lower.includes('gumroad')) return 'fas fa-store';
    
    // Crypto
    if (lower.includes('bitcoin') || lower.includes('crypto')) return 'fab fa-bitcoin';
    if (lower.includes('ethereum')) return 'fab fa-ethereum';
    if (lower.includes('gas-fee')) return 'fas fa-gas-pump';
    if (lower.includes('nft')) return 'fas fa-image';
    if (lower.includes('token')) return 'fas fa-coins';
    if (lower.includes('staking')) return 'fas fa-piggy-bank';
    
    // Financial / Tax / Salary
    if (lower.includes('vat') || lower.includes('gst') || lower.includes('tax')) return 'fas fa-file-invoice-dollar';
    if (lower.includes('salary') || lower.includes('hourly') || lower.includes('wage') || lower.includes('pay')) return 'fas fa-money-check-alt';
    if (lower.includes('commission') || lower.includes('affiliate')) return 'fas fa-handshake';
    if (lower.includes('hourly')) return 'fas fa-clock';
    if (lower.includes('overtime')) return 'fas fa-user-clock';
    if (lower.includes('mortgage')) return 'fas fa-home';
    if (lower.includes('loan') || lower.includes('emi')) return 'fas fa-university';
    if (lower.includes('discount')) return 'fas fa-percent';
    if (lower.includes('inflation')) return 'fas fa-chart-line';
    if (lower.includes('savings')) return 'fas fa-piggy-bank';
    if (lower.includes('tip')) return 'fas fa-coins';
    
    // Business Metrics
    if (lower.includes('roi') || lower.includes('roas')) return 'fas fa-percentage';
    if (lower.includes('profit') || lower.includes('margin')) return 'fas fa-chart-pie';
    if (lower.includes('break-even')) return 'fas fa-balance-scale';
    if (lower.includes('churn')) return 'fas fa-user-minus';
    if (lower.includes('retention')) return 'fas fa-user-check';
    if (lower.includes('cac')) return 'fas fa-user-plus';
    if (lower.includes('clv') || lower.includes('ltv')) return 'fas fa-users';
    if (lower.includes('arr') || lower.includes('mrr') || lower.includes('saas')) return 'fas fa-sync-alt';
    if (lower.includes('growth')) return 'fas fa-seedling';
    
    // Ad Tech / Web
    if (lower.includes('cpm') || lower.includes('rpm') || lower.includes('ads') || lower.includes('monetization')) return 'fas fa-ad';
    if (lower.includes('traffic') || lower.includes('pageviews') || lower.includes('visitors')) return 'fas fa-chart-bar';
    if (lower.includes('seo') || lower.includes('search')) return 'fas fa-search';
    if (lower.includes('utm')) return 'fas fa-link';
    if (lower.includes('slug')) return 'fas fa-link';
    if (lower.includes('url')) return 'fas fa-link';
    if (lower.includes('domain')) return 'fas fa-globe';
    if (lower.includes('hosting')) return 'fas fa-server';
    if (lower.includes('speed')) return 'fas fa-tachometer-alt';
    if (lower.includes('ping')) return 'fas fa-network-wired';
    
    // AI / Tech / Dev
    if (lower.includes('ai') || lower.includes('gpt') || lower.includes('claude') || lower.includes('bot')) return 'fas fa-robot';
    if (lower.includes('openai')) return 'fas fa-microchip';
    if (lower.includes('api')) return 'fas fa-cogs';
    if (lower.includes('json')) return 'fas fa-code';
    if (lower.includes('xml')) return 'fas fa-code';
    if (lower.includes('csv')) return 'fas fa-file-csv';
    if (lower.includes('sql')) return 'fas fa-database';
    if (lower.includes('regex')) return 'fas fa-code';
    if (lower.includes('base64')) return 'fas fa-exchange-alt';
    if (lower.includes('hash') || lower.includes('md5') || lower.includes('sha')) return 'fas fa-fingerprint';
    if (lower.includes('password')) return 'fas fa-key';
    if (lower.includes('uuid')) return 'fas fa-fingerprint';
    if (lower.includes('lorem')) return 'fas fa-paragraph';
    if (lower.includes('diff')) return 'fas fa-columns';
    if (lower.includes('markdown')) return 'fab fa-markdown';
    if (lower.includes('html')) return 'fab fa-html5';
    if (lower.includes('css')) return 'fab fa-css3-alt';
    if (lower.includes('js') || lower.includes('javascript')) return 'fab fa-js';
    
    // Image / Video / Media
    if (lower.includes('image') || lower.includes('photo') || lower.includes('picture') || lower.includes('jpg') || lower.includes('png')) return 'fas fa-image';
    if (lower.includes('video') || lower.includes('movie') || lower.includes('film') || lower.includes('reel')) return 'fas fa-video';
    if (lower.includes('thumbnail')) return 'fas fa-image';
    if (lower.includes('gif')) return 'fas fa-film';
    if (lower.includes('color') || lower.includes('palette') || lower.includes('hex') || lower.includes('rgb')) return 'fas fa-palette';
    if (lower.includes('resize') || lower.includes('crop')) return 'fas fa-crop-alt';
    if (lower.includes('compress')) return 'fas fa-compress-arrows-alt';
    if (lower.includes('convert')) return 'fas fa-exchange-alt';
    
    // PDF / Document
    if (lower.includes('pdf')) return 'fas fa-file-pdf';
    if (lower.includes('word') || lower.includes('doc')) return 'fas fa-file-word';
    if (lower.includes('excel') || lower.includes('sheet')) return 'fas fa-file-excel';
    if (lower.includes('ppt') || lower.includes('powerpoint')) return 'fas fa-file-powerpoint';
    if (lower.includes('merge')) return 'fas fa-object-group';
    if (lower.includes('split')) return 'fas fa-cut';
    
    // Misc
    if (lower.includes('hashtag') || lower.includes('tag')) return 'fas fa-hashtag';
    if (lower.includes('time') || lower.includes('date') || lower.includes('calendar') || lower.includes('week') || lower.includes('month') || lower.includes('year')) return 'fas fa-calendar-alt';
    if (lower.includes('age')) return 'fas fa-birthday-cake';
    if (lower.includes('bmi') || lower.includes('bmr') || lower.includes('body') || lower.includes('weight') || lower.includes('health')) return 'fas fa-heartbeat';
    if (lower.includes('water')) return 'fas fa-tint';
    if (lower.includes('pregnancy')) return 'fas fa-baby';
    if (lower.includes('fuel') || lower.includes('gas')) return 'fas fa-gas-pump';
    if (lower.includes('distance') || lower.includes('speed')) return 'fas fa-tachometer-alt';
    if (lower.includes('shipping') || lower.includes('dropshipping')) return 'fas fa-shipping-fast';
    if (lower.includes('product') || lower.includes('cost')) return 'fas fa-tag';
    if (lower.includes('cashback')) return 'fas fa-wallet';
    if (lower.includes('work-hours')) return 'fas fa-briefcase';
    if (lower.includes('calculator')) return 'fas fa-calculator';
    
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
        
        // Remove existing section if present (Undo logic)
        const regex = /<section class="bg-gray-50 pb-16">[\s\S]*?Popular Tools on SimpliConvert[\s\S]*?<\/section>\s*/;
        if (regex.test(content)) {
            content = content.replace(regex, '');
            console.log(`Removed old section from ${folder}`);
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
