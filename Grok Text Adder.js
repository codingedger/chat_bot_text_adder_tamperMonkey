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

  function applyStyles(elements) {
    elements.forEach((el) => {
      const parent = el.parentNode;

      for (const child of parent.children) {
        child.style.maxWidth = "100%";
        child.style.width = "100%";
      }

      for (const child of el.children) {
        //console.log(child);
        child.style.maxWidth = "100%";
        child.style.width = "100%";
        for (const grandChild of child.children) {
          grandChild.style.maxWidth = "100%";
          grandChild.style.width = "100%";
        }
      }
    });
  }

  function observeDOM() {
    const targetNode = document.body;
    const config = {
      childList: true,
      subtree: true,
    };

    const callback = (mutationsList) => {
      const elements = document.querySelectorAll(".infinite-scroller, .chat-history, #last-reply-container");
      if (elements.length > 0) {
        applyStyles(elements);
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

    // Initial check
    const initialElements = document.querySelectorAll(".infinite-scroller, .chat-history, #last-reply-container");
    applyStyles(initialElements);
  }

  // Run when DOM is fully loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", observeDOM);
  } else {
    observeDOM();
  }
  // Create and append the control panel div
  const controlPanel = document.createElement("div");
  controlPanel.style.position = "fixed";
  controlPanel.style.right = "0px";
  controlPanel.style.top = "50%";
  controlPanel.style.width = "100px";
  controlPanel.style.height = "100px";
  controlPanel.style.zIndex = "9999"; // Ensure it appears on top
  controlPanel.innerHTML = `
    <button id="appendTextBtn" style="height:38px; width:98px;margin-bottom: 20px; background-color: black;border-radius: 8px;font-size: small;border: 0;font-family: arial;">dont talk</button>
    <button id="appendTextBtn1" style="height:38px; width:98px;margin-bottom: 20px; background-color: black;border-radius: 8px;font-size: small;border: 0;font-family: arial;">give me short answer please</button>
    <button id="appendTextBtn2" style="height:38px; width:98px;margin-bottom: 20px; background-color: black;border-radius: 8px;font-size: small;border: 0;font-family: arial;">show only code</button>
  `;
  document.body.appendChild(controlPanel);

  // Add event listener for the button
  document.getElementById("appendTextBtn").addEventListener("click", () => {
    const textarea = document.querySelector('textarea[aria-label="Ask Grok anything"]');
    if (textarea) {
      textarea.value += " do not talk";
    }
  });

  document.getElementById("appendTextBtn1").addEventListener("click", () => {
    const textarea = document.querySelector('textarea[aria-label="Ask Grok anything"]');
    if (textarea) {
      textarea.value += " give me short answer please";
    }
  });

  document.getElementById("appendTextBtn2").addEventListener("click", () => {
    const textarea = document.querySelector('textarea[aria-label="Ask Grok anything"]');
    if (textarea) {
      textarea.value += " show me only code please";
    }
  });
})();
