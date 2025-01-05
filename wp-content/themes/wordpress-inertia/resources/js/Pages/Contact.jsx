import PropTypes from 'prop-types';

import { isStrHasLen } from 'utilities/cond';

import Banner from '../blocks/Banner';
import Heading from '../blocks/Heading';
import Layout from '../shared/Layout';

const Contact = ({
  banner = {},
  shortcode = '',
  heading = '',
}) => {
  return (
    <Layout>
      <Banner {...banner} />

      {isStrHasLen(heading) && <Heading content={heading} />}

      {isStrHasLen(shortcode) && (
        <div className='px-6 mx-auto max-w-7xl w-full'>
          <div className='border-white border-solid border text-white rounded-xl p-6 md:p-10 w-full' dangerouslySetInnerHTML={{ __html: shortcode }} />
        </div>
      )}
    </Layout>
  );
};

Contact.propTypes = {
  banner: PropTypes.object,
  shortcode: PropTypes.string,
  heading: PropTypes.string,
};

export default Contact;
