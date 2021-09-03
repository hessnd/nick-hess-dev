import React from 'react';

const Slider: React.FC = () => (
  <div className="dark-mode">
    <label className="switch" htmlFor="dark-mode-toggle">
      <input
        id="dark-mode-toggle"
        aria-label="dark mode toggle"
        type="checkbox"
        name="dark-mode-toggle"
      />
      <span className="slider" />
    </label>
    <style jsx>
      {`
        .dark-mode {
          position: absolute;
          right: 10px;
          top: 10px;

          .switch {
            position: relative;
            display: inline-block;
            width: 48px;
            height: 28px;

            input {
              opacity: 0;
              width: 0;
              height: 0;

              &:checked + .slider {
                background-color: #666666;
              }

              &:focus + .slider {
                box-shadow: 0 0 1px #666666;
              }

              &:checked + .slider:before {
                transform: translateX(20px);
              }
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

              &:before {
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
            }
          }
        }
      `}
    </style>
  </div>
);

export default Slider;
