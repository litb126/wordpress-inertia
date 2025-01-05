<?php

// Set directory for ACF JSON files
$acf_json_path = get_stylesheet_directory() . '/acf-json';

// Create directory if it doesn't exist
if (!file_exists($acf_json_path)) {
    mkdir($acf_json_path, 0755, true);
}

// Save ACF fields to JSON file
add_filter('acf/settings/save_json', function() use ($acf_json_path): string {
    return $acf_json_path;
});

// Load ACF fields from JSON file
add_filter('acf/settings/load_json', function($paths) use ($acf_json_path): array {
    // Remove original path (optional)
    unset($paths[0]);
    
    // Append our path
    $paths[] = $acf_json_path;
    
    return $paths;
});
