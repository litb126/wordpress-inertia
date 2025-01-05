import PropTypes from 'prop-types';

import Banner from '../../blocks/Banner';
import Layout from '../../shared/Layout';
import PostContent from '../../blocks/PostContent';
import PrevNextPosts from '../../blocks/PrevNextPosts';

const Show = ({
  banner = {},
  content = '',
  previousPost,
  nextPost,
}) => {
  return (
    <Layout>
      <Banner {...banner} topOfPage={true} />

      <PostContent content={content} />

      <PrevNextPosts previousPost={previousPost} nextPost={nextPost} />
    </Layout>
  );
};

Show.propTypes = {
  banner: PropTypes.object,
  content: PropTypes.string,
  previousPost: PropTypes.integer,
  nextPost: PropTypes.integer,
};

export default Show;
