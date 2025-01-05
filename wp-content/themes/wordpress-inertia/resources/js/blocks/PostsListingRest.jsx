import PropTypes from 'prop-types';

import { hash } from '../../../utilities/client';
import { isArrHasLen } from 'utilities/cond';

import PostItem from '../components/PostItem';

const PostsListingRest = ({ posts }) => {
  return (
    <div className='max-w-7xl mx-auto px-6 w-full relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
      {isArrHasLen(posts) ? (
        posts.map((post) => (
          <PostItem
            key={`post_${hash(post?.title?.rendered)}`}
            title={post?.title?.rendered}
            excerpt={post?.excerpt?.rendered}
            permalink={post?.slug}
            image={post?.featuredImage}
            isNested={true}
          />
        ))
      ) : (
        <div className='w-full text-center text-2xl text-white'>
          <p>No posts to display.</p>
        </div>
      )}
    </div>
  );
};

PostsListingRest.propTypes = {
  posts: PropTypes.array,
};

export default PostsListingRest;
