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
      let data = await new Promise((resolve) => {
        store.get(documentId).onsuccess = (e) =>
          resolve(e.target.result || { documentId, secrets: {} });
      });

      data.secrets[message.secretId] = message.secret;
      store.put(data).onsuccess = sendResponse;
    });
    return true;
  } else if (message.type === "get") {
    openDbStore("readonly").then(async (store) => {
      let data = await new Promise((resolve) => {
        store.get(documentId).onsuccess = (e) => resolve(e.target.result);
      });

      sendResponse(data?.secrets[message.secretId]);
    });
    return true;
  }
});

async function openDbStore(mode) {
  let request = indexedDB.open(DB_NAME, DB_VERSION);
  request.onupgradeneeded = function (e) {
    let db = e.target.result;
    db.createObjectStore(OBJECT_STORE_NAME, { keyPath: "documentId" });
  };
  let db = await new Promise((resolve) => {
    request.onsuccess = (e) => resolve(e.target.result);
  });
  let store = db
    .transaction(OBJECT_STORE_NAME, mode)
    .objectStore(OBJECT_STORE_NAME);
  return store;
}
