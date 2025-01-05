<?php 

use BoxyBird\Inertia\Inertia;

add_action('init', function () {
    Inertia::share([
      'global' => [
        'siteLogo' => setImage(get_field('site_logo', 'option')),
        'header' => get_menu_items('header'),
        'resources' => get_menu_items('resources'),
        'follows' => get_menu_items('follows'),
        'legals' => get_menu_items('legals'),
        'socials' => get_field('social_links', 'option'),
        'postsPerPage' => get_option('posts_per_page'),
      ],
    ]);
});
