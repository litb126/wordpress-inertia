const ImageUri = ({ src, fallback = '/images/social.jpg' }) => {
  if (!src) {
    return fallback;
  }

  return src;
};

export default ImageUri;
