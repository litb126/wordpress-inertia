import PropTypes from 'prop-types';
import { tv } from 'tailwind-variants';

const Pagination = ({ paginationData }) => {
  const { prev_page, next_page, current_page, total_pages } = paginationData;

  if(total_pages === 1) return null;

  const numClasses = tv({
    base: 'text-white transition-all duration-300 font-bold py-2 px-4 rounded-lg',
    variants: {
      active: {
        true: 'bg-blue-800 cursor-not-allowed',
        false: 'bg-blue-500 hover:bg-blue-700'
      }
    }
  });

  const nextPrevClasses = tv({
    base: 'text-white transition-all duration-300 font-bold py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-700'
  });

  return (
    <div className='flex items-center justify-center space-x-2 mt-6'>
      {prev_page !== false &&
        <a
          className={nextPrevClasses()}
          href={`/blog/page/${current_page - 1}`}
        >
          Prev
        </a> 
      }

      {Array.from({ length: total_pages }, (_, index) => index + 1).map((page) => (
        current_page === page ? (
          <span
            key={page}
            className={numClasses({ active: true })}
          >
            {page}
          </span>
        ) : (
          <a
            key={page}
            href={`/blog/page/${page}`}
            className={numClasses({ active: false })}
          >
            {page}
          </a>
        )
      ))}

      {next_page <= total_pages && 
        <a
          className={nextPrevClasses()}
          href={`/blog/page/${current_page + 1}`}
        >
          Next
        </a>
      }
    </div>
  );
};

Pagination.propTypes = {
  paginationData: PropTypes.object,
};


export default Pagination;
