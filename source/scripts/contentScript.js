import browser from 'webextension-polyfill';
import catalanDictionary from '../assets/catala.json';

const SUBMIT_SELECTOR = '#submit-button';
const HEX_SELECTOR = (idx) => `#hex-grid > li:nth-child(${idx}) > div > a > p`;

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function isSuperset(set, subset) {
  for (const elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;
}

const findAndInsertWords = () => {
  let required;
  const rawOptions = [];
  const char2Element = {};

  for (let i = 1; i < 8; i += 1) {
    const element = document.querySelector(HEX_SELECTOR(i));
    const option = element.textContent.toUpperCase();

    if (i === 4) required = option;

    rawOptions.push(option);
    char2Element[option] = element;
  }

  const submitButton = document.querySelector(SUBMIT_SELECTOR);
  const options = new Set(rawOptions);

  for (const word of catalanDictionary) {
    if (
      word.length >= 3 &&
      word.includes(required) &&
      isSuperset(options, new Set(word))
    ) {
      console.log(word);

      for (const c of word) {
        const element = char2Element[c];
        element.click();
        sleep(10);
      }

      submitButton.click();
    }
  }

  console.log('END!');
};

browser.runtime.onMessage.addListener((request) => {
  if (request === 'InsertWords') {
    findAndInsertWords();
  }

  return Promise.resolve('got your message, thanks!');
});
