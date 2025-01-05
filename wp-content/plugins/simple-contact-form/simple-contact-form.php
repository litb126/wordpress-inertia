<?php
/**
 * Plugin Name: Simple Contact Form
 * Description: A simple contact form plugin.
 * Version: 1.0.0
 * Author: Liam Buxton
 * Author URI: https://liambuxton.co.uk
 * Text Domain: simple-contact-form
 */

 if ( ! defined( 'ABSPATH' ) ) {
  exit;
}

class SimpleContactForm {
  public function __construct() {
    // Create custom post type
    add_action('init', array($this, 'create_custom_post_type'));

    // Enqueue scripts
    add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));

    // Add shortcode
    add_shortcode('simple_contact_form', array($this, 'load_simple_contact_form_shortcode'));

    // Load scripts
    add_action('wp_footer', array($this, 'load_scripts'));

    // Register REST API
    add_action('rest_api_init', array($this, 'register_rest_api'));

    // Add custom fields meta box
    add_action('add_meta_boxes', array($this, 'add_custom_fields_meta_box'));

    // Add these new actions
    add_filter('manage_simple_contact_form_posts_columns', array($this, 'set_custom_columns'));
    add_action('manage_simple_contact_form_posts_custom_column', array($this, 'custom_column_content'), 10, 2);
  }

  public function create_custom_post_type() {
    register_post_type('simple_contact_form', array(
      'labels' => array(
        'name' => 'Contact Form',
        'singular_name' => 'Contact Form Entry'
      ),
      'public' => true,
      'has_archive' => true,
      'supports' => array('custom-fields'),
      'exclude_from_search' => true,
      'publicly_queryable' => false,
      'show_in_nav_menus' => false,
      'show_in_rest' => true,
      'capability' => 'manage_options',
      'menu_icon' => 'dashicons-media-text',
    ));
  }

  public function enqueue_scripts() {
    wp_enqueue_style(
      'simple-contact-form-styles',
      plugin_dir_url( __FILE__ ) . 'css/simple-contact-form.css',
      array(),
      1,
      'all'
    );

    wp_enqueue_script(
      'simple-contact-form-script',
      plugin_dir_url( __FILE__ ) . 'js/simple-contact-form.js',
      array('jquery'),
      1,
      true
    );
  }

  public function load_scripts() {
    ?>
      <script>
        var nonce = '<?php echo wp_create_nonce('wp_rest'); ?>';

        jQuery(document).ready(function($) {
          const form = $('#simple-contact-form');
          const successMessage = $('#form-success');
          const errorMessage = $('#form-error');

          form.on('submit', function(e) {
            e.preventDefault();
            
            // Hide any existing messages
            successMessage.hide();
            errorMessage.hide();
            
            var formData = $(this).serialize();
            
            $.ajax({
              url: simple_contact_form.rest_url,
              method: 'POST',
              data: formData,
              headers: {
                'X-WP-Nonce': simple_contact_form.nonce
              },
              success: function(response) {
                // Show success message
                successMessage.show();
                // Reset form
                form[0].reset();
              },
              error: function(xhr) {
                // Show error message
                errorMessage.show();
              }
            });
          });
        });
      </script>
    <?php
  }

  public function load_simple_contact_form_shortcode() {
    ?>
      <div class="simple-contact-form">
        <h1>Send us an email</h1>
        <p>Please fill out the form below and we'll get back to you as soon as possible.</p>
        <form id="simple-contact-form">
          <input type="text" name="simple-contact-form-name" id="simple-contact-form-name" placeholder="Name" required>
          <input type="email" name="simple-contact-form-email" id="simple-contact-form-email" placeholder="Email" required>
          <input type="tel" name="simple-contact-form-phone" id="simple-contact-form-phone" placeholder="Phone">
          <textarea name="simple-contact-form-message" id="simple-contact-form-message" placeholder="Message" required></textarea>
          <button type="submit">Submit</button>
          <div id="form-success" class="form-message success" style="display: none;">Thank you for your message. We'll be in touch soon!</div>
          <div id="form-error" class="form-message error" style="display: none;">Sorry, there was an error. Please try again.</div>
        </form>
      </div>
    <?php
  }

  public function register_rest_api() {
    register_rest_route('simple-contact-form/v1', 'send-email', array(
      'methods' => 'POST',
      'callback' => array($this, 'handle_contact_form'),
    ));
  }

  public function handle_contact_form($data) {
    $headers = $data->get_headers();
    $params = $data->get_params();
    $nonce = $headers['x_wp_nonce'][0];

    if (!wp_verify_nonce($nonce, 'wp_rest')) {
      return new WP_REST_Response('Invalid nonce', 422);
    }

    $post_id = wp_insert_post(array(
      'post_title' => 'Contact enquiry: ' . $params['simple-contact-form-name'],
      'post_content' => json_encode($params),
      'post_status' => 'publish',
      'post_type' => 'simple_contact_form',
      'meta_input' => array(
        'name' => $params['simple-contact-form-name'],
        'email' => $params['simple-contact-form-email'],
        'phone' => $params['simple-contact-form-phone'],
        'message' => $params['simple-contact-form-message'],
      ),
    ));

    if ($post_id) {
      return new WP_REST_Response('Email sent', 200);
    } else {
      return new WP_REST_Response('Error sending email', 500);
    }
  }

  public function add_custom_fields_meta_box() {
    add_meta_box(
      'contact_form_fields',
      'Contact Form Details',
      array($this, 'display_custom_fields'),
      'simple_contact_form',
      'normal',
      'high'
    );
  }

  public function display_custom_fields($post) {
    $name = get_post_meta($post->ID, 'name', true);
    $email = get_post_meta($post->ID, 'email', true);
    $phone = get_post_meta($post->ID, 'phone', true);
    $message = get_post_meta($post->ID, 'message', true);
    ?>
    <div class="contact-form-fields">
      <p><strong>Name:</strong> <?php echo esc_html($name); ?></p>
      <p><strong>Email:</strong> <a href="mailto:<?php echo esc_html($email); ?>"><?php echo esc_html($email); ?></a></p>
      <p><strong>Phone:</strong> <?php echo esc_html($phone); ?></p>
      <p><strong>Message:</strong> <?php echo esc_html($message); ?></p>
    </div>
    <?php
  }

  public function set_custom_columns($columns) {
    $columns = array(
        'cb' => $columns['cb'],
        'name' => __('Name', 'simple-contact-form'),
        'email' => __('Email', 'simple-contact-form'),
        'phone' => __('Phone', 'simple-contact-form'),
        'date' => __('Date', 'simple-contact-form')
    );
    return $columns;
  }

  public function custom_column_content($column, $post_id) {
    switch ($column) {
        case 'name':
            $name = get_post_meta($post_id, 'name', true);
            $edit_link = get_edit_post_link($post_id);
            echo '<a href="' . esc_url($edit_link) . '">' . esc_html($name) . '</a>';
            break;
        case 'email':
            $email = get_post_meta($post_id, 'email', true);
            echo '<a href="mailto:' . esc_attr($email) . '">' . esc_html($email) . '</a>';
            break;
        case 'phone':
            echo esc_html(get_post_meta($post_id, 'phone', true));
            break;
    }
  }
}

new SimpleContactForm();
