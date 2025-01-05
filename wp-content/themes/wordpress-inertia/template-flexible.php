<?php
/**
* Template Name: Flexible Content
*
* Description: A custom template for displaying flexible content.
*/

use BoxyBird\Inertia\Inertia;

$LAYOUT_MAP = [
    'banner' => [
        'title' => 'title',
        'subtitle' => 'subtitle',
        'callToActions' => 'call_to_actions',
        'backgroundChoice' => 'background_choice',
        'backgroundColour' => 'background_colour',
        'backgroundImage' => ['field' => 'background_image', 'transform' => 'setImage'],
        'displayOverlay' => 'display_overlay'
    ],
    'content_beside_image' => [
        'content' => 'content',
        'callToActions' => 'call_to_actions',
        'imagePosition' => 'image_position',
        'image' => ['field' => 'image', 'transform' => 'setImage']
    ],
    'featured_posts' => [
        'content' => 'content',
        'callToActions' => 'call_to_actions',
        'posts' => ['field' => 'featured_posts', 'transform' => 'getAcfPostsInfo']
    ],
    'frequently_asked_questions' => [
        'content' => 'content',
        'faqs' => 'faqs'
    ],
    'hero' => [
        'title' => 'title',
        'subtitle' => 'subtitle',
        'callToActions' => 'call_to_actions',
        'backgroundChoice' => 'background_choice',
        'backgroundColour' => 'background_colour',
        'backgroundImage' => ['field' => 'background_image', 'transform' => 'setImage'],
        'displayOverlay' => 'display_overlay'
    ],
    'heading' => [
        'content' => 'content'
    ],
    'team_cards' => [
        'content' => 'content',
        'members' => ['field' => 'team_members', 'transform' => ['getAcfRepeaterImages', ['image']]]
    ]
];

$flexible_content = get_field('content');
$flexible_content_array = [];

if ($flexible_content) {
    while (have_rows('content')) {
        the_row();
        $layout_name = get_row_layout();
        
        if (!isset($LAYOUT_MAP[$layout_name])) {
            continue;
        }

        $data = [
            'layout_name' => $layout_name,
            'data' => []
        ];

        foreach ($LAYOUT_MAP[$layout_name] as $key => $field) {
            if (is_array($field)) {
                $value = get_sub_field($field['field']);
                if (is_array($field['transform'])) {
                    $func = $field['transform'][0];
                    $args = $field['transform'][1];
                    $data['data'][$key] = $func($field['field'], $args);
                } else {
                    $func = $field['transform'];
                    $data['data'][$key] = $func($value);
                }
            } else {
                $data['data'][$key] = get_sub_field($field);
            }
        }

        $flexible_content_array[] = $data;
    }
}

Inertia::render('Flexible', [
    'content' => $flexible_content_array,
]);
