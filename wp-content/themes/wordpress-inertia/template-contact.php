<?php
/**
* Template Name: Contact
*
* Description: A custom template for displaying a contact form.
*/

use BoxyBird\Inertia\Inertia;

global $post;
$id = $post->ID;

$shortcode = get_field('shortcode', $id);
$shortcodeHtml = do_shortcode($shortcode);

$banner = [
  'title' => get_field('title', $id),
  'subtitle' => get_field('subtitle', $id),
  'callToActions' => get_field('call_to_actions', $id),
  'backgroundChoice' => get_field('background_choice', $id),
  'backgroundColour' => get_field('background_colour', $id),
  'backgroundImage' => setImage(get_field('background_image', $id)),
  'displayOverlay' => get_field('display_overlay', $id),
];

Inertia::render('Contact', [
  'banner' => $banner,
  'shortcode' => $shortcodeHtml,
  'heading' => get_field('content', $id),
]);
