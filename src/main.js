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

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(registration => {
    console.log('Registration successful, scope is: ', registration.scope);
  }).catch(err => {
    console.log('Service worker registration failed, error: ', err);
  });
}

