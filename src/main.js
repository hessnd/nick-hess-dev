'use-strict';
import initDarkModeHelper from './js/darkMode';
import 'animate.css';
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

// get all links
const links = document.querySelectorAll('.social-link');

// add listener to all links
links.forEach(link => {
  link.addEventListener('mouseenter', event => {
    event.target.style.fontWeight = '160';
  }, false);

  link.addEventListener('mouseout', event => {
    event.target.style.fontWeight = '';
  }, false);
});

