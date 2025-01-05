const ImageAlt = ({
  alt,
  fallback = 'SOAK Digital. We work with our clients to define, design and develop transformative digital and data visualisation experiences across all platforms and touchpoints for some of the world’s leading brands.',
}) => {
  if (!alt) {
    return fallback;
  }

  return alt;
};

export default ImageAlt;
