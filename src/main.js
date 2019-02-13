'use-strict';
import initDarkModeHelper from './js/darkMode';
import './styles.scss';

const setCopyright = () => {
  const copy = document.getElementById('copyright');
  const date = new Date();
  const year = date.getFullYear();
  copy.innerHTML = `Copyright &copy; ${year} Nick Hess`;
};

// set copyright
setCopyright();
initDarkModeHelper();




