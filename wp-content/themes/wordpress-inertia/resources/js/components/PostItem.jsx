import PropTypes from 'prop-types';

import { isObjHasProps, isStrHasLen } from 'utilities/cond';

import Anchor from '../components/Anchor';
import Image from '../components/Image';

const PostItem = ({ title, excerpt, permalink, image, className = '', isNested = false }) => {
  return (
    <a
      href={permalink}
      className={`w-full group rounded-md border border-gray-200 relative overflow-hidden flex flex-col ${className}`}
    >
      {isObjHasProps(image) && (
        <div className='aspect-photo w-full overflow-hidden relative'>
          <Image
            src={image.src}
            alt={image.alt}
            srcset={image.srcset}
            width='286'
            height='190'
            loading='lazy'
            className='transition-all duration-300 group-hover:scale-105'
          />
        </div>
      )}
      <div className='w-full text-white transition-all duration-300 group-hover:text-blue-500 p-6 flex-grow flex flex-col justify-between'>
        <div>
          {isStrHasLen(title) && <h4 className='text-xl font-bold'>{title}</h4>}
          {isStrHasLen(excerpt) && (
            <p
              className='text-sm mt-2 mb-4'
              dangerouslySetInnerHTML={{ __html: excerpt }}
            />
          )}
        </div>
        {isStrHasLen(permalink) && (
          <Anchor
            callToAction={{
              url: permalink,
              target: '_self',
              title: 'Read more',
            }}
            theme='blue'
            className='mt-4 w-fit'
            isNested={isNested}
          />
        )}
      </div>
    </a>
  );
};

PostItem.propTypes = {
  title: PropTypes.string,
  excerpt: PropTypes.string,
  permalink: PropTypes.string,
  image: PropTypes.object,
  className: PropTypes.string,
};

export default PostItem;
