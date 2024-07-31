// chrome.runtime.onMessage.addListener(function (
//   message,
//   { documentId },
//   sendResponse
// ) {
//   if (message.type === "set") {
//     chrome.runtime.sendNativeMessage(
//       "secret",
//       {
//         secret: JSON.stringify(message.secret),
//         secretId: message.secretId,
//         documentId,
//         type: "set",
//       },
//       sendResponse
//     );
//     return true;
//   } else if (message.type === "get") {
//     chrome.runtime.sendNativeMessage(
//       "secret",
//       {
//         secretId: message.secretId,
//         documentId,
//         type: "get",
//       },
//       (secret) => sendResponse(JSON.parse(secret))
//     );
//     return true;
//   }
// });

let port = chrome.runtime.connectNative("secret");
let requestId = 0;
let pendingRequests = new Map();

port.onMessage.addListener((response) => {
  debugger;
  if (pendingRequests.has(response.requestId)) {
    let sendResponse = pendingRequests.get(response.requestId);
    if (response.type === "get") {
      sendResponse(JSON.parse(response.secret));
    } else if (response.type === "set") {
      sendResponse();
    }
    pendingRequests.delete(response.requestId);
  }
});

chrome.runtime.onMessage.addListener(
  (message, { documentId }, sendResponse) => {
    let currentRequestId = ++requestId;
    let messageData = {
      type: message.type,
      secretId: message.secretId,
      documentId,
      requestId: currentRequestId,
    };
    if (message.type === "set") {
      messageData.secret = JSON.stringify(message.secret);
    }
    pendingRequests.set(currentRequestId, sendResponse);
    port.postMessage(messageData);
    return true;
  }
);
