import PropTypes from 'prop-types';
import { tv } from 'tailwind-variants';

import { isStrHasLen } from 'utilities/cond';

const Heading = ({ content, className = '' }) => {
  const HeadingClasses = tv({
    base: `text-white max-w-7xl w-full mx-auto ${className}`,
  });

  if (!isStrHasLen(content)) return null;

  return (
    <section className={HeadingClasses()}>
      <div className='max-w-4xl px-6'>
        <div
          className='prose prose-intro prose-white'
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
};

Heading.propTypes = {
  content: PropTypes.string,
  className: PropTypes.string,
};

export default Heading;
