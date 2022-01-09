import browser from 'webextension-polyfill';

const SUBMIT_SELECTOR = '#submit-button';
const HEX_SELECTOR = (idx) => `#hex-grid > li:nth-child(${idx}) > div > a > p`;
const DICT_URL =
  'https://raw.githubusercontent.com/josepdecid/auto-paraulogic/main/catala.txt';

function isSuperset(set, subset) {
  for (const elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;
}

const readDictionary = async () => {
  const response = await fetch(DICT_URL);

  const reader = response.body.getReader();
  const rawValues = (await reader.read()).value;

  const dictionary = [];
  let currentWord = '';

  for (let i = 0; i < rawValues.length; i += 1) {
    const c = String.fromCharCode(rawValues[i]);
    if (c === '\n') {
      dictionary.push(currentWord);
      currentWord = '';
    } else currentWord += c;
  }

  return dictionary;
};

const findAndInsertWords = (dictionary) => {
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

  const idx = 0;
  for (const word of dictionary) {
    if (
      word.length >= 3 &&
      word.includes(required) &&
      isSuperset(options, new Set(word))
    ) {
      for (const c of word) {
        const element = char2Element[c];
        element.click();
      }

      submitButton.click();
    }
  }
};

browser.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request === 'InsertWords') {
    const dictionary = await readDictionary();
    await findAndInsertWords(dictionary);
  }

  return Promise.resolve('got your message, thanks!');
});
