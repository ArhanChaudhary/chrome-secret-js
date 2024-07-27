const DB_NAME = "SecretsDB";
const DB_VERSION = 1;
const OBJECT_STORE_NAME = "secrets";

chrome.runtime.onMessage.addListener(function (
  message,
  { documentId },
  sendResponse
) {
  if (message.type === "set") {
    openDbStore("readwrite").then(async (store) => {
      let event = await new Promise((resolve) => {
        store.get(documentId).onsuccess = resolve;
      });
      let data = event.target.result || { documentId, secrets: {} };

      data.secrets[message.secretId] = message.secret;
      store.put(data).onsuccess = sendResponse;
    });
    return true;
  } else if (message.type === "get") {
    openDbStore("readonly").then(async (store) => {
      let event = await new Promise((resolve) => {
        store.get(documentId).onsuccess = resolve;
      });
      let data = event.target.result;

      sendResponse(data?.secrets[message.secretId]);
    });
    return true;
  }
});

async function openDbStore(mode) {
  let event = await new Promise((resolve) => {
    indexedDB.open(DB_NAME, DB_VERSION).onsuccess = resolve;
  });
  let db = event.target.result;
  let store = db
    .transaction([OBJECT_STORE_NAME], mode)
    .objectStore(OBJECT_STORE_NAME);
  return store;
}
