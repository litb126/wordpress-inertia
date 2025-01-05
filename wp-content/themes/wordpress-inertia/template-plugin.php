<?php
/**
* Template Name: Plugin
*/

use BoxyBird\Inertia\Inertia;

// Get the shortcode content
do_shortcode('[simple_contact_form]');

Inertia::render('Plugin');
