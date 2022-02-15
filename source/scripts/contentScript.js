import browser from 'webextension-polyfill';
import catalanDictionary from '../assets/catala.json';

const SUBMIT_ID = 'submit-button';
const INPUT_ID = 'test-word';
const HEX_SELECTOR = (idx) => `#hex-grid > li:nth-child(${idx}) > div > a > p`;

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

  for (let i = 1; i < 8; i += 1) {
    const element = document.querySelector(HEX_SELECTOR(i));
    const option = element.textContent.toUpperCase();

    if (i === 4) required = option;

    rawOptions.push(option);
  }

  const inputElement = document.getElementById(INPUT_ID);
  const submitButton = document.getElementById(SUBMIT_ID);
  const options = new Set(rawOptions);

  for (const word of catalanDictionary) {
    if (word.includes(required) && isSuperset(options, new Set(word))) {
      console.log(word);
      inputElement.textContent = word.toLowerCase();
      submitButton.click();
    }
  }

  console.log('Nice tutorial');
};

browser.runtime.onMessage.addListener((request) => {
  if (request === 'InsertWords') {
    findAndInsertWords();
  }

  return Promise.resolve('got your message, thanks!');
});
