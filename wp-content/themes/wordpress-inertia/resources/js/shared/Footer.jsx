import { usePage } from '@inertiajs/react';
import PropTypes from 'prop-types';
import { tv } from 'tailwind-variants';

import { hash } from '../../../utilities/client';
import { isArrHasLen, isObjHasProps } from 'utilities/cond';

import Icon from '../components/Icon';
import Image from '../components/Image';

const Footer = ({ className = '' }) => {
  const { global } = usePage().props;

  const navItemClasses = tv({
    base: 'text-sm hover:text-blue-400 transition-all duration-300',
    variants: {
      active: {
        true: 'text-blue-400',
      },
    },
  });

  return (
    <footer
      className={`mt-14 md:mt-20 py-10 lg:py-20 bg-slate-900 border-t border-gray-200 ${className}`}
    >
      <div className='px-6 mx-auto max-w-screen-2xl'>
        <div className='md:flex md:justify-between'>
          <div className='mb-6 md:mb-0'>
            <a
              href='/'
              className='flex items-center transition-all duration-300 hover:opacity-70'
            >
              {isObjHasProps(global.siteLogo) ? (
                <Image
                  {...global.siteLogo}
                  removeDefaultClasses={true}
                  width='143'
                  height='38'
                />
              ) : (
                <p className='text-white transition-all duration-300 hover:text-blue-500'>
                  Flowbite
                </p>
              )}
            </a>
          </div>
          <div className='grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3'>
            {isArrHasLen(global.resources) && (
              <div>
                <h2 className='mb-6 text-sm font-semibold uppercase text-white'>
                  Resources
                </h2>
                <ul className='text-white'>
                  {Object.values(global.resources).map((item, index) => (
                    <li className='mb-4' key={`resources_${hash(item.url)}_${index}`}>
                      <a
                        href={item.url}
                        className={navItemClasses({ active: item.active })}
                        dangerouslySetInnerHTML={{ __html: item.label }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {isArrHasLen(global.follows) && (
              <div>
                <h2 className='mb-6 text-sm font-semibold uppercase text-white'>
                  Follow Us
                </h2>
                <ul className='text-white'>
                  {Object.values(global.follows).map((item, index) => (
                    <li className='mb-4' key={`follows_${hash(item.url)}_${index}`}>
                      <a
                        href={item.url}
                        className={navItemClasses({ active: item.active })}
                        dangerouslySetInnerHTML={{ __html: item.label }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {isArrHasLen(global.legals) && (
              <div>
                <h2 className='mb-6 text-sm font-semibold uppercase text-white'>
                  Legal
                </h2>
                <ul className='text-white'>
                  {Object.values(global.legals).map((item, index) => (
                    <li className='mb-4' key={`legals_${hash(item.url)}_${index}`}>
                      <a
                        href={item.url}
                        className={navItemClasses({ active: item.active })}
                        dangerouslySetInnerHTML={{ __html: item.label }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <hr className='my-6 sm:mx-auto border-gray-200 lg:my-8' />
        <div className='sm:flex sm:items-center sm:justify-between'>
          <span className='text-xs text-white sm:text-center'>
            © {new Date().getFullYear()}{' '}
            <a href='https://flowbite.com' className='hover:underline'>
              Flowbite™
            </a>
            . All Rights Reserved.
          </span>
          {isArrHasLen(global.socials) && (
            <div className='flex mt-4 space-x-6 sm:justify-center sm:mt-0'>
              {global.socials.map((item, index) => (
                <a
                  key={`socials_${hash(item.icon)}_${index}`}
                  href={item.url}
                  rel='nofollow noopener noreferrer'
                  target='_blank'
                  className='text-white hover:text-blue-400'
                >
                  <Icon
                    icon={item.icon}
                    className='w-5 h-5 transition-all duration-300'
                  />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
