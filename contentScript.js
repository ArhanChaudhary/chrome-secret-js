document.addEventListener("set", function (secrets) {
  chrome.runtime.sendMessage({ type: "set", secrets: secrets.detail }, () => {
    document.dispatchEvent(new CustomEvent("setSuccess"));
  });
});

document.addEventListener("get", function (secretObjectStr) {
  chrome.runtime.sendMessage(
    { type: "get", secretObjectStr: secretObjectStr.detail },
    (secret) => {
      document.dispatchEvent(new CustomEvent("secret", { detail: secret }));
    }
  );
});
