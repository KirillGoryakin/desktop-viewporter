'use strict';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

chrome.action.onClicked.addListener(async (tab) => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { type: "toggle" });
});

chrome.runtime.onMessage.addListener((request) => {
  switch (request.colorScheme) {
    case 'light': 
      chrome.action.setIcon({
        path: {
          "16": "icons/icon_16.png",
          "32": "icons/icon_32.png",
          "48": "icons/icon_48.png",
          "128": "icons/icon_128.png"
        }
      });
      break;
    case 'dark': 
      chrome.action.setIcon({
        path: {
          "16": "icons/icon_16_white.png",
          "32": "icons/icon_32_white.png",
          "48": "icons/icon_48_white.png",
          "128": "icons/icon_128_white.png"
        }
      });
      break;
  }
});
