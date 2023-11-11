const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

let intervalId;
refs.btnStart.addEventListener('click', startClick => {
  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.btnStart.disabled = true;
});

refs.btnStop.addEventListener('click', stopClick => {
  clearInterval(intervalId);
  refs.btnStart.disabled = false;
});
