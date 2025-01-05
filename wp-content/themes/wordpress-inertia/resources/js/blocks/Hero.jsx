import PropTypes from 'prop-types';
import { tv } from 'tailwind-variants';

import {
  isArrHasLen,
  isBoolFalsey,
  isBoolTruthy,
  isObjHasProps,
  isStrHasLen,
} from 'utilities/cond';

import Image from '../components/Image';
import CallToActions from './CallToActions';

const Hero = ({
  title,
  callToActions,
  subtitle,
  backgroundChoice,
  backgroundColour,
  backgroundImage,
  displayOverlay,
}) => {
  const HeroClasses = tv({
    base: 'text-white min-h-[640px] lg:min-h-[960px] flex flex-col items-center justify-center text-center relative overflow-hidden lg:pt-28',
    variants: {
      color: {
        red: 'bg-red-500',
        blue: 'bg-blue-500',
        green: 'bg-green-500',
        default: 'bg-transparent bg-center bg-cover bg-no-repeat',
      },
    },
  });

  return (
    <section
      className={HeroClasses({
        color: backgroundChoice ? `${backgroundColour}` : 'default',
      })}
    >
      {isBoolFalsey(backgroundChoice) && isObjHasProps(backgroundImage) && (
        <Image
          {...backgroundImage}
          width='1853'
          height='1035'
          loading='eager'
        />
      )}
      {isBoolTruthy(displayOverlay) && <div className='overlay' />}
      <div className='w-full px-6 flex flex-col gap-10'>
        {isStrHasLen(title) && (
          <h1 className='text-5xl lg:text-8xl font-extrabold'>{title}</h1>
        )}
        {isStrHasLen(subtitle) && (
          <div className='text-xl md:text-2xl lg:text-4xl'>
            <p>{subtitle}</p>
          </div>
        )}
        {isArrHasLen(callToActions) && <CallToActions callToActions={callToActions} className='justify-center' />}
      </div>
    </section>
  );
};

Hero.propTypes = {
  title: PropTypes.string,
  callToActions: PropTypes.object,
  subtitle: PropTypes.string,
  backgroundChoice: PropTypes.bool,
  backgroundColour: PropTypes.string,
  backgroundImage: PropTypes.object,
  displayOverlay: PropTypes.bool,
};

export default Hero;
