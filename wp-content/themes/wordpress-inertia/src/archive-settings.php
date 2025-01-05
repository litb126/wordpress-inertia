<?php

// Archive Options Pages
add_action('registered_post_type', function(string $postTypeSlug, WP_Post_Type $postType) {
    if (!function_exists('acf_add_options_page')) {
        return;
    }

    if (!$postType->has_archive) {
        return;
    }

    $menuSlug = $postTypeSlug . '-theme-options';
    $fieldGroups = acf_get_field_groups(['options_page' => $menuSlug]);

    acf_add_options_sub_page([
        'page_title'  => sprintf(__('%s Archive', 'brew'), $postType->label),
        'menu_title'  => __('Archive Settings', 'brew'),
        'menu_slug'   => $menuSlug,
        'parent_slug' => 'edit.php?' . http_build_query(['post_type' => $postTypeSlug]),
        'capability'  => count($fieldGroups) > 0 ? 'edit_posts' : '_not_allowed',
        'redirect'    => false,
        'position'    => 1,
    ]);
}, 10, 2);
