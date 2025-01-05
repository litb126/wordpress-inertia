<?php

use BoxyBird\Inertia\Inertia;

global $post;
$current_id = $post->ID;

// Get categories and create comma-separated string
$categories = get_the_terms($current_id, 'category');
$categories_string = '';
if (!empty($categories) && !is_wp_error($categories)) {
    $categories_string = implode(', ', array_map(function ($category) {
        return $category->name;
    }, $categories));
}

$banner = [
    'title' => get_the_title($current_id),
    'subtitle' => $categories_string,
    'backgroundColour' => 'blue',
    'backgroundChoice' => false,
    'backgroundImage' => setImage(get_post_thumbnail_id($current_id)),
    'displayOverlay' => true,
];

$previous_post = get_previous_post();
$next_post = get_next_post();

Inertia::render('Posts/Show', [
    'banner' => $banner,
    'content' => get_the_content($current_id),
    'previousPost' => ($previous_post) ? getPostsInfo($previous_post) : '',
    'nextPost' => ($next_post) ? getPostsInfo($next_post) : '',
]);
