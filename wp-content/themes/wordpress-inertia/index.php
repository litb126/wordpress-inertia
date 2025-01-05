<?php

use BoxyBird\Inertia\Inertia;

global $post;
$current_id = $post->ID;

$page_for_posts = get_option( 'page_for_posts' );

if ($page_for_posts && has_post_thumbnail($page_for_posts)) {
  $thumb_id = get_post_thumbnail_id($page_for_posts);
  $blog_page_title = get_the_title($page_for_posts);
} 

$banner = [
  'title' => $blog_page_title,
  'backgroundColour' => 'blue',
  'backgroundChoice' => false,
  'backgroundImage' => setImage($thumb_id),
  'displayOverlay' => true,
];

return Inertia::render('Posts/Index', [
    'banner' => $banner,
]);
