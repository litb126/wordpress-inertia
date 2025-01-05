import PropTypes from 'prop-types';

import { hash } from '../../../utilities/client';
import { isArrEmpty, isArrHasLen } from 'utilities/cond';

import PostItem from '../components/PostItem';

const PrevNextPosts = ({ nextPost, previousPost }) => {
  if (isArrEmpty(previousPost) && isArrEmpty(nextPost)) return null;

  return (
    <section className='max-w-5xl mx-auto px-6 w-full'>
      <div className='hidden md:grid grid-cols-1 md:grid-cols-2 gap-8'>
        {isArrHasLen(nextPost) && (
          <p className='text-white text-2xl mb-6 font-medium'>Next post</p>
        )}
        {isArrHasLen(previousPost) && (
          <p className='text-white text-2xl mb-6 font-medium'>
            Previous post
          </p>
        )}
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 md:gap-8'>
        {isArrHasLen(nextPost) && (
          <>
            <p className='text-white text-2xl mb-6 font-medium md:hidden'>
              Next post
            </p>
            {nextPost.map((post) => (
              <PostItem
                {...post}
                key={`post_${hash(post.title)}`}
                className='!max-w-none !mx-0 !mb-12 md:!mb-0'
                isNested={true}
              />
            ))}
          </>
        )}
        {isArrHasLen(previousPost) && (
          <>
            <p className='text-white text-2xl mb-6 font-medium md:hidden'>
              Previous post
            </p>
            {previousPost.map((post) => (
              <PostItem
                {...post}
                key={`post_${hash(post.title)}`}
                className='!max-w-none !mx-0 !mb-12 md:!mb-0'
                isNested={true}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

PrevNextPosts.propTypes = {
  nextPost: PropTypes.object,
  previousPost: PropTypes.object,
};

export default PrevNextPosts;
