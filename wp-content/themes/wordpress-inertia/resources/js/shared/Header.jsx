import { useMediaQuery } from '@react-hook/media-query';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { tv } from 'tailwind-variants';

import { isObjHasProps } from 'utilities/cond';

import Anchor from '../components/Anchor';
import Image from '../components/Image';

const Header = () => {
  const { global } = usePage().props;
  const [open, setOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState({});

  const isMobile = useMediaQuery('only screen and (max-width: 1023px)');

  const hasChildren = (item) => {
    return item?.children && Object.keys(item.children).length > 0;
  };

  const hasChildrenOnClickHandler = (item, event) => {
    if (isMobile && hasChildren(item)) {
      setOpenSubMenus((prev) => ({
        ...prev,
        [item.url]: !prev[item.url],
      }));
    }
  };

  const headerClasses = tv({
    base: 'bg-slate-900 mx-auto max-w-screen-2xl fixed transition-all duration-300 w-full lg:w-[calc(100%-3rem)] mx-auto z-20 top-0 lg:top-6 inset-x-0 lg:rounded-xl transform lg:border lg:border-gray-200 lg:border-solid',
  });

  const navClasses = tv({
    base: 'h-16 lg:h-20 transition-all duration-300',
  });

  const menuClasses = tv({
    base: 'bg-slate-900 absolute left-0 top-full lg:top-auto w-full lg:relative h-auto lg:h-full lg:justify-between lg:items-center w-full lg:flex lg:w-auto lg:order-1',
    variants: {
      open: {
        true: 'block',
        false: 'hidden',
      },
    },
  });

  const menuCloseIcon = tv({
    base: 'h-6 w-6',
    variants: {
      open: {
        true: 'block',
        false: 'hidden',
      },
    },
  });

  const menuBurgerIcon = tv({
    base: 'h-6 w-6',
    variants: {
      open: {
        true: 'hidden',
        false: 'block',
      },
    },
  });

  const navItemClasses = tv({
    base: 'transition-all duration-300 flex items-center p-4 text-white lg:hover:text-blue-500 border-b lg:border-0 lg:p-0 hover:bg-blue-500 lg:hover:bg-transparent border-gray-700',
    variants: {
      active: {
        true: 'duration-0 text-blue-500 hover:text-white',
      },
      subitem: {
        true: 'pl-10',
      },
    },
  });

  const childListClasses = tv({
    base: 'transition-all duration-300 lg:border-x lg:border-b lg:border-t-0 border-gray-200 bg-slate-900 w-full lg:w-max overflow-hidden lg:absolute lg:top-full lg:left-0 lg:max-h-0 lg:rounded-br-lg lg:rounded-bl-lg',
    variants: {
      open: {
        true: '',
        false: 'lg:group-hover:max-h-[500px]',
      },
    },
  });

  return (
    <header className={headerClasses()}>
      <nav className={navClasses()}>
        <div className='px-6 flex flex-wrap justify-between items-center h-full'>
          <a
            href='/'
            className='flex items-center transition-all duration-300 hover:opacity-70'
          >
            {isObjHasProps(global?.siteLogo) ? (
              <Image
                {...global?.siteLogo}
                removeDefaultClasses={true}
                width='143'
                height='38'
                loading='eager'
              />
            ) : (
              <p className='text-white transition-all duration-300 hover:text-blue-500'>
                Flowbite
              </p>
            )}
          </a>
          <div className='flex items-center gap-3 lg:order-2'>
            <Anchor
              callToAction={{
                url: '/contact/',
                target: '_self',
                title: 'Get in touch',
              }}
              theme='blue'
              className='max-sm:hidden'
            />
            <button
              onClick={() => setOpen(!open)}
              data-collapse-toggle='mobile-menu'
              type='button'
              className='transition-colors duration-200 inline-flex items-center p-3 ml-1 text-sm text-white rounded-lg lg:hidden focus:outline-none focus:ring-2 hover:bg-blue-500 focus:ring-blue-800'
              aria-controls='mobile-menu'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className={menuBurgerIcon({ open })}
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                  clipRule='evenodd'
                ></path>
              </svg>
              <svg
                className={menuCloseIcon({ open })}
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </button>
          </div>
          {global.header && (
            <div className={menuClasses({ open })} id='mobile-menu'>
              <ul className='h-auto lg:h-full flex flex-col font-medium lg:flex-row lg:space-x-8 lg:mt-0'>
                {Object.entries(global.header).map(([key, item]) => (
                  <li
                    key={key}
                    className='relative group flex flex-col lg:justify-center lg:items-center'
                  >
                    <a
                      href={item?.url}
                      className={`${navItemClasses({
                        active: item?.active,
                      })} group`}
                      onClick={(e) => hasChildrenOnClickHandler(item, e)}
                      onMouseEnter={() =>
                        !isMobile && hasChildren(item)
                      }
                      onMouseLeave={() => !isMobile}
                    >
                      <span>{item?.label}</span>
                      {hasChildren(item) && (
                        <span className='ml-2'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            height='16'
                            width='16'
                            viewBox='0 0 512 512'
                          >
                            <path
                              fill='currentColor'
                              d='M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z'
                            />
                          </svg>
                        </span>
                      )}
                    </a>
                    {hasChildren(item) && (
                      <ul
                        className={childListClasses({
                          open: openSubMenus[item.url],
                        })}
                        onMouseEnter={() => !isMobile}
                      >
                        {Object.entries(item.children).map(
                          ([childKey, child]) => (
                            <li key={childKey} className='lg:p-3'>
                              <a
                                href={child?.url}
                                className={navItemClasses({
                                  active: child?.active,
                                  subitem: true,
                                })}
                              >
                                <span>{child?.label}</span>
                              </a>
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
