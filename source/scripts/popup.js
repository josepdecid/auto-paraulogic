import 'emoji-log';
import browser from 'webextension-polyfill';

import '../styles/popup.scss';

function openWebPage(url) {
  return browser.tabs.create({
    url,
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const tabs = await browser.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  const tab = tabs.length && tabs[0];

  // When clicking the insert words button, run the process to find candidate words.
  const insertWordsButton = document.getElementById('insert-words-btn');
  const insertingWordsText = document.getElementById('inserting-words-text');

  insertWordsButton.addEventListener('click', async () => {
    insertWordsButton.classList.toggle('hidden');
    insertingWordsText.classList.toggle('hidden');

    await browser.tabs.sendMessage(tab.id, 'InsertWords');

    insertWordsButton.classList.toggle('hidden');
    insertingWordsText.classList.toggle('hidden');
  });

  document.getElementById('github_button').addEventListener('click', () => {
    return openWebPage('https://github.com/josepdecid/auto-paraulogic');
  });
});
