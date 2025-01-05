<?php 

use BoxyBird\Inertia\Inertia;

global $post;
$current_id = $post->ID;

$backgroundImage = [
  'src' => get_stylesheet_directory_uri() . '/resources/images/film-reel.jpg',
  'alt' => 'Movies Archive Background',
  'width' => '1964',
  'height' => '520'
];

$banner = [
  'title' => get_the_archive_title($current_id),
  'backgroundColour' => 'blue',
  'backgroundChoice' => false,
  'backgroundImage' => $backgroundImage,
  'displayOverlay' => true,
];

return Inertia::render('Movies/Index', [
    'banner' => $banner,
]);
