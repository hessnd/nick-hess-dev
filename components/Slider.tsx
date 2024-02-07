'use client';

import React, { useEffect, useState } from 'react';

const Slider = () => {
  const [isDark, setDark] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    setDark(prefersDark.matches);
  }, []);

  const handleChange = () => {
    setDark(!isDark);
  };

  return (
    <div className="dark-mode">
      <label className="switch" htmlFor="dark-mode-toggle">
        <input
          id="dark-mode-toggle"
          aria-label="dark mode toggle"
          type="checkbox"
          name="dark-mode-toggle"
          checked={isDark}
          onChange={handleChange}
        />
        <span className="slider" />
      </label>
      <style jsx>
        {`
          .dark-mode {
            position: absolute;
            right: 10px;
            top: 10px;
          }
          .switch {
            position: relative;
            display: inline-block;
            width: 48px;
            height: 28px;
          }

          .switch input {
            opacity: 0;
            width: 0;
            height: 0;
          }

          .switch input::checked + .slider {
            background-color: #666666;
          }

          .switch input::focus + .slider {
            box-shadow: 0 0 1px #666666;
          }

          .switch input::checked + .slider::before {
            transform: translateX(20px);
          }

          .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #666666;
            transition: 0.4s;
            border-radius: 28px;
          }

          .slider::before {
            position: absolute;
            content: '';
            height: 20px;
            width: 20px;
            left: 4px;
            bottom: 4px;
            border-radius: 50%;
            background-color: white;
            transition: 0.4s;
          }
        `}
      </style>
    </div>
  );
};

export default Slider;
