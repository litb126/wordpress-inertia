import PropTypes from 'prop-types';
import { tv } from 'tailwind-variants';

const PaginationRest = ({ paginationData, handleNextPage, handlePrevPage, setPage, loadingPaginatedPosts }) => {
  if(paginationData.totalPages < 2) return null;

  const numClasses = tv({
    base: 'text-white transition-all duration-300 font-bold py-2 px-4 rounded-lg',
    variants: {
      active: {
        true: 'bg-blue-800',
        false: 'bg-blue-500 hover:bg-blue-700'
      }
    }
  });

  const nextPrevClasses = tv({
    base: 'w-20 text-center text-white transition-all duration-300 font-bold py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-700'
  });

  return (
    <div className='flex items-center justify-center space-x-2 mt-6'>
      {paginationData.prevPage > 0 &&
        <button
          className={nextPrevClasses()}
          onClick={() => {
            loadingPaginatedPosts();
            handlePrevPage();
          }}
        >
          Prev
        </button>
      }
      
      {Array.from({ length: paginationData.totalPages }, (_, index) => index + 1).map((page) => (
        <button
          key={`page_${page}`}
          className={numClasses({ active: page === paginationData.currentPage })}
          onClick={() => {
            loadingPaginatedPosts();
            setPage(page);
          }}
        >
          {page}
        </button>
      ))}

      {paginationData.currentPage < paginationData.totalPages &&
        <button
          className={nextPrevClasses()}
          onClick={() => {
            loadingPaginatedPosts();
            handleNextPage();
          }}
        >
          Next
        </button>
      }
    </div>
  );
};

PaginationRest.propTypes = {
  paginationData: PropTypes.object,
  handleNextPage: PropTypes.func,
  handlePrevPage: PropTypes.func,
  setPage: PropTypes.func,
  loadingPaginatedPosts: PropTypes.func
};


export default PaginationRest;
