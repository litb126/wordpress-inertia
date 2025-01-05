import PropTypes from 'prop-types';
import { hash } from '../../../utilities/client';

import Banner from '../blocks/Banner';
import ContentBesideImage from '../blocks/ContentBesideImage';
import FeaturedPosts from '../blocks/FeaturedPosts';
import FrequentlyAskedQuestions from '../blocks/FrequentlyAskedQuestions';
import Heading from '../blocks/Heading';
import Hero from '../blocks/Hero';
import Layout from '../shared/Layout';
import TeamCards from '../blocks/TeamCards';

const COMPONENT_MAP = {
  banner: Banner,
  content_beside_image: ContentBesideImage,
  featured_posts: FeaturedPosts,
  frequently_asked_questions: FrequentlyAskedQuestions,
  hero: Hero,
  heading: Heading,
  team_cards: TeamCards,
};

const Flexible = ({ content = {} }) => {
  return (
    <Layout>
      {content.map((layout, index) => {
        const { layout_name, data } = layout;
        const Component = COMPONENT_MAP[layout_name];
        
        return Component ? (
          <Component 
            key={`${layout_name}_${hash(index)}`} 
            {...data} 
          />
        ) : null;
      })}
    </Layout>
  );
};

Flexible.propTypes = {
  content: PropTypes.array,
};

export default Flexible;
