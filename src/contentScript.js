'use strict';

let enabled = false;

chrome.runtime.onMessage.addListener((request) => {
  if (request.type !== 'toggle') return;

  enabled = !enabled;

  const viewport = document.querySelector('meta[name=viewport]');
  if (!viewport) {
    alert('meta viewport is not found!');
    return;
  }
  
  if (enabled) {
    viewport.setAttribute('content', 'width=1440px, height=device-height, initial-scale=1.0');
  } else {
    viewport.setAttribute('content', 'width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0');
  }
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
  chrome.runtime.sendMessage({ colorScheme: event.matches ? 'dark' : 'light' });
});
