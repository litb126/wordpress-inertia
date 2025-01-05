import { usePage } from '@inertiajs/react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { isBoolTruthy } from 'utilities/cond';

import Banner from '../../blocks/Banner';
import CategorySelectRest from '../../blocks/CategorySelectRest';
import Layout from '../../shared/Layout';
import Loading from '../../blocks/Loading';
import PostsListingRest from '../../blocks/PostsListingRest';
import PaginationRest from '../../components/PaginationRest';

const Index = ({ banner = {} }) => {
  const { global } = usePage().props;

  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(global.postsPerPage);
  const [totalPages, setTotalPages] = useState(0);
  const [totalMovies, setTotalMovies] = useState(0);
  const [loadingAll, setLoadingAll] = useState(true);
  const [loadingCatSelect, setLoadingCatSelect] = useState(false);
  const [loadingPaginatedPosts, setLoadingPaginatedPosts] = useState(false);

  const paginationData = {
    prevPage: currentPage - 1,
    nextPage: currentPage + 1,
    currentPage,
    totalPages,
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const catsResponse = await fetch(
          'https://wordpress-inertia-starter.test/wp-json/wp/v2/genres'
        );
        const categoriesData = await catsResponse.json();

        setCategories(categoriesData);
        setLoadingCatSelect(false);
        setLoadingPaginatedPosts(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoadingCatSelect(false);
        setLoadingPaginatedPosts(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchTotalMovies = async () => {
      try {
        const response = await fetch(
          'https://wordpress-inertia-starter.test/wp-json/wp/v2/movies?per_page=1'
        );
        const total = response.headers.get('X-WP-Total');
        setTotalMovies(Number(total));
      } catch (error) {
        console.error('Error fetching total movies:', error);
      }
    };

    fetchTotalMovies();
  }, []);

  const fetchPosts = async () => {
    try {
      let postsResponse;

      if (selectedCategory) {
        postsResponse = await fetch(
          `https://wordpress-inertia-starter.test/wp-json/wp/v2/movies?per_page=${postsPerPage}&page=${currentPage}&genres=${selectedCategory}`
        );
      } else {
        postsResponse = await fetch(
          `https://wordpress-inertia-starter.test/wp-json/wp/v2/movies?per_page=${postsPerPage}&page=${currentPage}`
        );
      }
      const postsData = await postsResponse.json();
      const postsWithImageData = [];

      const totalPages = postsResponse.headers.get('X-WP-totalPages');

      setTotalPages(Number(totalPages));

      for (const post of postsData) {
        if (post.featured_media) {
          const mediaResponse = await fetch(
            `https://wordpress-inertia-starter.test/wp-json/wp/v2/media/${post.featured_media}`
          );
          const mediaData = await mediaResponse.json();

          const alt = mediaData.alt_text || '';
          const src = mediaData.source_url || '';
          const sizes = mediaData.media_details.sizes || {};

          const srcset = Object.values(sizes)
            .map((size) => `${size.source_url} ${size.width}w`)
            .join(', ');

          postsWithImageData.push({
            ...post,
            featuredImage: { alt, src, sizes, srcset },
          });
        } else {
          postsWithImageData.push(post);
        }
      }

      setLoadingAll(false);
      setLoadingCatSelect(false);
      setLoadingPaginatedPosts(false);

      setPosts(postsWithImageData);
    } catch (error) {
      console.error('Error fetching latest posts:', error);

      setLoadingAll(false);
      setLoadingCatSelect(false);
      setLoadingPaginatedPosts(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage, postsPerPage, selectedCategory]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSetPage = (page) => {
    setCurrentPage(page);
  };

  const handleLoadingCatSelect = () => {
    setLoadingCatSelect(true);
  };

  const handleLoadingPaginatedPosts = () => {
    setLoadingPaginatedPosts(true);
  };

  return (
    <Layout>
      <Banner {...banner} topOfPage={true} />

      {isBoolTruthy(loadingAll) ? (
        <Loading />
      ) : (
        <div className='relative w-full flex flex-col gap-10'>
          {(isBoolTruthy(loadingCatSelect) ||
            isBoolTruthy(loadingPaginatedPosts)) && (
            <div className='z-20 absolute inset-0 m-auto flex justify-center items-center w-full h-full bg-slate-900 bg-opacity-75'>
              <Loading />
            </div>
          )}

          <CategorySelectRest
            categories={categories}
            currentCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            loadingCategories={handleLoadingCatSelect}
            label='genre'
            totalPosts={totalMovies}
          />

          <PostsListingRest posts={posts} />

          <PaginationRest
            paginationData={paginationData}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            setPage={handleSetPage}
            loadingPaginatedPosts={handleLoadingPaginatedPosts}
          />
        </div>
      )}
    </Layout>
  );
};

Index.propTypes = {
  banner: PropTypes.object,
};

export default Index;
