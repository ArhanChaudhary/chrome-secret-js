let _secrets = {};

chrome.runtime.onMessage.addListener(function (
  { type, secret },
  sender,
  sendResponse
) {
  if (type === "get") {
    sendResponse(_secrets[sender.documentId]);
  } else if (type === "set") {
    _secrets[sender.documentId] = secret;
  }
});
