import PropTypes from 'prop-types';
import { tv } from 'tailwind-variants';

const CategorySelectRest = ({ categories, currentCategory, setSelectedCategory, loadingCategories, label = 'category', totalPosts }) => {
  const buttonClasses = tv({
    base: 'text-white transition-all duration-300 font-semibold py-3 px-6 rounded-lg',
    variants: {
      active: {
        true: 'bg-blue-800',
        false: 'bg-blue-500 hover:bg-blue-700'
      }
    }
  });

  const handleCategoryClick = (categoryId) => {
    if (categoryId === currentCategory) {
      return;
    }
    
    if (categoryId === 'all') {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
    
    loadingCategories();
  };

  return (
    <div className='max-w-7xl mx-auto px-6 w-full'>
      <p className='text-white text-lg mb-4'>Filter by {label}:</p>
      <div className='flex flex-row flex-wrap gap-4'>
        <button
          value='all'
          aria-label={`Click to see all posts`}
          onClick={() => handleCategoryClick('all')}
          className={buttonClasses({ active: currentCategory === null })}
        >
          All ({totalPosts})
        </button>
        {categories
          .filter(category => category.count > 0)
          .map(filteredCategory => (
            <button
              key={filteredCategory.id}
              value={filteredCategory.id}
              aria-label={`Click to filter posts by ${filteredCategory.name} category`}
              onClick={() => handleCategoryClick(filteredCategory.id)}
              className={buttonClasses({ active: filteredCategory.id === currentCategory })}
            >
              {filteredCategory.name} ({filteredCategory.count})
            </button>
          ))
        }
      </div>
    </div>
  );
};

CategorySelectRest.propTypes = {
  categories: PropTypes.array,
  currentCategory: PropTypes.string,
  setSelectedCategory: PropTypes.func,
  loadingCategories: PropTypes.func,
  label: PropTypes.string
};

export default CategorySelectRest;
