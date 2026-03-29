(function() {
    'use strict';

    // ============================================
    // Master Tool Database
    // ============================================

const allTools = [
        { name: "AMP Validator", url: "https://simpliconvert.com/amp_validator/" },
        { name: "File Download Time Calculator", url: "https://simpliconvert.com/file_download_time_calculator/" },
        { name: "Age in Weeks Calculator", url: "https://simpliconvert.com/age_in_weeks_calculator/" },
        { name: "Image Rotator", url: "https://simpliconvert.com/image_rotator/" },
        { name: "CPM to Earnings Calculator", url: "https://simpliconvert.com/cpm-to-earnings-calculator/" },
        { name: "Mortgage Calculator", url: "https://simpliconvert.com/mortgage_calculator/" },
        { name: "eBay Fee Calculator", url: "https://simpliconvert.com/ebay-fee-calculator/" },
        { name: "YouTube Shorts Calculator", url: "https://simpliconvert.com/youtube-shorts-calculator/" },
        { name: "Meta Description Length Checker", url: "https://simpliconvert.com/meta_description_length_checker/" },
        { name: "Rotate PDF", url: "https://simpliconvert.com/rotate_pdf/" },
        { name: "Product Cost Calculator", url: "https://simpliconvert.com/product-cost-calculator/" },
        { name: "CAC Calculator", url: "https://simpliconvert.com/cac-calculator/" },
        { name: "Instagram Reel Caption Formatter", url: "https://simpliconvert.com/instagram_reel_caption_formatter/" },
        { name: "Password Generator", url: "https://simpliconvert.com/password_generator/" },
        { name: "Binary Code Translator", url: "https://simpliconvert.com/binary_code_translator/" },
        { name: "Freelance Hourly Rate Calculator", url: "https://simpliconvert.com/freelance-hourly-rate-calculator/" },
        { name: "Random SVG Blob Generator", url: "https://simpliconvert.com/random_svg_blob_generator/" },
        { name: "Unity Asset Store Calculator", url: "https://simpliconvert.com/unity-asset-store-calculator/" },
        { name: "Internet Download Speed Test", url: "https://simpliconvert.com/internet_download_speed_test/" },
        { name: "Speech to Text", url: "https://simpliconvert.com/speech_to_text/" },
        { name: "Social Media Link in Bio Generator", url: "https://simpliconvert.com/social_media_link_in_bio_generator/" },
        { name: "Robots.txt Generator", url: "https://simpliconvert.com/robots_txt_generator/" },
        { name: "Image Watermark Adder", url: "https://simpliconvert.com/image_watermark_adder/" },
        { name: "Gumroad Fee Calculator", url: "https://simpliconvert.com/gumroad-fee-calculator/" },
        { name: "YouTube Tag Generator", url: "https://simpliconvert.com/youtube_tag_generator/" },
        { name: "Canonical URL Generator", url: "https://simpliconvert.com/canonical_url_generator/" },
        { name: "Hashtag Counter", url: "https://simpliconvert.com/hashtag_counter/" },
        { name: "Freelance Tax Calculator", url: "https://simpliconvert.com/freelance-tax-calculator/" },
        { name: "Digital Product Tax Calculator", url: "https://simpliconvert.com/digital-product-tax-calculator/" },
        { name: "Text to Hex Converter", url: "https://simpliconvert.com/text_to_hex_converter/" },
        { name: "Unix Timestamp Converter", url: "https://simpliconvert.com/unix_timestamp_converter_online/" },
        { name: "LinkedIn Banner Size Checker", url: "https://simpliconvert.com/linkedin_banner_size_checker/" },
        { name: "Email Revenue Calculator", url: "https://simpliconvert.com/email-revenue-calculator/" },
        { name: "Word Frequency Analyzer", url: "https://simpliconvert.com/word_frequency_analyzer/" },
        { name: "Gross Margin Calculator", url: "https://simpliconvert.com/gross_margin_calculator/" },
        { name: "Images to PDF", url: "https://simpliconvert.com/images_to_pdf/" },
        { name: "Twitter Thread Formatter", url: "https://simpliconvert.com/twitter_thread_formatter/" },
        { name: "Markdown Previewer", url: "https://simpliconvert.com/markdown_previewer/" },
        { name: "HTML to Markdown", url: "https://simpliconvert.com/html_to_markdown/" },
        { name: "Affiliate Earnings Calculator", url: "https://simpliconvert.com/affiliate-earnings-calculator/" },
        { name: "AdSense Revenue Calculator", url: "https://simpliconvert.com/adsense-revenue-calculator/" },
        { name: "Savings Growth Calculator", url: "https://simpliconvert.com/savings_growth_calculator/" },
        { name: "Query String Generator", url: "https://simpliconvert.com/query_string_generator/" },
        { name: "Remove Duplicate Lines", url: "https://simpliconvert.com/remove_duplicate_lines_online/" },
        { name: "URL Encoder/Decoder", url: "https://simpliconvert.com/url_encoder_decoder_online/" },
        { name: "Text Case Converter", url: "https://simpliconvert.com/online_text_case_converter/" },
        { name: "Percentage of Number Calculator", url: "https://simpliconvert.com/calculate_percentage_of_number/" },
        { name: "Duplicate Word Remover", url: "https://simpliconvert.com/duplicate_word_remover/" },
        { name: "VAT Calculator (UK)", url: "https://simpliconvert.com/vat-calculator-uk/" },
        { name: "NFT Royalty Calculator", url: "https://simpliconvert.com/nft-royalty-calculator/" },
        { name: "Upwork Fee Calculator", url: "https://simpliconvert.com/upwork-fee-calculator/" },
        { name: "Mailto Link Generator", url: "https://simpliconvert.com/mailto_link_generator/" },
        { name: "Image Sharpen Tool", url: "https://simpliconvert.com/image_sharpen_tool/" },
        { name: "Creator Growth Calculator", url: "https://simpliconvert.com/creator-growth-calculator/" },
        { name: "HTTP Header Checker", url: "https://simpliconvert.com/http_header_checker/" },
        { name: "Pregnancy Due Date Calculator", url: "https://simpliconvert.com/pregnancy_due_date_calculator/" },
        { name: "HTML Color by Code", url: "https://simpliconvert.com/html_color_by_code/" },
        { name: "Daily Earnings Calculator", url: "https://simpliconvert.com/daily-earnings-calculator/" },
        { name: "Unicode to Text", url: "https://simpliconvert.com/unicode_to_text/" },
        { name: "Date to Unix Time", url: "https://simpliconvert.com/date_to_unix_time/" },
        { name: "Meta Tag Generator", url: "https://simpliconvert.com/meta_tag_generator/" },
        { name: "Instagram Caption Line Break", url: "https://simpliconvert.com/instagram_caption_line_break/" },
        { name: "Work Hours Calculator", url: "https://simpliconvert.com/work_hours_calculator/" },
        { name: "Veo3 JSON Prompt Generator", url: "https://simpliconvert.com/veo3_json_prompt_generator/" },
        { name: "Mobile Friendly Test", url: "https://simpliconvert.com/mobile_friendly_test/" },
        { name: "Push Revenue Calculator", url: "https://simpliconvert.com/push-revenue-calculator/" },
        { name: "TikTok Earnings (UK)", url: "https://simpliconvert.com/tiktok-earnings-uk/" },
        { name: "Keyword Counter", url: "https://simpliconvert.com/keyword_counter/" },
        { name: "CSS Box Shadow Generator", url: "https://simpliconvert.com/css_box_shadow_generator/" },
        { name: "Website Traffic Revenue Calculator", url: "https://simpliconvert.com/website-traffic-revenue-calculator/" },
        { name: "YouTube Earnings (India)", url: "https://simpliconvert.com/youtube-earnings-india/" },
        { name: "Image File Size Calculator", url: "https://simpliconvert.com/image_file_size_calculator/" },
        { name: "VAT Calculator", url: "https://simpliconvert.com/vat_calculator/" },
        { name: "Pomodoro Timer", url: "https://simpliconvert.com/online_pomodoro_study_timer/" },
        { name: "Facebook Post Formatter", url: "https://simpliconvert.com/facebook_post_formatter/" },
        { name: "Keyword Density Checker", url: "https://simpliconvert.com/keyword_density_checker/" },
        { name: "ROI Calculator", url: "https://simpliconvert.com/roi_calculator/" },
        { name: "Text to ASCII Art Generator", url: "https://simpliconvert.com/text_to_ascii_art_generator/" },
        { name: "PNG to JPG", url: "https://simpliconvert.com/png_to_jpg/" },
        { name: "Salary After Tax Calculator", url: "https://simpliconvert.com/salary-after-tax-calculator/" },
        { name: "YouTube Timestamp Link", url: "https://simpliconvert.com/youtube_timestamp_link/" },
        { name: "Image DPI Checker", url: "https://simpliconvert.com/image_dpi_checker/" },
        { name: "Image Grayscale Converter", url: "https://simpliconvert.com/image_grayscale_converter/" },
        { name: "Shorts RPM Calculator", url: "https://simpliconvert.com/shorts-rpm-calculator/" },
        { name: "YouTube Title Character Counter", url: "https://simpliconvert.com/youtube_title_character_counter/" },
        { name: "Platform Fee Calculator", url: "https://simpliconvert.com/platform-fee-calculator/" },
        { name: "Telegram Link Generator", url: "https://simpliconvert.com/telegram_link_generator/" },
        { name: "Alphabetical Sorter", url: "https://simpliconvert.com/alphabetical_sorter/" },
        { name: "Split PDF", url: "https://simpliconvert.com/split_pdf/" },
        { name: "Overtime Pay Calculator", url: "https://simpliconvert.com/overtime_pay_calculator/" },
        { name: "Stopwatch & Timer", url: "https://simpliconvert.com/online_stopwatch_and_timer/" },
        { name: "Instagram Engagement Calculator", url: "https://simpliconvert.com/instagram-engagement-calculator/" },
        { name: "Image Color Picker", url: "https://simpliconvert.com/image_color_picker/" },
        { name: "Points to Cash Calculator", url: "https://simpliconvert.com/points-to-cash-calculator/" },
        { name: "Currency Percentage Calculator", url: "https://simpliconvert.com/currency_percentage_calculator/" },
        { name: "Water Intake Calculator", url: "https://simpliconvert.com/water_intake_calculator/" },
        { name: "Merge PDF Online", url: "https://simpliconvert.com/merge_pdf_online/" },
        { name: "YAML to JSON Converter", url: "https://simpliconvert.com/yaml_to_json_converter/" },
        { name: "Zakat Business Calculator", url: "https://simpliconvert.com/zakat_calculator_business/" },
        { name: "Page Speed Checklist", url: "https://simpliconvert.com/page_speed_checklist/" },
        { name: "Invisible Character Generator", url: "https://simpliconvert.com/invisible_character_generator/" },
        { name: "Shopify Profit Calculator", url: "https://simpliconvert.com/shopify-profit-calculator/" },
        { name: "Schema Markup Generator", url: "https://simpliconvert.com/schema_markup_generator/" },
        { name: "Hreflang Generator", url: "https://simpliconvert.com/hreflang_generator/" },
        { name: "Website Favicon Checker", url: "https://simpliconvert.com/website_favicon_checker/" },
        { name: "Image Resolution Calculator", url: "https://simpliconvert.com/image_resolution_calculator/" },
        { name: "CSV Validator", url: "https://simpliconvert.com/csv_validator/" },
        { name: "Fuel Cost Calculator", url: "https://simpliconvert.com/fuel_cost_calculator/" },
        { name: "Regex Generator", url: "https://simpliconvert.com/regex_generator/" },
        { name: "Twitter Card Generator", url: "https://simpliconvert.com/twitter_card_generator/" },
        { name: "Fancy Text Generator", url: "https://simpliconvert.com/fancy_text_generator/" },
        { name: "Age in Days Calculator", url: "https://simpliconvert.com/age_in_days_calculator/" },
        { name: "SHA256 Generator", url: "https://simpliconvert.com/sha256_generator/" },
        { name: "Dropshipping Profit Calculator", url: "https://simpliconvert.com/dropshipping-profit-calculator/" },
        { name: "URL Cleaner", url: "https://simpliconvert.com/url_cleaner/" },
        { name: "Minecraft Marketplace Calculator", url: "https://simpliconvert.com/minecraft-marketplace-calculator/" },
        { name: "Freelance Hourly Rate Calculator", url: "https://simpliconvert.com/freelance_hourly_rate_calculator/" },
        { name: "TikTok Diamond Calculator", url: "https://simpliconvert.com/tiktok-diamond-calculator/" },
        { name: "JWT Decoder", url: "https://simpliconvert.com/jwt_decoder/" },
        { name: "EXIF Viewer", url: "https://simpliconvert.com/exif_viewer/" },
        { name: "Random Quote Generator", url: "https://simpliconvert.com/random_quote_generator/" },
        { name: "Stripe Fee Calculator", url: "https://simpliconvert.com/stripe-fee-calculator/" },
        { name: "BMI Calculator (Kids)", url: "https://simpliconvert.com/bmi_calculator_kids/" },
        { name: "YouTube Tag Generator", url: "https://simpliconvert.com/youtube-tag-generator/" },
        { name: "Image Palette Generator", url: "https://simpliconvert.com/image_palette_generator/" },
        { name: "Image to Base64 Converter", url: "https://simpliconvert.com/image_to_base64_converter/" },
        { name: "Image Format Converter", url: "https://simpliconvert.com/image_format_converter/" },
        { name: "UTM Link Builder", url: "https://simpliconvert.com/utm_link_builder/" },
        { name: "JPG to PNG", url: "https://simpliconvert.com/jpg_to_png/" },
        { name: "JSON Validator", url: "https://simpliconvert.com/json_validator/" },
        { name: "Image Metadata Viewer", url: "https://simpliconvert.com/image_metadata_viewer/" },
        { name: "Sitemap Validator", url: "https://simpliconvert.com/sitemap_validator/" },
        { name: "Pixels to REM Converter", url: "https://simpliconvert.com/pixels_to_rem_converter/" },
        { name: "Markdown Editor", url: "https://simpliconvert.com/markdown_editor/" },
        { name: "CSS Minifier", url: "https://simpliconvert.com/css_minifier/" },
        { name: "Salary to Hourly Calculator", url: "https://simpliconvert.com/salary-to-hourly-calculator/" },
        { name: "PDF to Images", url: "https://simpliconvert.com/pdf_to_images/" },
        { name: "Image Watermark Remover", url: "https://simpliconvert.com/image_watermark_remover/" },
        { name: "Churn Rate Calculator", url: "https://simpliconvert.com/churn-rate-calculator/" },
        { name: "Password Strength Checker", url: "https://simpliconvert.com/password_strength_checker/" },
        { name: "Compare Text Files Online", url: "https://simpliconvert.com/compare_text_files_online/" },
        { name: "JSON Formatter & Validator", url: "https://simpliconvert.com/json_formatter_validator/" },
        { name: "Unix Time to Date", url: "https://simpliconvert.com/unix_time_to_date/" },
        { name: "PDF to Word", url: "https://simpliconvert.com/pdf_to_word/" },
        { name: "JSON to CSV Converter", url: "https://simpliconvert.com/json_to_csv_converter_online/" },
        { name: "Hourly to Salary Calculator", url: "https://simpliconvert.com/hourly-to-salary-calculator/" },
        { name: "Text Cleaner", url: "https://simpliconvert.com/text_cleaner/" },
        { name: "Open Graph Tag Generator", url: "https://simpliconvert.com/open_graph_tag_generator/" },
        { name: "ROI Calculator", url: "https://simpliconvert.com/roi-calculator/" },
        { name: "Print Size Calculator", url: "https://simpliconvert.com/print_size_calculator/" },
        { name: "Instagram Story Size Checker", url: "https://simpliconvert.com/instagram_story_size_checker/" },
        { name: "Hashtag Sorter", url: "https://simpliconvert.com/hashtag_sorter/" },
        { name: "Image Compressor (Lossless)", url: "https://simpliconvert.com/image_compressor_lossless/" },
        { name: "Customer Lifetime Value Calculator", url: "https://simpliconvert.com/customer-lifetime-value-calculator/" },
        { name: "Steam Fee Calculator", url: "https://simpliconvert.com/steam-fee-calculator/" },
        { name: "Page Size Checker", url: "https://simpliconvert.com/page_size_checker/" },
        { name: "Reading Time Calculator", url: "https://simpliconvert.com/reading_time_calculator/" },
        { name: "Caption Cleaner Tool", url: "https://simpliconvert.com/caption_cleaner_tool/" },
        { name: "Monthly to Yearly Salary Calculator", url: "https://simpliconvert.com/monthly_to_yearly_salary_calculator/" },
        { name: "Lorem Ipsum Sentences", url: "https://simpliconvert.com/lorem_ipsum_sentences/" },
        { name: "Text Sorter", url: "https://simpliconvert.com/text_sorter/" },
        { name: "Instagram Username Checker", url: "https://simpliconvert.com/instagram_username_checker/" },
        { name: "CSV to JSON Converter", url: "https://simpliconvert.com/csv_to_json_converter/" },
        { name: "Twitch Split Calculator", url: "https://simpliconvert.com/twitch-split-calculator/" },
        { name: "Image Resizer", url: "https://simpliconvert.com/image_resizer/" },
        { name: "Crypto Profit Calculator", url: "https://simpliconvert.com/crypto_profit_calculator/" },
        { name: "BMR Calculator", url: "https://simpliconvert.com/bmr_calculator/" },
        { name: "HTTP vs HTTPS Checker", url: "https://simpliconvert.com/http_vs_https_checker/" },
        { name: "Platform Payout Tax Calculator", url: "https://simpliconvert.com/platform-payout-tax-calculator/" },
        { name: "Percentage Decrease Calculator", url: "https://simpliconvert.com/percentage_decrease_calculator/" },
        { name: "Instagram Bio Character Counter", url: "https://simpliconvert.com/instagram_bio_character_counter/" },
        { name: "Twitch Earnings Calculator", url: "https://simpliconvert.com/twitch-earnings-calculator/" },
        { name: "Cashback Value Calculator", url: "https://simpliconvert.com/cashback-value-calculator/" },
        { name: "Remove Extra Spaces", url: "https://simpliconvert.com/remove_extra_spaces/" },
        { name: "Image Aspect Ratio Calculator", url: "https://simpliconvert.com/image_aspect_ratio_calculator/" },
        { name: "Redirect Checker", url: "https://simpliconvert.com/redirect_checker/" },
        { name: "PNG to GIF", url: "https://simpliconvert.com/png_to_gif/" },
        { name: "Patreon Earnings Calculator", url: "https://simpliconvert.com/patreon-earnings-calculator/" },
        { name: "Percentage Difference Calculator", url: "https://simpliconvert.com/percentage_difference_calculator/" },
        { name: "UUID Generator", url: "https://simpliconvert.com/uuid_generator_online/" },
        { name: "Sentence Counter", url: "https://simpliconvert.com/sentence_counter/" },
        { name: "Image Mirror Tool", url: "https://simpliconvert.com/image_mirror_tool/" },
        { name: "Claude API Calculator", url: "https://simpliconvert.com/claude-api-calculator/" },
        { name: "Emoji Text Generator", url: "https://simpliconvert.com/emoji_text_generator/" },
        { name: "Text to Speech", url: "https://simpliconvert.com/text_to_speech/" },
        { name: "Stop Word Remover", url: "https://simpliconvert.com/stop_word_remover/" },
        { name: "LLM Token Converter", url: "https://simpliconvert.com/llm-token-converter/" },
        { name: "YouTube Earnings (USA)", url: "https://simpliconvert.com/youtube-earnings-usa/" },
        { name: "Kick Earnings Calculator", url: "https://simpliconvert.com/kick-earnings-calculator/" },
        { name: "WooCommerce Fee Calculator", url: "https://simpliconvert.com/woocommerce-fee-calculator/" },
        { name: "ROAS Calculator", url: "https://simpliconvert.com/roas_calculator/" },
        { name: "Regex Tester", url: "https://simpliconvert.com/regex_tester/" },
        { name: "XML Formatter", url: "https://simpliconvert.com/xml_formatter/" },
        { name: "Random List Shuffler", url: "https://simpliconvert.com/random_list_shuffler/" },
        { name: "Profit Margin Calculator", url: "https://simpliconvert.com/profit_margin_calculator/" },
        { name: "Discord Boost Calculator", url: "https://simpliconvert.com/discord-boost-calculator/" },
        { name: "Username Generator", url: "https://simpliconvert.com/username_generator/" },
        { name: "Etsy Fee Calculator", url: "https://simpliconvert.com/etsy-fee-calculator/" },
        { name: "To-Do List", url: "https://simpliconvert.com/to_do_list/" },
        { name: "Paragraph Counter", url: "https://simpliconvert.com/paragraph_counter/" },
        { name: "Sitemap Index Generator", url: "https://simpliconvert.com/sitemap_index_generator/" },
        { name: "Text Length Checker", url: "https://simpliconvert.com/text_length_checker/" },
        { name: "Markdown to HTML", url: "https://simpliconvert.com/markdown_to_html/" },
        { name: "Line Break Generator", url: "https://simpliconvert.com/line_break_generator/" },
        { name: "Extract PDF Pages", url: "https://simpliconvert.com/extract_pdf_pages/" },
        { name: "Lorem Ipsum Paragraphs", url: "https://simpliconvert.com/lorem_ipsum_paragraphs/" },
        { name: "Remove Line Breaks", url: "https://simpliconvert.com/remove_line_breaks/" },
        { name: "Title Length Checker", url: "https://simpliconvert.com/title_length_checker/" },
        { name: "YouTube Thumbnail Downloader", url: "https://simpliconvert.com/youtube_thumbnail_downloader/" },
        { name: "Minutes to Hours Converter", url: "https://simpliconvert.com/minutes_to_hours_converter/" },
        { name: "Tip Calculator", url: "https://simpliconvert.com/tip_calculator/" },
        { name: "Amazon FBA Calculator", url: "https://simpliconvert.com/amazon-fba-calculator/" },
        { name: "Secure Note Generator", url: "https://simpliconvert.com/secure_note_generator/" },
        { name: "Percentage Increase Calculator", url: "https://simpliconvert.com/percentage_increase_calculator/" },
        { name: "HTML Heading Checker", url: "https://simpliconvert.com/html_heading_checker/" },
        { name: "Pixels to CM", url: "https://simpliconvert.com/pixels_to_cm/" },
        { name: "Days to Weeks Converter", url: "https://simpliconvert.com/days_to_weeks_converter/" },
        { name: "Work Hours Calculator", url: "https://simpliconvert.com/work-hours-calculator/" },
        { name: "Gas Fee Calculator", url: "https://simpliconvert.com/gas-fee-calculator/" },
        { name: "Staking Rewards Calculator", url: "https://simpliconvert.com/staking-rewards-calculator/" },
        { name: "CSS Gradient Background Generator", url: "https://simpliconvert.com/css_gradient_background_generator/" },
        { name: "Favicon Generator", url: "https://simpliconvert.com/free_favicon_generator_online/" },
        { name: "PayPal Fee Calculator", url: "https://simpliconvert.com/paypal_fee_calculator/" },
        { name: "Roblox DevEx Calculator", url: "https://simpliconvert.com/roblox_devex_calculator/" },
        { name: "XML to JSON Converter", url: "https://simpliconvert.com/xml_to_json_converter/" },
        { name: "SQL Formatter", url: "https://simpliconvert.com/sql_formatter_online/" },
        { name: "PDF Page Counter", url: "https://simpliconvert.com/pdf_page_counter/" },
        { name: "Creator Split Calculator", url: "https://simpliconvert.com/creator-split-calculator/" },
        { name: "Zakat Gold/Silver Calculator", url: "https://simpliconvert.com/zakat_calculator_gold_silver/" },
        { name: "Distance/Speed/Time Calculator", url: "https://simpliconvert.com/distance_speed_time_calculator/" },
        { name: "Date Difference Calculator", url: "https://simpliconvert.com/date_difference_calculator/" },
        { name: "HTML Minifier", url: "https://simpliconvert.com/html_minifier/" },
        { name: "Crypto Profit Calculator", url: "https://simpliconvert.com/crypto-profit-calculator/" },
        { name: "YouTube Banner Size Checker", url: "https://simpliconvert.com/youtube_banner_size_checker/" },
        { name: "Sales Tax Calculator", url: "https://simpliconvert.com/sales_tax_calculator/" },
        { name: "Image Cropper", url: "https://simpliconvert.com/image_cropper/" },
        { name: "TikTok Creator Fund Calculator", url: "https://simpliconvert.com/tiktok-creator-fund-calculator/" },
        { name: "MidJourney Cost Calculator", url: "https://simpliconvert.com/midjourney-cost-calculator/" },
        { name: "Image Invert Colors", url: "https://simpliconvert.com/image_invert_colors/" },
        { name: "Text to Emoji", url: "https://simpliconvert.com/text_to_emoji/" },
        { name: "JPG to PDF", url: "https://simpliconvert.com/jpg_to_pdf/" },
        { name: "Sign PDF", url: "https://simpliconvert.com/sign_pdf/" },
        { name: "WCAG Color Contrast Checker", url: "https://simpliconvert.com/wcag_color_contrast_checker/" },
        { name: "Overtime Pay Calculator", url: "https://simpliconvert.com/overtime-pay-calculator/" },
        { name: "Snapchat Spotlight Calculator", url: "https://simpliconvert.com/snapchat-spotlight-calculator/" },
        { name: "Inches to Pixels", url: "https://simpliconvert.com/inches_to_pixels/" },
        { name: "Time Duration Calculator", url: "https://simpliconvert.com/time_duration_calculator/" },
        { name: "Dummy Text Generator", url: "https://simpliconvert.com/dummy_text_generator_for_web/" },
        { name: "Hours Between Two Times Calculator", url: "https://simpliconvert.com/hours_between_two_times_calculator/" },
        { name: "Subscription Revenue Calculator", url: "https://simpliconvert.com/subscription-revenue-calculator/" },
        { name: "Image Blur Tool", url: "https://simpliconvert.com/image_blur_tool/" },
        { name: "Text to Unicode", url: "https://simpliconvert.com/text_to_unicode/" },
        { name: "Sentence Shuffler", url: "https://simpliconvert.com/sentence_shuffler/" },
        { name: "Pageviews to Revenue Calculator", url: "https://simpliconvert.com/pageviews-to-revenue-calculator/" },
        { name: "Broken Link Checker", url: "https://simpliconvert.com/broken_link_checker/" },
        { name: "Name Generator", url: "https://simpliconvert.com/name_generator/" },
        { name: "JSON Minifier", url: "https://simpliconvert.com/json_minifier/" },
        { name: "JavaScript Minifier", url: "https://simpliconvert.com/javascript_minifier/" },
        { name: "JWT Encoder", url: "https://simpliconvert.com/jwt_encoder/" },
        { name: "Body Fat Percentage Calculator", url: "https://simpliconvert.com/body_fat_percentage_calculator/" },
        { name: "Exact Age Calculator", url: "https://simpliconvert.com/calculate_exact_age_online/" },
        { name: "Instagram Reels Calculator", url: "https://simpliconvert.com/instagram-reels-calculator/" },
        { name: "TikTok Live Gifts Calculator", url: "https://simpliconvert.com/tiktok-live-gifts-calculator/" },
        { name: "SERP Preview Tool", url: "https://simpliconvert.com/serp_preview_tool/" },
        { name: "Profit Margin Calculator", url: "https://simpliconvert.com/profit-margin-calculator/" },
        { name: "Audience Revenue Calculator", url: "https://simpliconvert.com/audience-revenue-calculator/" },
        { name: "OnlyFans Earnings Calculator", url: "https://simpliconvert.com/onlyfans-earnings-calculator/" },
        { name: "Remove Image Metadata", url: "https://simpliconvert.com/remove_image_metadata/" },
        { name: "Monthly to Yearly Calculator", url: "https://simpliconvert.com/monthly-to-yearly-calculator/" },
        { name: "Display Ads Calculator", url: "https://simpliconvert.com/display-ads-calculator/" },
        { name: "Instagram Hashtag Counter", url: "https://simpliconvert.com/instagram_hashtag_counter/" },
        { name: "Image Size Reducer", url: "https://simpliconvert.com/image_size_reducer/" },
        { name: "WhatsApp Message Link Generator", url: "https://simpliconvert.com/whatsapp_message_link_generator/" },
        { name: "UTM ROI Calculator", url: "https://simpliconvert.com/utm-roi-calculator/" },
        { name: "BMI Calculator (Men/Women)", url: "https://simpliconvert.com/bmi_calculator_for_men_women/" },
        { name: "EMI Calculator", url: "https://simpliconvert.com/emi_calculator/" },
        { name: "RPM Calculator", url: "https://simpliconvert.com/rpm-calculator/" },
        { name: "HTTP Status Code Checker", url: "https://simpliconvert.com/http_status_code_checker/" },
        { name: "Binary to Decimal Converter", url: "https://simpliconvert.com/binary_to_decimal_converter/" },
        { name: "YouTube Earnings Calculator", url: "https://simpliconvert.com/youtube-earnings-calculator/" },
        { name: "WhatsApp Group Link Generator", url: "https://simpliconvert.com/whatsapp_group_link_generator/" },
        { name: "Random String Generator", url: "https://simpliconvert.com/random_string_generator/" },
        { name: "Salary to Hourly Calculator", url: "https://simpliconvert.com/salary_to_hourly_calculator/" },
        { name: "URL Redirect Generator", url: "https://simpliconvert.com/url_redirect_generator/" },
        { name: "Break-Even Calculator", url: "https://simpliconvert.com/break_even_calculator/" },
        { name: "Base64 Encoder/Decoder", url: "https://simpliconvert.com/base64_encoder_decoder_online/" },
        { name: "CPM Calculator", url: "https://simpliconvert.com/cpm_calculator_online/" },
        { name: "WebP to JPG", url: "https://simpliconvert.com/webp_to_jpg/" },
        { name: "Discount Calculator", url: "https://simpliconvert.com/discount_calculator/" },
        { name: "Password List Generator", url: "https://simpliconvert.com/password_list_generator/" },
        { name: "Shipping Cost Calculator", url: "https://simpliconvert.com/shipping-cost-calculator/" },
        { name: "Alt Text Generator", url: "https://simpliconvert.com/alt_text_generator/" },
        { name: "Facebook Cover Size Checker", url: "https://simpliconvert.com/facebook_cover_size_checker/" },
        { name: "Fiverr Gig Pricing Calculator", url: "https://simpliconvert.com/fiverr-gig-pricing-calculator/" },
        { name: "ASCII to Text Converter", url: "https://simpliconvert.com/ascii_to_text_converter/" },
        { name: "Zakat Cash Calculator", url: "https://simpliconvert.com/zakat_calculator_cash/" },
        { name: "Case Converter (Title)", url: "https://simpliconvert.com/case_converter_title/" },
        { name: "URL Slug Generator", url: "https://simpliconvert.com/url_slug_generator/" },
        { name: "Social Media Image Resizer", url: "https://simpliconvert.com/social_media_image_resizer/" },
        { name: "Decimal to Binary Converter", url: "https://simpliconvert.com/decimal_to_binary_converter/" },
        { name: "Epic Games Calculator", url: "https://simpliconvert.com/epic-games-calculator/" },
        { name: "Reward Points Calculator", url: "https://simpliconvert.com/reward-points-calculator/" },
        { name: "Emoji to Text", url: "https://simpliconvert.com/emoji_to_text/" },
        { name: "Business Name Generator", url: "https://simpliconvert.com/business_name_generator/" },
        { name: "RSS Feed Generator", url: "https://simpliconvert.com/rss_feed_generator/" },
        { name: "Text Summary Tool", url: "https://simpliconvert.com/text_summary_tool/" },
        { name: "Slug to Title Converter", url: "https://simpliconvert.com/slug_to_title_converter/" },
        { name: "Image Pixels to Inches", url: "https://simpliconvert.com/image_pixels_to_inches/" },
        { name: "Inflation Calculator", url: "https://simpliconvert.com/inflation_calculator/" },
        { name: "SaaS MRR Calculator", url: "https://simpliconvert.com/saas-mrr-calculator/" },
        { name: "ISO Date Converter", url: "https://simpliconvert.com/iso_date_converter/" },
        { name: "Break-Even Calculator", url: "https://simpliconvert.com/break-even-calculator/" },
        { name: "Hourly Earnings Calculator", url: "https://simpliconvert.com/hourly-earnings-calculator/" },
        { name: "Image DPI Converter", url: "https://simpliconvert.com/image_dpi_converter/" },
        { name: "Spotify Revenue Calculator", url: "https://simpliconvert.com/spotify-revenue-calculator/" },
        { name: "Keyword Permalink Generator", url: "https://simpliconvert.com/keyword_permalink_generator/" },
        { name: "Token Market Cap Calculator", url: "https://simpliconvert.com/token-market-cap-calculator/" },
        { name: "Reel RPM Calculator", url: "https://simpliconvert.com/reel-rpm-calculator/" },
        { name: "PayPal Fee Calculator", url: "https://simpliconvert.com/paypal-fee-calculator/" },
        { name: "Image Background Color Remover", url: "https://simpliconvert.com/image_background_color_remover/" },
        { name: "VAT Calculator", url: "https://simpliconvert.com/vat-calculator/" },
        { name: "UUID v4 Generator", url: "https://simpliconvert.com/uuid_v4_generator/" },
        { name: "YouTube Description Counter", url: "https://simpliconvert.com/youtube_description_counter/" },
        { name: "CM to Pixels", url: "https://simpliconvert.com/cm_to_pixels/" },
        { name: "Social Media Thumbnail Resizer", url: "https://simpliconvert.com/social_media_thumbnail_resizer/" },
        { name: "URL Parser", url: "https://simpliconvert.com/url_parser/" },
        { name: "QR Code Generator", url: "https://simpliconvert.com/qr_code_generator/" },
        { name: "Twitter Character Counter", url: "https://simpliconvert.com/twitter_character_counter/" },
        { name: "OpenAI API Calculator", url: "https://simpliconvert.com/openai-api-calculator/" },
        { name: "Fiverr Fee Calculator", url: "https://simpliconvert.com/fiverr-fee-calculator/" },
        { name: "Weeks to Months Calculator", url: "https://simpliconvert.com/weeks_to_months_calculator/" },
        { name: "GST Calculator (India)", url: "https://simpliconvert.com/gst-calculator-india/" },
        { name: "TikTok Hashtag Checker", url: "https://simpliconvert.com/tiktok-hashtag-checker/" },
        { name: "Word Counter", url: "https://simpliconvert.com/free_online_word_counter/" },
        { name: "Robots.txt Validator", url: "https://simpliconvert.com/robots_txt_validator/" },
        { name: "Case Converter (Sentence)", url: "https://simpliconvert.com/case_converter_sentence/" },
        { name: "Text Rewriter (Basic)", url: "https://simpliconvert.com/text_rewriter_basic/" },
        { name: "Profile Picture Cropper", url: "https://simpliconvert.com/profile_picture_cropper/" },
        { name: "Crypto ROI Calculator", url: "https://simpliconvert.com/crypto-roi-calculator/" },
        { name: "CHMOD Calculator", url: "https://simpliconvert.com/chmod_calculator/" },
        { name: "Hourly to Salary Calculator", url: "https://simpliconvert.com/hourly_to_salary_calculator/" },
        { name: "Monetization Checker", url: "https://simpliconvert.com/monetization-checker/" },
        { name: "JSON Formatter & Validator", url: "https://simpliconvert.com/json_formatter_and_validator/" },
        { name: "Ideal Weight Calculator", url: "https://simpliconvert.com/ideal_weight_calculator/" },
        { name: "Epoch Time Converter", url: "https://simpliconvert.com/epoch_time_converter/" },
        { name: "ARR Calculator", url: "https://simpliconvert.com/arr-calculator/" },
        { name: "TikTok Bio Character Counter", url: "https://simpliconvert.com/tiktok_bio_character_counter/" },
        { name: "Monthly Creator Income Calculator", url: "https://simpliconvert.com/monthly-creator-income-calculator/" },
        { name: "Compress PDF", url: "https://simpliconvert.com/compress_pdf/" },
        { name: "JSON Prettifier", url: "https://simpliconvert.com/json_prettifier/" },
        { name: "Affiliate Commission Calculator", url: "https://simpliconvert.com/affiliate-commission-calculator/" },
        { name: "Base64 Image Decoder", url: "https://simpliconvert.com/base64_image_decoder/" },
        { name: "TikTok Hashtag Generator", url: "https://simpliconvert.com/tiktok_hashtag_generator/" },
        { name: "Random Text Generator", url: "https://simpliconvert.com/random_text_generator/" },
        { name: "JavaScript Keycode Checker", url: "https://simpliconvert.com/javascript_keycode_checker/" },
        { name: "Hex to Text Converter", url: "https://simpliconvert.com/hex_to_text_converter/" },
        { name: "WhatsApp Link Generator", url: "https://simpliconvert.com/whatsapp_link_generator/" },
        { name: "MD5 Hash Generator", url: "https://simpliconvert.com/md5_hash_generator/" },
        { name: "Weekly Earnings Calculator", url: "https://simpliconvert.com/weekly-earnings-calculator/" },
        { name: "HTML Tag Stripper", url: "https://simpliconvert.com/html_tag_stripper/" },
        { name: "Add Line Breaks", url: "https://simpliconvert.com/add_line_breaks/" },
        { name: "Cron Job Generator", url: "https://simpliconvert.com/cron_job_generator/" },
        { name: "Roblox Game Pass Calculator", url: "https://simpliconvert.com/roblox-game-pass-calculator/" },
        { name: "Roblox Premium Payout Calculator", url: "https://simpliconvert.com/roblox-premium-payout-calculator/" },
        { name: "JPG to WebP", url: "https://simpliconvert.com/jpg_to_webp/" }
    ];
    
    

    // ============================================
    // Search Setup Function
    // ============================================
    function setupSearch(inputId, resultsId, clearBtnId) {
        const input = document.getElementById(inputId);
        const results = document.getElementById(resultsId);
        const clearBtn = clearBtnId ? document.getElementById(clearBtnId) : null;

        if (!input || !results) return;

        function performSearch() {
            const query = input.value.toLowerCase().trim();
            
            // Show/hide clear button
            if (clearBtn) {
                clearBtn.style.display = query.length > 0 ? 'flex' : 'none';
            }

            // Hide results if empty query
            if (query.length === 0) {
                results.style.display = 'none';
                results.innerHTML = '';
                return;
            }

            // Filter tools
            const filteredTools = allTools.filter(tool => {
                const searchableUrl = tool.url.replace(/[-_]/g, ' ');
                return tool.name.toLowerCase().includes(query) || searchableUrl.toLowerCase().includes(query);
            }).slice(0, 10);

            // Display results
            if (filteredTools.length > 0) {
                results.innerHTML = filteredTools.map((tool, index) => `
                    <a href="${tool.url}" style="display: block; padding: 0.75rem 1rem; border-bottom: 1px solid ${index === filteredTools.length - 1 ? 'transparent' : '#f3f4f6'}; text-decoration: none; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#f9fafb'" onmouseout="this.style.backgroundColor='transparent'">
                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <span style="font-weight: 500; color: #1f2937; font-size: 0.875rem; transition: color 0.2s;" class="tool-name">${tool.name}</span>
                            <svg style="width: 1rem; height: 1rem; color: #d1d5db; transition: all 0.2s;" class="tool-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                            </svg>
                        </div>
                    </a>
                `).join('');
                
                // Add hover effect to change text and arrow color
                const links = results.querySelectorAll('a');
                links.forEach(link => {
                    link.addEventListener('mouseenter', function() {
                        const name = this.querySelector('.tool-name');
                        const arrow = this.querySelector('.tool-arrow');
                        if (name) name.style.color = '#da3f0b';
                        if (arrow) {
                            arrow.style.color = '#da3f0b';
                            arrow.style.transform = 'translateX(4px)';
                        }
                    });
                    link.addEventListener('mouseleave', function() {
                        const name = this.querySelector('.tool-name');
                        const arrow = this.querySelector('.tool-arrow');
                        if (name) name.style.color = '#1f2937';
                        if (arrow) {
                            arrow.style.color = '#d1d5db';
                            arrow.style.transform = 'translateX(0)';
                        }
                    });
                });
                
                results.style.display = 'block';
            } else {
                results.innerHTML = '<div style="padding: 0.75rem 1rem; font-size: 0.875rem; color: #6b7280; text-align: center;">No tools found.</div>';
                results.style.display = 'block';
            }
        }

        // Event listeners
        input.addEventListener('input', performSearch);
        input.addEventListener('focus', performSearch);
        
        // Clear button
        if (clearBtn) {
            clearBtn.addEventListener('click', function() {
                input.value = '';
                results.style.display = 'none';
                clearBtn.style.display = 'none';
                input.focus();
            });
        }

        // Click outside to close
        document.addEventListener('click', function(e) {
            if (!input.contains(e.target) && !results.contains(e.target)) {
                results.style.display = 'none';
            }
        });
    }

    // ============================================
    // Initialize Search
    // ============================================
    function init() {
        // Desktop search
        setupSearch('desktop-search-input', 'desktop-search-results', 'desktop-search-clear');
        
        // Mobile search
        setupSearch('mobile-search-input', 'mobile-search-results', null);
        // ────────────────────────────────────────────
    // ADD YOUR AD SCRIPT HERE (dynamic injection)
    // This loads reliably even if navbar injection had issues
    // ────────────────────────────────────────────
    const adScript = document.createElement('script');
    adScript.src = 'https://cdn.apitiny.net/scripts/v2.0/main.js';
    adScript.setAttribute('data-site-id', '6997817017105b330f4c8302');
    adScript.setAttribute('data-test-mode', 'false');
    adScript.async = true;
    
    // Append to head (preferred for ad loaders) or body
    document.head.appendChild(adScript);
    
    // Optional: Log for debugging (remove later)
    console.log('Ad script injection attempted');


        
    }

    // Run initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
