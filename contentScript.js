document.addEventListener("set", function ({ detail: { secret, secretId } }) {
  chrome.runtime.sendMessage({ type: "set", secret, secretId }, () => {
    document.dispatchEvent(new CustomEvent("setSuccess", { detail: secretId }));
  });
});

document.addEventListener("get", function ({ detail: secretId }) {
  chrome.runtime.sendMessage({ type: "get", secretId }, (secret) => {
    document.dispatchEvent(
      new CustomEvent("secret", { detail: { secret, secretId } })
    );
  });
});
