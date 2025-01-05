import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';

export default function Toast() {
  const [showing, setShowing] = useState(false);
  const { props } = usePage();
  const message = props.toast_message;

  useEffect(() => {
    if (!message) return;

    setShowing(true);
    const timer = setTimeout(() => {
      setShowing(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div
      className={`bg-indigo-300 duration-200 fixed top-0 transform transition-transform w-full ${
        showing ? '' : '-translate-y-full'
      }`}
    >
      <p className="font-bold px-8 py-4 text-center text-indigo-700 text-sm tracking-wide uppercase">
        {message}
      </p>
    </div>
  );
}
