import '../index.scss';

const copy = document.getElementById('copyright');
const date = new Date();
const year = date.getFullYear();
copy.innerHTML = `Copyright &copy; ${year} Nick Hess`;
console.log(copy);
