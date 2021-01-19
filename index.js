const colors = [
  '#FFFFFF',
  '#2196F3',
  '#4CAF50',
  '#FF9800',
  '#009688',
  '#795548',
];

const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-action="start"]'),
  stopBtn: document.querySelector('button[data-action="stop"]'),
};

if (localStorage.getItem('body-bg-color') !== null) {
  refs.body.setAttribute(
    'style',
    `background-color: ${localStorage.getItem('body-bg-color')}`,
  );
}
refs.stopBtn.setAttribute('disabled', '');
let intervalId = null;
let isBackgroundChanging = false;

refs.startBtn.addEventListener('click', changeBodyBackground);

function changeBodyBackground() {
  if (isBackgroundChanging) {
    return;
  }

  isBackgroundChanging = true;

  intervalId = setInterval(updateBodyAttribute, 1000);

  refs.startBtn.setAttribute('disabled', '');
  refs.stopBtn.removeAttribute('disabled');
}

function updateBodyAttribute() {
  let colorIndex = randomIntegerFromInterval(0, colors.length - 1);
  localStorage.setItem('body-bg-color', colors[colorIndex]);
  refs.body.style.backgroundColor = colors[colorIndex];
  console.log(`Выбран цвет ${colorIndex}: ${colors[colorIndex]}`);
}

refs.stopBtn.addEventListener('click', stopChangingBodyBackground);

function stopChangingBodyBackground() {
  isBackgroundChanging = false;
  clearInterval(intervalId);
  refs.stopBtn.setAttribute('disabled', '');
  refs.startBtn.removeAttribute('disabled');
}
