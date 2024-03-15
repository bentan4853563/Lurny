chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("Message received in content script:", message);
  if (message.action === "sendData") {
    // Relay the message to the webpage
    window.postMessage(
      {
        type: "FROM_EXTENSION",
        text: "Here is the data",
        data: message.data,
      },
      "*"
    );
  }
});
