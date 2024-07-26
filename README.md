# Usage

```js
let cantseeme = new Secret(Math.random(), "cantseeme");
document.dispatchEvent(new CustomEvent("get", { detail: "cantseeme"}));await cantseeme.secret
```