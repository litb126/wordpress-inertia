import PropTypes from 'prop-types';

import { isArrHasLen, isStrHasLen } from 'utilities/cond';

import CallToActions from './CallToActions';
import PostsListing from './PostsListing';

const FeaturedPosts = ({ content, callToActions, posts }) => {
  if (!isArrHasLen(posts)) return null;

  return (
    <section className='text-white max-w-7xl mx-auto flex flex-col gap-10'>
      
      <div className='max-w-4xl px-6'>
        {isStrHasLen(content) && (
          <div
            className='prose prose-intro prose-white'
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>
      {isArrHasLen(callToActions) && (
        <div className='max-w-4xl px-6'>
          <CallToActions callToActions={callToActions} />
        </div>
      )}
      <PostsListing posts={posts} />
    </section>
  );
};

FeaturedPosts.propTypes = {
  content: PropTypes.string,
  callToActions: PropTypes.array,
  posts: PropTypes.array,
};

export default FeaturedPosts;
