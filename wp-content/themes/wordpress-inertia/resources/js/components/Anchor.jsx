import PropTypes from 'prop-types';
import { tv } from 'tailwind-variants';

import { isObjHasProps } from 'utilities/cond';

const Anchor = ({ callToAction, theme, className = '', isNested = false }) => {
  const classes = tv({
    base: `inline-flex no-underline items-center px-6 py-3 font-medium text-white rounded-lg focus:outline-none focus:ring-2 hover:bg-gray-700 focus:ring-gray-600 transition-all duration-300 ${className}`,
    variants: {
      color: {
        red: 'bg-red-500 hover:bg-red-800',
        green: 'bg-green-500 hover:bg-green-800',
        blue: 'bg-blue-500 hover:bg-blue-800',
        default: 'bg-blue-500 hover:bg-blue-800',
      },
    },
  });

  if (!isObjHasProps(callToAction)) return null;

  if ((callToAction.url === '#') || isNested) {
    return (
      <button
        className={classes({ color: theme })}
        aria-description={callToAction.title}
      >
        {callToAction.title || 'Click here'}
      </button>
    );
  }

  return (
    <a
      className={classes({ color: theme })}
      href={callToAction.url || '#'}
      target={callToAction.target || '_self'}
      rel='nofollow noreferrer noopener'
      aria-description={callToAction.title}
    >
      {callToAction.title || 'Click here'}
    </a>
  );
};

Anchor.propTypes = {
  callToAction: PropTypes.object,
  theme: PropTypes.string,
  className: PropTypes.string,
};

export default Anchor;
