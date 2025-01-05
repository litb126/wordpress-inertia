import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import axios from 'axios';

export default function PagePostRequest({ title, content }) {
  const [loaded, setLoaded] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { props, setProps } = usePage();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { data } = await axios.post('/wp-json/inertia-theme/v1/toast', {
      toastMessage
    });

    setProps(props => ({
      ...props,
      toast_message: data.toast_message
    }));
    
    setToastMessage('');
  };

  return (
    <div
      className={`duration-200 transition-all ${
        loaded ? 'opacity-100 transform translate-y-0' : 'opacity-75 transform translate-y-8'
      }`}
    >
      {loaded && (
        <div className="max-w-2xl min-h-screen mx-auto space-y-8">
          {/* Traditional form lives in Gutenberg block */}
          <div>
            <h3>Traditional POST request</h3>
            <div className="mt-2 space-y-4" dangerouslySetInnerHTML={{ __html: content }} />
          </div>

          {/* React form lives here */}
          <div>
            <h3>AJAX POST request</h3>
            <form
              className="flex flex-col items-start mt-2 sm:flex-row"
              onSubmit={handleSubmit}
            >
              <input
                className="bg-gray-200 h-12 px-4 rounded w-full"
                type="text"
                placeholder="Type anything..."
                value={toastMessage}
                onChange={(e) => setToastMessage(e.target.value)}
              />
              <button
                className="bg-indigo-300 duration-300 font-bold h-12 hover:bg-indigo-400 hover:text-indigo-800 mt-4 px-4 rounded sm:ml-4 sm:mt-0 text-indigo-700 text-sm tracking-wide transition-colors uppercase"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
