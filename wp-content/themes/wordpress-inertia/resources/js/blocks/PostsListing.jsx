import PropTypes from 'prop-types';

import { hash } from '../../../utilities/client';
import { isArrHasLen } from 'utilities/cond';

import PostItem from '../components/PostItem';

const PostsListing = ({ posts }) => {
  if (!isArrHasLen(posts)) return null;

  return (
    <div className='max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grod-cols-2 lg:grid-cols-4 gap-8'>
      {posts.map((post) => (
        <PostItem key={`post_${hash(post.title)}`} {...post} />
      ))}
    </div>
  );
};

PostsListing.propTypes = {
  posts: PropTypes.array,
};

export default PostsListing;
