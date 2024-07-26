let _secrets = {};

async function onContentMessage(
  message,
  { documentId, tab: { id: tabId } },
  sendResponse
) {
  if (message.type === "set") {
    if (_secrets[documentId]) {
      sendResponse();
      return;
    }
    _secrets[documentId] = {};

    await new Promise((resolve) =>
      chrome.debugger.attach({ tabId }, "1.3", resolve)
    );
    await chrome.debugger.sendCommand({ tabId }, "HeapProfiler.enable");
    await chrome.debugger.sendCommand(
      { tabId },
      "HeapProfiler.takeHeapSnapshot"
    );

    let secretObjectIds = await Promise.all(
      [...Array(message.secrets.length).keys()].map((i) =>
        chrome.debugger
          .sendCommand({ tabId }, "Runtime.evaluate", {
            expression: `window.__secret${i}`,
          })
          .then(({ result: { objectId } }) => objectId)
      )
    );
    let secretHeapObjectIds = await Promise.all(
      secretObjectIds.map((secretObjectId) =>
        chrome.debugger
          .sendCommand({ tabId }, "HeapProfiler.getHeapObjectId", {
            objectId: secretObjectId,
          })
          .then(({ heapSnapshotObjectId }) => heapSnapshotObjectId)
      )
    );
    for (let [i, secretHeapObjectId] of Object.entries(secretHeapObjectIds)) {
      _secrets[documentId][secretHeapObjectId] = message.secrets[i];
    }
    sendResponse();
  } else if (message.type === "get") {
    let secretHeapObjectId;
    let secretObjectId = await chrome.debugger
      .sendCommand({ tabId }, "Runtime.evaluate", {
        expression: message.secretObjectStr,
      })
      .then(({ result: { objectId } }) => objectId);
    secretHeapObjectId = await chrome.debugger
      .sendCommand({ tabId }, "HeapProfiler.getHeapObjectId", {
        objectId: secretObjectId,
      })
      .then(({ heapSnapshotObjectId }) => heapSnapshotObjectId);
    sendResponse(_secrets[documentId][secretHeapObjectId]);
  }
}

chrome.runtime.onMessage.addListener(function () {
  onContentMessage(...arguments);
  return true;
});
