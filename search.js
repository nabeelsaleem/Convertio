(function() {
    // 1. The Master Tool Database
    const allTools = [
        { name: "Base64 Encoder Decoder", url: "https://simpliconvert.com/base64_encoder_decoder_online/" },
        { name: "JSON Formatter & Validator", url: "https://simpliconvert.com/json_formatter_and_validator/" },
        { name: "YouTube Thumbnail Downloader", url: "https://simpliconvert.com/youtube_thumbnail_downloader/" },
        { name: "Percentage Calculator", url: "https://simpliconvert.com/calculate_percentage_of_number/" },
        { name: "Instagram Caption Line Break", url: "https://simpliconvert.com/instagram_caption_line_break/" },
        { name: "Password Generator", url: "https://simpliconvert.com/password_generator/" },
        { name: "Image Resizer", url: "https://simpliconvert.com/image_resizer/" },
        { name: "Javascript Keycode Checker", url: "https://simpliconvert.com/javascript_keycode_checker/" },
        { name: "Word Counter", url: "https://simpliconvert.com/free_online_word_counter/" },
        { name: "Split PDF", url: "https://simpliconvert.com/split_pdf/" },
        { name: "Meta Tag Generator", url: "https://simpliconvert.com/meta_tag_generator/" },
        { name: "Stopwatch & Timer", url: "https://simpliconvert.com/online_stopwatch_and_timer/" },
        { name: "WCAG Contrast Checker", url: "https://simpliconvert.com/wcag_color_contrast_checker/" },
        { name: "PDF to Images", url: "https://simpliconvert.com/pdf_to_images/" },
        { name: "UTM Link Builder", url: "https://simpliconvert.com/utm_link_builder/" },
        { name: "Unix Timestamp Converter", url: "https://simpliconvert.com/unix_timestamp_converter_online/" },
        { name: "Crypto Profit Calculator", url: "https://simpliconvert.com/crypto_profit_calculator/" },
        { name: "ASCII Art Generator", url: "https://simpliconvert.com/text_to_ascii_art_generator/" },
        { name: "WhatsApp Link Generator", url: "https://simpliconvert.com/whatsapp_link_generator/" },
        { name: "QR Code Generator", url: "https://simpliconvert.com/qr_code_generator/" },
        { name: "BMI Calculator", url: "https://simpliconvert.com/bmi_calculator_for_men_women/" },
        { name: "Markdown Editor", url: "https://simpliconvert.com/markdown_editor/" },
        { name: "Gross Margin Calculator", url: "https://simpliconvert.com/gross_margin_calculator/" },
        { name: "Age Calculator", url: "https://simpliconvert.com/calculate_exact_age_online/" },
        { name: "Cron Job Generator", url: "https://simpliconvert.com/cron_job_generator/" },
        { name: "Download Time Calculator", url: "https://simpliconvert.com/file_download_time_calculator/" },
        { name: "CPM Calculator", url: "https://simpliconvert.com/cpm_calculator_online/" },
        { name: "To-Do List", url: "https://simpliconvert.com/to_do_list/" },
        { name: "PNG to GIF", url: "https://simpliconvert.com/png_to_gif/" },
        { name: "JSON to CSV", url: "https://simpliconvert.com/json_to_csv_converter_online/" },
        { name: "Freelance Rate Calculator", url: "https://simpliconvert.com/freelance_hourly_rate_calculator/" },
        { name: "CSS Gradient Generator", url: "https://simpliconvert.com/css_gradient_background_generator/" },
        { name: "Merge PDF", url: "https://simpliconvert.com/merge_pdf_online/" },
        { name: "Mailto Generator", url: "https://simpliconvert.com/mailto_link_generator/" },
        { name: "HTML Color Picker", url: "https://simpliconvert.com/html_color_by_code/" },
        { name: "Compress PDF", url: "https://simpliconvert.com/compress_pdf/" },
        { name: "SQL Formatter", url: "https://simpliconvert.com/sql_formatter_online/" },
        { name: "Image Aspect Ratio", url: "https://simpliconvert.com/image_aspect_ratio_calculator/" },
        { name: "Text Case Converter", url: "https://simpliconvert.com/online_text_case_converter/" },
        { name: "ROAS Calculator", url: "https://simpliconvert.com/roas_calculator/" },
        { name: "Compare Text Files", url: "https://simpliconvert.com/compare_text_files_online/" },
        { name: "Pomodoro Timer", url: "https://simpliconvert.com/online_pomodoro_study_timer/" },
        { name: "Image Converter", url: "https://simpliconvert.com/image_format_converter/" },
        { name: "YouTube Timestamp Link", url: "https://simpliconvert.com/youtube_timestamp_link/" },
        { name: "Dummy Text Generator", url: "https://simpliconvert.com/dummy_text_generator_for_web/" },
        { name: "Images to PDF", url: "https://simpliconvert.com/images_to_pdf/" },
        { name: "URL Encoder Decoder", url: "https://simpliconvert.com/url_encoder_decoder_online/" },
        { name: "Remove Duplicate Lines", url: "https://simpliconvert.com/remove_duplicate_lines_online/" },
        { name: "PayPal Fee Calculator", url: "https://simpliconvert.com/paypal_fee_calculator/" },
        { name: "CSS Box Shadow", url: "https://simpliconvert.com/css_box_shadow_generator/" },
        { name: "Chmod Calculator", url: "https://simpliconvert.com/chmod_calculator/" },
        { name: "Pixels to REM", url: "https://simpliconvert.com/pixels_to_rem_converter/" },
        { name: "SVG Blob Generator", url: "https://simpliconvert.com/random_svg_blob_generator/" },
        { name: "Roblox DevEx Calculator", url: "https://simpliconvert.com/roblox_devex_calculator/" },
        { name: "Random List Shuffler", url: "https://simpliconvert.com/random_list_shuffler/" },
        { name: "UUID Generator", url: "https://simpliconvert.com/uuid_generator_online/" },
        { name: "Image to Base64", url: "https://simpliconvert.com/image_to_base64_converter/" },
        { name: "AI Prompt Generator (VEO3)", url: "https://simpliconvert.com/veo3_json_prompt_generator/" },
        { name: "HTML Tag Stripper", url: "https://simpliconvert.com/html_tag_stripper/" },
        { name: "Sign PDF", url: "https://simpliconvert.com/sign_pdf/" },
        { name: "Zakat Calculator", url: "https://simpliconvert.com/zakat_calculator_gold_silver/" },
        { name: "PDF to Word", url: "https://simpliconvert.com/pdf_to_word/" },
        { name: "JPG to PDF", url: "https://simpliconvert.com/jpg_to_pdf/" },
        { name: "Binary Translator", url: "https://simpliconvert.com/binary_code_translator/" },
        { name: "Internet Speed Test", url: "https://simpliconvert.com/internet_download_speed_test/" },
        { name: "URL Slug Generator", url: "https://simpliconvert.com/url_slug_generator/" },
        { name: "Favicon Generator", url: "https://simpliconvert.com/free_favicon_generator_online/" },
        { name: "Robots.txt Generator", url: "https://simpliconvert.com/robots_txt_generator/" },
        { name: "Age in Days Calculator", url: "https://simpliconvert.com/age_in_days_calculator/" },
        { name: "Age in Weeks Calculator", url: "https://simpliconvert.com/age_in_weeks_calculator/" },
        { name: "BMI Calculator for Kids", url: "https://simpliconvert.com/bmi_calculator_kids/" },
        { name: "BMR Calculator", url: "https://simpliconvert.com/bmr_calculator/" },
        { name: "Body Fat % Calculator", url: "https://simpliconvert.com/body_fat_percentage_calculator/" },
        { name: "Break Even Calculator", url: "https://simpliconvert.com/break_even_calculator/" },
        { name: "Currency Percentage Calc", url: "https://simpliconvert.com/currency_percentage_calculator/" },
        { name: "Date Difference Calculator", url: "https://simpliconvert.com/date_difference_calculator/" },
        { name: "Days to Weeks Converter", url: "https://simpliconvert.com/days_to_weeks_converter/" },
        { name: "Discount Calculator", url: "https://simpliconvert.com/discount_calculator/" },
        { name: "Distance Speed Time", url: "https://simpliconvert.com/distance_speed_time_calculator/" },
        { name: "EMI Calculator", url: "https://simpliconvert.com/emi_calculator/" },
        { name: "Fuel Cost Calculator", url: "https://simpliconvert.com/fuel_cost_calculator/" },
        { name: "Hourly to Salary", url: "https://simpliconvert.com/hourly_to_salary_calculator/" },
        { name: "Hours Between Times", url: "https://simpliconvert.com/hours_between_two_times_calculator/" },
        { name: "Ideal Weight Calculator", url: "https://simpliconvert.com/ideal_weight_calculator/" },
        { name: "Inflation Calculator", url: "https://simpliconvert.com/inflation_calculator/" },
        { name: "Minutes to Hours", url: "https://simpliconvert.com/minutes_to_hours_converter/" },
        { name: "Monthly to Yearly Salary", url: "https://simpliconvert.com/monthly_to_yearly_salary_calculator/" },
        { name: "Mortgage Calculator", url: "https://simpliconvert.com/mortgage_calculator/" },
        { name: "Overtime Pay Calculator", url: "https://simpliconvert.com/overtime_pay_calculator/" },
        { name: "Percentage Decrease", url: "https://simpliconvert.com/percentage_decrease_calculator/" },
        { name: "Percentage Difference", url: "https://simpliconvert.com/percentage_difference_calculator/" },
        { name: "Percentage Increase", url: "https://simpliconvert.com/percentage_increase_calculator/" },
        { name: "Pregnancy Due Date", url: "https://simpliconvert.com/pregnancy_due_date_calculator/" },
        { name: "Profit Margin Calculator", url: "https://simpliconvert.com/profit_margin_calculator/" },
        { name: "ROI Calculator", url: "https://simpliconvert.com/roi_calculator/" },
        { name: "Salary to Hourly", url: "https://simpliconvert.com/salary_to_hourly_calculator/" },
        { name: "Sales Tax Calculator", url: "https://simpliconvert.com/sales_tax_calculator/" },
        { name: "Savings Growth Calculator", url: "https://simpliconvert.com/savings_growth_calculator/" },
        { name: "Time Duration Calculator", url: "https://simpliconvert.com/time_duration_calculator/" },
        { name: "Tip Calculator", url: "https://simpliconvert.com/tip_calculator/" },
        { name: "VAT Calculator", url: "https://simpliconvert.com/vat_calculator/" },
        { name: "Water Intake Calculator", url: "https://simpliconvert.com/water_intake_calculator/" },
        { name: "Weeks to Months", url: "https://simpliconvert.com/weeks_to_months_calculator/" },
        { name: "Work Hours Calculator", url: "https://simpliconvert.com/work_hours_calculator/" },
        { name: "Zakat Business Calc", url: "https://simpliconvert.com/zakat_calculator_business/" },
        { name: "Zakat Cash Calc", url: "https://simpliconvert.com/zakat_calculator_cash/" }
    ];

    // 2. Search Function
    function setupSearch(inputId, resultsId, clearBtnId) {
        const input = document.getElementById(inputId);
        const results = document.getElementById(resultsId);
        const clearBtn = clearBtnId ? document.getElementById(clearBtnId) : null;

        if (!input || !results) return;

        function performSearch() {
            const query = input.value.toLowerCase().trim();
            if (clearBtn) query.length > 0 ? clearBtn.classList.remove('hidden') : clearBtn.classList.add('hidden');

            if (query.length === 0) {
                results.classList.add('hidden');
                results.innerHTML = '';
                return;
            }

            const filteredTools = allTools.filter(tool => {
                const searchableUrl = tool.url.replace(/[-_]/g, ' ');
                return tool.name.toLowerCase().includes(query) || searchableUrl.toLowerCase().includes(query);
            }).slice(0, 10);

            if (filteredTools.length > 0) {
                results.innerHTML = filteredTools.map(tool => `
                    <a href="${tool.url}" class="block px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors group">
                        <div class="flex items-center justify-between">
                            <span class="font-medium text-gray-800 text-sm group-hover:text-primary">${tool.name}</span>
                            <svg class="w-4 h-4 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                            </svg>
                        </div>
                    </a>
                `).join('');
                results.classList.remove('hidden');
            } else {
                results.innerHTML = `<div class="px-4 py-3 text-sm text-gray-500 text-center">No tools found.</div>`;
                results.classList.remove('hidden');
            }
        }

        input.addEventListener('input', performSearch);
        input.addEventListener('focus', performSearch);
        
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                input.value = '';
                results.classList.add('hidden');
                clearBtn.classList.add('hidden');
                input.focus();
            });
        }

        document.addEventListener('click', (e) => {
            if (!input.contains(e.target) && !results.contains(e.target)) results.classList.add('hidden');
        });
    }

    // 3. Initialize Everything Immediately
    setupSearch('desktop-search-input', 'desktop-search-results', 'desktop-search-clear');
    setupSearch('mobile-search-input', 'mobile-search-results', null);

    // 4. Initialize Mobile Menu
    const btn = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');
    const iconOpen = document.getElementById('mobile-menu-icon-open');
    const iconClose = document.getElementById('mobile-menu-icon-close');

    if(btn) {
        btn.addEventListener('click', () => {
            const isOpen = !menu.classList.contains('hidden');
            if(isOpen) {
                menu.classList.add('hidden');
                iconOpen.classList.remove('hidden');
                iconClose.classList.add('hidden');
            } else {
                menu.classList.remove('hidden');
                iconOpen.classList.add('hidden');
                iconClose.classList.remove('hidden');
            }
        });
    }
})();
