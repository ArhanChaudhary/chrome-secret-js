# secret-js

secret-js is an extension that provides true private state within Chrome without the use of networking or cryptography, as defined per my blog https://arhan.sh/blog/true-private-state-in-javascript-a-chromium-rabbit-hole/.

# Installation

1. Change the path key in `secret.json` to the <ins>absolute</ins> path of `main.py`
1. Move `secret.json` to the appropriate directory as specified here https://developer.chrome.com/docs/extensions/develop/concepts/native-messaging#native-messaging-host-location
1. Load `extension` as an unpacked extension https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked

# Usage

```js
let secret = new Secret(Math.random());
// The only way to get back the original value is to call this
await secret.get(); // 0.14619830395889677
```
