# secret-js

secret-js is a Chrome extension that provides the closest to true private state achievable within Chromium's DevTools. It allows you to hide a JSON-serializable value from Devtools' scope and memory inspector.

# Installation

https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked

# Usage

```js
let secret = new Secret(Math.random());
// The only way to get back the original value is to call this
await secret.get(); // 0.14619830395889677
```