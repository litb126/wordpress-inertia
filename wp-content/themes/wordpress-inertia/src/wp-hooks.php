<?php

use BoxyBird\Inertia\Inertia;

// WP enqueue
add_action('wp_enqueue_scripts', function () {
    // Get the file paths
    $css_file = get_stylesheet_directory() . '/dist/css/app.css';
    $js_file = get_stylesheet_directory() . '/dist/js/app.js';
    
    // Get the file modification times for versioning
    $css_version = file_exists($css_file) ? filemtime($css_file) : 'latest';
    $js_version = file_exists($js_file) ? filemtime($js_file) : 'latest';

    wp_enqueue_style('google_fonts', 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
    wp_enqueue_style('bb_inertia', get_stylesheet_directory_uri() . '/dist/css/app.css', [], $css_version);
    wp_enqueue_script('bb_inertia', get_stylesheet_directory_uri() . '/dist/js/app.js', ['jquery'], $js_version, true);

    wp_localize_script('bb_inertia', 'bbInertia', [
        'nonce'         => wp_create_nonce('wp_rest'),
        'bb_ajax_nonce' => wp_create_nonce('bb_ajax_nonce'),
    ]);
});

// Set custom Inertia root view
// by default it's 'app.php'
add_action('init', function () {
    Inertia::setRootView('layout.php');
});

// Share globally with Inertia views
add_action('init', function () {
    Inertia::share([
        'site' => [
            'name'       => get_bloginfo('name'),
            'description'=> get_bloginfo('description'),
        ]
    ]);
});

// Add Inertia verison
// Helps with cache busting
add_action('init', function () {
    $manifest = get_stylesheet_directory() . '/mix-manifest.json';

    Inertia::version(md5_file($manifest));
});

// General WP theme options
add_action('init', function () {
    add_theme_support('menus');
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
});
