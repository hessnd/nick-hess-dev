'use-strict';
import initDarkModeHelper from './js/darkMode';
import './styles.scss';

// set up dark mode
initDarkModeHelper();

// get all links
const links = document.querySelectorAll('a');

// add listener to all links
links.forEach(link => {
  link.addEventListener('mouseenter', event => {
    event.target.style.fontWeight = '160';
  }, false);

  link.addEventListener('mouseout', event => {
    event.target.style.fontWeight = '';
  }, false);
});

