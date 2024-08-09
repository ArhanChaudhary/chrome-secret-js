let port = chrome.runtime.connectNative("secret");
let requestId = 0;
let pendingRequests = new Map();

port.onMessage.addListener(({ requestId, secret }) => {
  if (pendingRequests.has(requestId)) {
    let sendResponse = pendingRequests.get(requestId);
    pendingRequests.delete(requestId);
    sendResponse(JSON.parse(secret));
  }
});

chrome.runtime.onMessage.addListener(
  (message, { documentId }, sendResponse) => {
    if (message.type === "set") {
      port.postMessage({
        type: message.type,
        secretId: message.secretId,
        documentId,
        secret: JSON.stringify(message.secret),
      });
    } else if (message.type === "get") {
      let nextRequestId = requestId++;
      pendingRequests.set(nextRequestId, sendResponse);
      port.postMessage({
        type: message.type,
        secretId: message.secretId,
        documentId,
        requestId: nextRequestId,
      });
      return true;
    }
  }
);
