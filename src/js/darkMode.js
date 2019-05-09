'use-strict';

// typography colors
const slate = '#393f42';
const whitesmoke = '#f5f5f5';

// color scheme state
const state = {
  isDark: false,
  darkMode: {
    background: slate,
    headers: whitesmoke,
    body: 'white',
  },
  lightMode: {
    background: 'white',
    headers: slate,
    body: 'black',
  },
};

// get toggle button
const toggle = document.getElementById('dark-mode-toggle');
const safariColorScheme = window.matchMedia('(prefers-color-scheme: dark)');

const setColor = ({ background, headers, body }) => {
  // set background color
  document.body.style.backgroundColor = background;

  // get all elements with class .body and apply styles
  const bodyElements = document.querySelectorAll('.body');
  bodyElements.forEach(elem => {
    elem.style.color = body;
  });

  const positions = document.querySelectorAll('.positions');
  positions.forEach(elem => {
    elem.style.color = body;
  });
  // get all elements with class .header and apply styles
  const headerElements = document.querySelectorAll('.header');
  headerElements.forEach(elem => {
    elem.style.color = headers;
    if (elem.className.includes('border-bottom')) {
      elem.style.borderBottom = `solid ${headers} 4px`;
    }
  });
};

const toggleColor = () => {
  if (state.isDark) {
    setColor(state.darkMode);
  } else if (!state.isDark) {
    setColor(state.lightMode);
  }
};

// set dark mode for safari native color scheme
const setDark = e => {
  state.isDark = e.matches;
  toggleColor();
};

export default function initDarkModeHelper() {
  // listener for safari color scheme
  safariColorScheme.addListener(setDark);

  // initialize color scheme to initial state
  setDark(safariColorScheme);
  toggle.checked = state.isDark;
  toggleColor();

  // add event listener
  toggle.addEventListener('change', () => {
    state.isDark = !state.isDark;
    toggleColor();
  });
}




