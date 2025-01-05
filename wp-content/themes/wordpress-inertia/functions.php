<?php

// Composer autoloader
require_once get_stylesheet_directory() . '/vendor/autoload.php';

// General function helpers
require get_stylesheet_directory() . '/src/helpers.php';

// WP actions and filters setup
require get_stylesheet_directory() . '/src/wp-hooks.php';

// Register 'movie' custom post type
require get_stylesheet_directory() . '/src/movie-cpt.php';

// Custom REST API endpoints
require get_stylesheet_directory() . '/src/rest-endpoints.php';

// Menu Utilities
require get_stylesheet_directory() . '/src/navigation/menu-items.php';
require get_stylesheet_directory() . '/src/navigation/menu-registration.php';

// ACF Theme Settings
require get_stylesheet_directory() . '/src/theme-settings.php';

// ACF Archive Settings
require get_stylesheet_directory() . '/src/archive-settings.php';

// ACF JSON Path
require get_stylesheet_directory() . '/src/acf-json-path.php';

// Image data transformation
require get_stylesheet_directory() . '/src/image-transform.php';

// Post data transformation
require get_stylesheet_directory() . '/src/posts-transform.php';

// Inertia Globals
require get_stylesheet_directory() . '/src/inertia-globals.php';

// Custom Excerpt
require get_stylesheet_directory() . '/src/custom-excerpt.php';