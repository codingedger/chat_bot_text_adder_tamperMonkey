// ==UserScript==
// @name         Grok Text Adder
// @namespace    http://tampermonkey.net/
// @version      2025-07-09
// @description  Adjust chat history width dynamically and display control panel
// @author       You
// @match        https://grok.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=grok.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // Select the div with class 'relative z-10'
  const targetDiv = document.querySelector('.relative.z-10');

  function applyStyles(elements) {
    elements.forEach((el) => {
      if (el.tagName.toLowerCase() === "infinite-scroller") {
        for (const child of el.children) {
          child.style.maxWidth = "100%";
          child.style.width = "100%";
        }
      }
    });
  }

  function observeDOM() {
    const targetNode = document.body;
    const config = { childList: true, subtree: true };

    const callback = (mutationsList) => {
      const elements = document.querySelectorAll(".infinite-scroller, .chat-history");
      if (elements.length > 0) {
        applyStyles(elements);
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

    // Initial check
    const initialElements = document.querySelectorAll(".infinite-scroller, .chat-history");
    applyStyles(initialElements);
  }

  // Run when DOM is fully loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", observeDOM);
  } else {
    observeDOM();
  }

  const controlPanel = document.createElement('div');
  controlPanel.style.position = 'fixed';
  controlPanel.style.right = '0px';
  controlPanel.style.top = '50%';
  controlPanel.style.width = '100px';
  controlPanel.style.height = '100px';
  controlPanel.style.zIndex = '9999'; // Ensure it appears on top
  controlPanel.innerHTML = `
    <button id="appendTextBtn" style="height:38px; width:98px;margin-bottom: 20px; background-color: black;border-radius: 8px;">dont talk</button>
    <button id="appendTextBtn1" style="height:38px; width:98px;margin-bottom: 20px; background-color: black;border-radius: 8px;">show only code</button>
  `;
  document.body.appendChild(controlPanel);

  // Add event listener for the button
  document.getElementById('appendTextBtn').addEventListener('click', () => {
    const textarea = document.querySelector('textarea[aria-label="Ask Grok anything"]');
    if (textarea) {
      textarea.value += ' do not talk';
    }
  });

  document.getElementById('appendTextBtn1').addEventListener('click', () => {
    const textarea = document.querySelector('textarea[aria-label="Ask Grok anything"]');
    if (textarea) {
      textarea.value += ' show me only code please';
    }
  });



})();