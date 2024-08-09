# secret-js

secret-js is an extension that provides true private state within Chrome without the use of networking or cryptography, as defined per my blog https://arhan.sh/blog/true-private-state-in-javascript-a-chromium-rabbit-hole/.

# Installation

1. Load this directory as an unpacked extension https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked
1.

# Usage

```js
let secret = new Secret(Math.random());
// The only way to get back the original value is to call this
await secret.get(); // 0.14619830395889677
```

Change the path in secret.json to main.py

It has to be an absolute path
Load the extension https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked

Chrome for Developers
Hello World extension  |  Chrome Extensions  |  Chrome for Develope...
Create your first Hello World Chrome extension.
In your extensions page you will see an extension ID, change the uri in secret.json to it

Move secret.json to the appropriate directory as specified here https://developer.chrome.com/docs/extensions/develop/concepts/native-messaging#native-messaging-host-location

Chrome for Developers
Native messaging  |  Chrome Extensions  |  Chrome for Developers
Exchange messages with native applications from your Chrome Extension.
Reload your extension and open up a devtools window on a new tab
Run 'a = new Secret(1000); await a.get()' hopefully you get back 1000