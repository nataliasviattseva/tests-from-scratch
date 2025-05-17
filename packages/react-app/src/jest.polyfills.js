const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Polyfill TransformStream if not present
if (typeof global.TransformStream === 'undefined') {
  try {
    global.TransformStream = require('web-streams-polyfill/ponyfill').TransformStream;
  } catch (e) {
    // fallback: no-op polyfill
    global.TransformStream = function () {};
  }
}