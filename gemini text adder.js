// ==UserScript==
// @name         Gemini text adder
// @namespace    http://tampermonkey.net/
// @version      2025-07-09
// @description  Adjust chat history width dynamically
// @author       You
// @match        https://gemini.google.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=grok.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // Select the div with class 'ql-editor textarea new-input-ui'
  //const editorDiv = document.querySelector('.ql-editor.textarea.new-input-ui');

  function applyStyles(elements) {
    elements.forEach((el) => {
      if (el.tagName.toLowerCase() === "infinite-scroller") {
        for (const child of el.children) {
          child.style.maxWidth = "100%";
          child.style.width = "100%";
          for (const grandChild of child.children) {
              grandChild.style.maxWidth = "100%";
              grandChild.style.width = "100%";

          }
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

  // Create and append the control panel div
  const controlPanel = document.createElement('div');
  controlPanel.style.position = 'fixed';
  controlPanel.style.right = '0px';
  controlPanel.style.top = '50%';
  controlPanel.style.width = '100px';
  controlPanel.style.height = '100px';
  controlPanel.style.zIndex = '9999'; // Ensure it appears on top
  controlPanel.innerHTML = `
    <button id="appendTextBtn" style="height:38px; width:98px;margin-bottom: 20px; background-color: black;border-radius: 8px;font-size: small;border: 0;font-family: arial;">dont talk</button>
    <button id="appendTextBtn1" style="height:38px; width:98px;margin-bottom: 20px; background-color: black;border-radius: 8px;font-size: small;border: 0;font-family: arial;">give me short answer please</button>
    <button id="appendTextBtn2" style="height:38px; width:98px;margin-bottom: 20px; background-color: black;border-radius: 8px;font-size: small;border: 0;font-family: arial;">show only code</button>
  `;
  document.body.appendChild(controlPanel);

  // Add event listener for the button
  document.getElementById('appendTextBtn').addEventListener('click', () => {
    if (document.querySelector('.ql-editor.textarea.new-input-ui')) {
      document.querySelector('.ql-editor.textarea.new-input-ui').innerHTML += 'do not talk ';
    }
  });

  document.getElementById('appendTextBtn1').addEventListener('click', () => {
    if (document.querySelector('.ql-editor.textarea.new-input-ui')) {
      document.querySelector('.ql-editor.textarea.new-input-ui').innerHTML += 'give me short answer please';
    }
  });
  document.getElementById('appendTextBtn2').addEventListener('click', () => {
    if (document.querySelector('.ql-editor.textarea.new-input-ui')) {
      document.querySelector('.ql-editor.textarea.new-input-ui').innerHTML += 'show me only code please';
    }
  });



})();
