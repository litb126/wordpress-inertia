import React, { useState, useEffect } from 'react';

export default function FrontPage({ page }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div
      className={`duration-200 transition-all ${
        loaded ? 'opacity-100 transform translate-y-0' : 'opacity-75 transform translate-y-8'
      }`}
    >
      {loaded && <div dangerouslySetInnerHTML={{ __html: page.post_content }} />}
    </div>
  );
}
