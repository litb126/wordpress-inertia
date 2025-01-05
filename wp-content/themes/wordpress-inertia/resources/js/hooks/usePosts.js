import { useEffect,useState } from 'react';

import { fetchMedia,fetchPosts } from '../services/apiService';

export const usePosts = (postsPerPage, currentPage, selectedCategory) => {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // eslint-disable-next-line sonarjs/cognitive-complexity
  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        const params = {
          per_page: postsPerPage,
          page: currentPage,
          ...(selectedCategory && { categories: selectedCategory }),
        };

        const postsResponse = await fetchPosts(params);
        const postsData = await postsResponse.json();

        setTotalPages(Number(postsResponse.headers.get('X-WP-TotalPages')));

        const postsWithImageData = [];
        for (const post of postsData) {
          if (post.featured_media) {
            try {
              const mediaResponse = await fetchMedia(post.featured_media);
              const mediaData = await mediaResponse.json();

              const { alt_text, source_url, media_details } = mediaData;
              const sizes = media_details.sizes || {};

              const srcset = Object.values(sizes)
                .map((size) => `${size.source_url} ${size.width}w`)
                .join(', ');

              postsWithImageData.push({
                ...post,
                featuredImage: { 
                  alt: alt_text || '', 
                  src: source_url || '',
                  sizes,
                  srcset,
                },
              });
            } catch (mediaError) {
              console.error('Error fetching media for post:', post.id, mediaError);
              postsWithImageData.push(post);
            }
          } else {
            postsWithImageData.push(post);
          }
        }

        setPosts(postsWithImageData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [currentPage, postsPerPage, selectedCategory]);

  return { posts, totalPages, loading, error };
};
