# secret-js

secret-js is a Chrome extension that provides the closest to true private state within Chrome without the use of cryptography. It allows you to hide a JSON-serializable value from Devtools' scope inspector, heap profiler, and .

# Installation

1. Load this directory as an unpacked extension https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked
1. 

# Usage

```js
let secret = new Secret(Math.random());
// The only way to get back the original value is to call this
await secret.get(); // 0.14619830395889677
```