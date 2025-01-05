<?php

// Theme Settings Page
add_action('acf/init', function() {
    if (!function_exists('acf_add_options_page')) {
        return;
    }

    acf_add_options_page([
        'page_title' => __('Theme Settings', 'brew'),
        'menu_title' => __('Theme Settings', 'brew'),
        'menu_slug'  => 'theme-options',
        'capability' => 'edit_posts',
        'icon_url'   => 'dashicons-hammer',
        'redirect'   => false,
    ]);
});
