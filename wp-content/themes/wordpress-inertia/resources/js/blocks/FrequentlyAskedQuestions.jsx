import { Disclosure, Transition } from '@headlessui/react';
import PropTypes from 'prop-types';
import { tv } from 'tailwind-variants';

import { hash } from '../../../utilities/client';
import { isArrHasLen, isStrHasLen } from 'utilities/cond';

const FrequentlyAskedQuestions = ({ content, faqs }) => {
  if (!isArrHasLen(faqs)) return null;

  const buttonClasses = tv({
    base: 'w-full text-left flex flex-row justify-between text-xl font-medium text-white hover:lg:text-blue-500',
    variants: {
      open: {
        true: 'text-blue-500',
      },
    },
  });

  const chevronClasses = tv({
    base: 'origin-center transition-scale duration-300',
    variants: {
      open: {
        true: 'scale-y-[-1]',
      },
    },
  });

  return (
    <section className='section max-w-5xl mx-auto'>
      {isStrHasLen(content) && (
        <div className='px-6 w-full text-left lg:text-center mb-3 lg:mb-8 flex items-center lg:justify-center'>
          <div
            className='prose w-full text-white prose-headings:text-white'
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      )}
      <ul className='w-full px-6'>
        {faqs.map((faq) => (
          <Disclosure
            as='li'
            className='group py-6 w-full border-b border-solid border-slate-500'
            key={`dropdown_${hash(faq.question)}`}
          >
            {({ open }) => (
              <>
                <Disclosure.Button className={buttonClasses({ open: open })}>
                  <div className='flex flex-row items-start transition-all duration-300'>
                    {faq.question}
                  </div>
                  <span className='ml-6 mt-2'>
                    <svg
                      className={chevronClasses({ open: open })}
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
                </Disclosure.Button>
                <Transition
                  enter='transition duration-150 ease-out'
                  enterFrom='transform -translate-y-2 opacity-0'
                  enterTo='transform translate-y-0 opacity-100'
                  leave='transition duration-150 ease-out'
                  leaveFrom='transform translate-y-0 opacity-100'
                  leaveTo='transform -translate-y-2 opacity-0'
                >
                  <Disclosure.Panel className='mt-6 mb-4'>
                    <div
                      className='prose text-gray-400 max-w-none'
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        ))}
      </ul>
    </section>
  );
};

FrequentlyAskedQuestions.propTypes = {
  content: PropTypes.string,
  faqs: PropTypes.array,
};

export default FrequentlyAskedQuestions;
