import browser from 'webextension-polyfill';

browser.runtime.onInstalled.addListener(() => {
  console.log('Auto-Paraulògic instal·lat!');
});

// Limit the extension to Paraulogic website.
/* browser.declarativeContent.onPageChanged.removeRules(undefined, () => {
  browser.declarativeContent.onPageChanged.addRules([
    {
      conditions: [
        new browser.declarativeContent.PageStateMatcher({
          pageUrl: {
            hostEquals: 'https://vilaweb.cat/paraulogic/',
          },
        }),
      ],
      actions: [new browser.declarativeContent.ShowAction()],
    },
  ]);
}); */

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);

  // And respond back to the sender.
  return Promise.resolve('got your message, thanks!');
});
