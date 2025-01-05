import PropTypes from 'prop-types';
import { tv } from 'tailwind-variants';

import {
  isBoolFalsey,
  isBoolTruthy,
  isStrHasLen,
} from 'utilities/cond';

import Image from '../components/Image';
import CallToActions from './CallToActions';

const Banner = ({
  title,
  callToActions,
  subtitle,
  backgroundChoice,
  backgroundColour,
  backgroundImage,
  displayOverlay,
  className = '',
}) => {
  const BannerClasses = tv({
    base: `text-white py-20 lg:pt-44 h-auto min-h-[520px] flex flex-col items-center justify-center text-left relative overflow-hidden ${className}`,
    variants: {
      color: {
        red: 'bg-red-500',
        blue: 'bg-blue-500',
        green: 'bg-green-500',
        default: 'bg-transparent bg-center bg-cover bg-no-repeat',
      },
    },
  });

  if (!isStrHasLen(title)) {
    return null;
  }

  return (
    <section
      className={BannerClasses({
        color: backgroundChoice ? `${backgroundColour}` : 'default'
      })}
    >
      {isBoolFalsey(backgroundChoice) && backgroundImage?.src && (
        <Image
          {...backgroundImage}
          width='1853'
          height='1035'
          loading='eager'
        />
      )}
      {isBoolTruthy(displayOverlay) && <div className='overlay' />}
      <div className='mx-auto max-w-7xl px-6 w-full'>
        {isStrHasLen(title) && (
          <h1
            className='text-5xl lg:text-8xl font-extrabold'
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
        {isStrHasLen(subtitle) && (
          <div className='mt-8 text-xl md:text-2xl lg:text-4xl'>
            <p dangerouslySetInnerHTML={{ __html: subtitle }} />
          </div>
        )}
        <CallToActions
          callToActions={callToActions}
        />
      </div>
    </section>
  );
};

Banner.propTypes = {
  title: PropTypes.string,
  callToActions: PropTypes.object,
  subtitle: PropTypes.string,
  backgroundChoice: PropTypes.bool,
  backgroundColour: PropTypes.string,
  backgroundImage: PropTypes.object,
  displayOverlay: PropTypes.bool,
  className: PropTypes.string,
};

export default Banner;
