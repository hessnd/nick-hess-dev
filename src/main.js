import './styles.scss';

const setCopyright = () => {
  const copy = document.getElementById('copyright');
  const date = new Date();
  const year = date.getFullYear();
  copy.innerHTML = `Copyright &copy; ${year} Nick Hess`;
};

window.onload = () => {
  setCopyright();

  const state = {
    isDark: false,
    darkMode: {
      background: 'black',
      text: 'white',
    },
    lightMode: {
      background: 'white',
      text: 'black',
    },
  };

  // get toggle button
  const toggle = document.getElementById('dark-mode-toggle');
  const myName = document.getElementById('my-name');
  const nativeColorScheme = window.matchMedia('(prefers-color-scheme: dark)');

  const setColor = ({ background, text }) => {
    document.body.style.backgroundColor = background;
    document.body.style.color = text;
    myName.style.borderBottom = `solid ${text} 4px`;
  };

  const toggleColor = () => {
    if (state.isDark) {
      setColor(state.darkMode);
    } else if (!state.isDark) {
      setColor(state.lightMode);
    }
  };

  const setDark = e => {
    state.isDark = e.matches;
    toggleColor();
  };

  nativeColorScheme.addListener(setDark);

  // initialize button to initial state
  setDark(nativeColorScheme);
  toggle.checked = state.isDark;
  toggleColor();
  // initialized

  toggle.addEventListener('change', () => {
    state.isDark = !state.isDark;
    toggleColor();
  });
};
