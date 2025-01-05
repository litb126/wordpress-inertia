<?php

/**
 * Transform an ACF image field into a standardized format
 * 
 * @param mixed $acfImage ACF image field value
 * @return array|null Processed image data or null if invalid
 */
function setImage($acfImage) {
    if (is_array($acfImage)) {
        $image = array();
        
        $image['alt'] = get_post_meta($acfImage['ID'], '_wp_attachment_image_alt', true);
        $image['src'] = wp_get_attachment_image_url($acfImage['ID'], 'full');
        $image['srcset'] = wp_get_attachment_image_srcset($acfImage['ID'], 'full');
        
        return $image;
    } elseif (filter_var($acfImage, FILTER_VALIDATE_URL)) {
        $image = array();
        
        $image['src'] = $acfImage;
        
        return $image;
    } elseif (is_numeric($acfImage)) {
        $image = array();
        
        $image['alt'] = get_post_meta($acfImage, '_wp_attachment_image_alt', true);
        $image['src'] = wp_get_attachment_image_url($acfImage, 'full');
        $image['srcset'] = wp_get_attachment_image_srcset($acfImage, 'full');
        
        return $image;
    }
    
    return null;
}

/**
 * Process images in an ACF repeater field
 * 
 * @param string $repeater_field_name Name of the repeater field
 * @param array $image_fields Array of image field names to process
 * @return array Processed repeater data
 */
function getAcfRepeaterImages($repeater_field_name, $image_fields = array()) {
    $repeater_values = get_sub_field($repeater_field_name);
    $result = array();
    
    if ($repeater_values) {
        foreach ($repeater_values as $item) {
            $object = array();
            
            foreach ($item as $key => $value) {
                $object[$key] = $value;
                
                if (in_array($key, $image_fields) && isset($item[$key])) {
                    $object[$key] = setImage($item[$key]);
                }
            }
            
            $result[] = $object;
        }
    }
    
    return $result;
}