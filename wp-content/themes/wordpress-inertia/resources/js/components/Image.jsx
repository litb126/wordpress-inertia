import PropTypes from 'prop-types';
import { tv } from 'tailwind-variants';

import { isBoolTruthy } from 'utilities/cond';

const Image = ({
  alt = '',
  className = '',
  removeDefaultClasses = false,
  src = '',
  srcset = '',
  width = '',
  height = '',
  loading = 'lazy',
}) => {
  const imageClasses = tv({
    base: isBoolTruthy(removeDefaultClasses)
      ? `${className}`
      : `absolute inset-0 m-auto min-w-full min-h-full object-cover object-center max-w-full -z-20 ${className}`,
  });

  return (
    <img
      alt={alt}
      className={imageClasses()}
      src={src}
      srcSet={srcset}
      width={width}
      height={height}
      loading={loading}
    />
  );
};

Image.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  removeDefaultClasses: PropTypes.bool,
  src: PropTypes.string,
  srcset: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  loading: PropTypes.string,
};

export default Image;
