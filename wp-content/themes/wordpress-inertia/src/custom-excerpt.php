<?php

/**
 * Customize the excerpt length
 */
function custom_excerpt_length() {
    return 20;
}
add_filter('excerpt_length', 'custom_excerpt_length');

/**
 * Customize the excerpt more text
 */
function custom_excerpt_more() {
    return '...';
}
add_filter('excerpt_more', 'custom_excerpt_more');