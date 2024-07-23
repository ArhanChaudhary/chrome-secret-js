document.addEventListener("set", function (secret) {
  chrome.runtime.sendMessage({ type: "set", secret: secret.detail });
});

document.addEventListener("get", function () {
  chrome.runtime.sendMessage({ type: "get" }, (secret) => {
    document.dispatchEvent(new CustomEvent("secret", { detail: secret }));
  });
});
