import PropTypes from 'prop-types';

import { isStrHasLen } from 'utilities/cond';

const PostContent = ({ content }) => {
  if (!isStrHasLen(content)) return null;

  return (
    <section className='w-full bg-white text-black prose'>
      <div
        className='w-full px-6 !max-w-4xl mx-auto'
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  );
};

PostContent.propTypes = {
  content: PropTypes.string,
};

export default PostContent;
