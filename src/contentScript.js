'use strict';

let enabled = false;
let savedContent;

chrome.runtime.onMessage.addListener((request) => {
  if (request.type !== 'toggle') return;

  enabled = !enabled;

  const viewport = document.querySelector('meta[name=viewport]');
  if (savedContent === undefined) {
    if (viewport) {
      savedContent = viewport.getAttribute('content');
    } else {
      savedContent = null;
    }
  }
  
  if (enabled) {
    if (savedContent) {
      viewport.setAttribute('content', 'width=1440px, height=device-height, initial-scale=1.0');
    } else {
      const metaTag = document.createElement('meta');
      metaTag.name = 'viewport';
      metaTag.content = 'width=1440px, height=device-height, initial-scale=1.0';
      document.getElementsByTagName('head')[0].appendChild(metaTag);
    }
  } else {
    if (savedContent) {
      viewport.setAttribute('content', savedContent);
    } else {
      viewport.remove();
    }
  }
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
  chrome.runtime.sendMessage({ colorScheme: event.matches ? 'dark' : 'light' });
});
