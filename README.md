# Usage

```js
let cantseeme = new Secret(Math.random());
document.dispatchEvent(new CustomEvent("get"));await cantseeme.secret
```