'use strict';

/**
 * Objects we want to keep track of initial properties for.
 */

var globals = {
  window: {},
  document: {},
  XMLHttpRequest: {}
};

/**
 * Capture initial state of `window`.
 *
 * Note, `window.addEventListener` is overritten already,
 * from `clearListeners`. But this is desired behavior.
 */

globals.window.removeEventListener = window.removeEventListener;
globals.window.addEventListener = window.addEventListener;
globals.window.setTimeout = window.setTimeout;
globals.window.setInterval = window.setInterval;
globals.window.onerror = null;
globals.window.onload = null;

/**
 * Capture initial state of `document`.
 */

globals.document.write = document.write;
globals.document.appendChild = document.appendChild;
globals.document.removeChild = document.removeChild;

/**
 * Capture the initial state of `XMLHttpRequest`.
 */

// IE7
if (typeof XMLHttpRequest !== 'undefined' && 'prototype' in XMLHttpRequest) {
  globals.XMLHttpRequest.open = XMLHttpRequest.prototype.open;
}

/**
 * Reset properties on object.
 *
 * @param {Object} source
 * @param {Object} target
 * @api private
 */
function copy(source, target) {
  for (var name in source) {
    if (source.hasOwnProperty(name)) {
      target[name] = source[name];
    }
  }
}

/**
 * Reset initial state.
 *
 * @api public
 */

module.exports = function() {
  copy(globals.window, window);
  copy(globals.XMLHttpRequest, XMLHttpRequest.prototype);
  copy(globals.document, document);
};
