import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formId: document.querySelector('.form'),
  delayId: document.querySelector('.delay'),
  stepId: document.querySelector('.step'),
  amountId: document.querySelector('.amount'),
};

refs.formId.addEventListener('click', onPromiseCreate);

function onPromiseCreate(e) {
  e.preventDefault();
  const { delay, step, amount } = e.currentTarget.elements;
  let inputDelay = Number(refs.delayId.value);
  let inputStep = Number(refs.stepId.value);
  let inputAmount = Number(refs.amountId.value);

  for (let i = 1; i <= inputAmount; i += 1) {
    inputDelay += inputStep;

    createPromise(i, inputDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    e.currentTarget.reset();
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
