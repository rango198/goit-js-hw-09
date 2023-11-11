import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  btnStart: document.querySelector('[data-start]'),
  dataInput: document.getElementById('datetime-picker'),
  daysValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours]'),
  minutesValue: document.querySelector('[data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]'),
};

refs.btnStart.disabled = true;
refs.btnStart.addEventListener('click', startTimer);
let remainingTime = 0;
const TIMER_DELAY = 1000;

function startTimer() {
  const selectDate = new Date(refs.dataInput.value);
  const currentDate = new Date();

  if (selectDate <= currentDate) {
    Notiflix.Notify.warning('Pelase choose a date in the future');
    return;
  }
  const intervalId = setInterval(() => {
    remainingTime = selectDate - new Date();

    if (remainingTime <= 0) {
       Notiflix.Notify.success('Times up!');
      clearInterval(intervalId);
      updateTimerValues(0);
      refs.btnStart.disabled = false;
    } else {
      const { days, hours, minutes, seconds } = convertMs(remainingTime);
      updateTimerValues(days, hours, minutes, seconds);
    }
  }, TIMER_DELAY);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimerValues(days, hours, minutes, seconds) {
  refs.daysValue.textContent = addLeadingZero(days);
  refs.hoursValue.textContent = addLeadingZero(hours);
  refs.minutesValue.textContent = addLeadingZero(minutes);
  refs.secondsValue.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectDates) {
    const selectDate = selectDates[0];
    const currentDate = new Date();

    if (selectDate <= currentDate) {
      Notiflix.Notify.warning('Please choose a date in the future');
      refs.btnStart.disabled = true;
    } else {
      refs.btnStart.disabled = false;
    }
  },
});
