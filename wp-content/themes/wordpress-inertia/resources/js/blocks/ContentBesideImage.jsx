import PropTypes from 'prop-types';
import { tv } from 'tailwind-variants';

import { isObjHasProps, isStrHasLen } from 'utilities/cond';

import Image from '../components/Image';
import CallToActions from './CallToActions';

const ContentBesideImage = ({
  content,
  callToActions,
  imagePosition,
  image,
}) => {
  const Container = tv({
    base: 'section prose-white text-white max-w-7xl mx-auto flex flex-col md:items-center relative gap-y-8 lg:gap-y-0 lg:gap-16',
    variants: {
      imagePosition: {
        left: 'md:flex-row',
        right: 'md:flex-row-reverse',
      },
    },
  });

  if (!isStrHasLen(content)) return null;

  return (
    <section
      className={Container({
        imagePosition: isStrHasLen(imagePosition) ? imagePosition : 'left',
      })}
    >
      {isObjHasProps(image) && (
        <div className='w-full md:max-w-[50%] px-6'>
          <div className='w-full aspect-photo relative overflow-hidden rounded-md border border-gray-200'>
            <Image {...image} width='558' height='371' />
          </div>
        </div>
      )}
      <div className='prose md-max:min-w-full w-full md:max-w-[50%] px-6'>
        <div className='w-full' dangerouslySetInnerHTML={{ __html: content }} />
        <CallToActions callToActions={callToActions} />
      </div>
    </section>
  );
};

ContentBesideImage.propTypes = {
  content: PropTypes.string,
  callToActions: PropTypes.object,
  imagePosition: PropTypes.string,
  image: PropTypes.array,
};

export default ContentBesideImage;
