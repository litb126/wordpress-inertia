import PropTypes from 'prop-types';
import { isStr } from './cond';

const WysiwygContent = ({ content, className }) => {
  if (!isStr(content)) {
    return null;
  }

  const wysiwygContent = () => {
    return { __html: content };
  };

  return (
    <div
      className={`prose max-w-none text-inherit ${className || ''}`}
      dangerouslySetInnerHTML={wysiwygContent()}
    />
  );
};

WysiwygContent.propTypes = {
  content: PropTypes.string,
};

export default WysiwygContent;
