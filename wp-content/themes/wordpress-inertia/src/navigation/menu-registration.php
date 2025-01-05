<?php

/**
 * Register navigation menus
 */
function register_my_menus() {
    register_nav_menus(
        array(
            'header' => __('Header Menu'),
            'resources' => __('Resources Menu'),
            'follows' => __('Follow Menu'),
            'legals' => __('Legal Menu'),
        )
    );
}
add_action('init', 'register_my_menus');
