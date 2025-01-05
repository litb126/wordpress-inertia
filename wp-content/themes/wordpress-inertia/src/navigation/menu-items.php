<?php

/**
 * Get a WordPress menu with a simplified structure
 * 
 * @param string $menu_name The name of the menu to retrieve
 * @return array The processed menu items
 */
function get_menu_items(string $menu_name): array {
    // Get menu locations
    $locations = get_nav_menu_locations();
    
    // Get menu ID from location
    if (array_key_exists($menu_name, $locations)) {
        $menu_id = $locations[$menu_name];
        
        // WPML compatibility
        if (has_filter('wpml_object_id')) {
            $menu_id = apply_filters('wpml_object_id', $menu_id, 'nav_menu');
        }
    } else {
        // Try to get menu by name if location not found
        $menu = wp_get_nav_menu_object($menu_name);
        if (!$menu) {
            return [];
        }
        $menu_id = $menu->term_id;
    }

    // Get menu items
    $menu_items = wp_get_nav_menu_items($menu_id);
    if (empty($menu_items)) {
        return [];
    }

    // Process menu items
    _wp_menu_item_classes_by_context($menu_items);
    
    // Build menu tree
    $menu_tree = [];
    $menu_items_by_id = [];

    // First pass: collect all items and index them by ID
    foreach ($menu_items as $item) {
        $processed_item = [
            'id' => $item->ID,
            'dbId' => $item->db_id,
            'parent' => $item->menu_item_parent,
            'label' => $item->title,
            'url' => $item->url,
            'target' => $item->target,
            'classes' => array_filter($item->classes, function($class) {
                return !in_array($class, [
                    'current-menu',
                    'current_page',
                    'sub-menu',
                    'menu-item',
                    'menu-item-type-post_type',
                    'menu-item-object-page',
                    'menu-item-type-custom',
                    'menu-item-object-custom',
                    'menu_item',
                    'page-item',
                    'page_item',
                ]);
            }),
            'active' => in_array('current-menu-item', $item->classes),
            'activeAncestor' => in_array('current-menu-ancestor', $item->classes),
            'activeParent' => in_array('current-menu-parent', $item->classes),
            'children' => [],
        ];

        $menu_items_by_id[$item->ID] = $processed_item;
    }

    // Second pass: build the hierarchy
    foreach ($menu_items_by_id as $id => $item) {
        if (empty($item['parent'])) {
            // This is a top-level item
            $menu_tree[] = &$menu_items_by_id[$id];
        } else {
            // This item has a parent
            if (isset($menu_items_by_id[$item['parent']])) {
                $menu_items_by_id[$item['parent']]['children'][] = &$menu_items_by_id[$id];
            }
        }
    }

    return $menu_tree;
}
