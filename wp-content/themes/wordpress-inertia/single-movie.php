<?php

use BoxyBird\Inertia\Inertia;

$movies = array_map(function ($movie) {
    $genres = get_the_terms($movie->ID, 'genre');

    $genres_string = '';
    if (!empty($genres) && !is_wp_error($genres)) {
        $genres_string = implode(', ', array_map(function ($genre) {
            return $genre->name;
        }, $genres));
    }
    
    return [
        'id'      => $movie->ID,
        'poster'  => get_the_post_thumbnail_url($movie->ID),
        'content' => get_the_content(null, false, $movie->ID),
        'title'   => html_entity_decode(get_the_title($movie->ID)),
        'genres'  => $genres_string,
        'meta'    => array_map(function ($meta) {
            return $meta[0];
        }, get_post_meta($movie->ID)),
    ];
}, $wp_query->posts);

$banner = [
    'title' => $movies[0]['title'],
    'subtitle' => $movies[0]['genres'],
    'backgroundColour' => 'blue',
    'backgroundChoice' => false,
    'backgroundImage' => setImage($movies[0]['poster']),
    'displayOverlay' => true,
];
  
$previous_post = get_previous_post();
$next_post = get_next_post();

return Inertia::render('Movies/Show', [
    'banner' => $banner,
    'content' => $movies[0]['content'],
    'previousPost' => ($previous_post) ? getPostsInfo($previous_post) : '',
    'nextPost' => ($next_post) ? getPostsInfo($next_post) : '',
]);
