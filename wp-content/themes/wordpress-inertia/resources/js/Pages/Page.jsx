import React, { useState, useEffect } from 'react';

export default function Page({ title, content }) {
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
      {loaded && (
        <div className="space-y-4">
          <h1 className="text-xl">{title}</h1>
          <div className="space-y-4" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      )}
    </div>
  );
}
