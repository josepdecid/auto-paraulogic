import 'emoji-log';
import browser from 'webextension-polyfill';

import '../styles/popup.scss';

/* function openWebPage(url) {
  return browser.tabs.create({
    url,
  });
} */

document.addEventListener('DOMContentLoaded', async () => {
  const tabs = await browser.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  const tab = tabs.length && tabs[0];

  // When clicking the insert words button, run the process to find candidate words.
  const insertWordsButton = document.getElementById('insert-words-btn');
  insertWordsButton.addEventListener('click', async () => {
    await browser.tabs.sendMessage(tab.id, 'InsertWords');
  });

  /* document.getElementById('github__button').addEventListener('click', () => {
  return openWebPage('https://github.com/josepdecid/auto-paraulogic');
}); */
});
