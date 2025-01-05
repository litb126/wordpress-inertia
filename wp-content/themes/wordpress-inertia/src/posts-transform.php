<?php 

function getAcfPostsInfo($parentArray) {
  foreach ($parentArray as &$childArray) {
    if (isset($childArray['post'])) {
      $post_id = $childArray['post'];

      if (is_array($post_id) && isset($post_id['ID'])) {
        $post_id = $post_id['ID'];
      }

      $post_info = new stdClass();
      $post = get_post($post_id);

      if ($post) {
        $post_info->title = get_the_title($post);
        $post_info->excerpt = get_the_excerpt($post);
        $post_info->permalink = get_permalink($post);
        $post_info->image = setImage(get_post_thumbnail_id($post));

        $childArray['title'] = $post_info->title;
        $childArray['excerpt'] = $post_info->excerpt;
        $childArray['permalink'] = $post_info->permalink;
        $childArray['image'] = $post_info->image;
      }
    }
  }

  return $parentArray;
}

function getPostsInfo($post_ids) {
  if (!is_array($post_ids)) {
    $post_ids = array($post_ids);
  }

  $posts_info = array();

  foreach ($post_ids as $post_id) {
    $post_info = new stdClass();
    $post = get_post($post_id);

    if ($post) {
      $post_info->title = get_the_title($post);
      $post_info->excerpt = get_the_excerpt($post);
      $post_info->permalink = get_permalink($post);
      $post_info->image = setImage(get_post_thumbnail_id($post));
      $post_info->content = get_the_content($post);
      $posts_info[] = $post_info;
    }
  }

  return $posts_info;
}