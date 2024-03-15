let lurnifiedData = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case "fetchDataFromAPI":
      fetchDataFromAPI(sendResponse); // Pass `sendResponse` as a callback
      return true; // Indicates an asynchronous response
    case "sendDataToWebApp":
      sendDataToWebApp(message.url, sendResponse); // Pass `sendResponse` as a callback
      return true; // Indicates an asynchronous response
    // Handle other cases as needed
  }
});

async function fetchDataFromAPI(sendResponse) {
  try {
    // Replace this with the actual API URL and the necessary parameters
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    const currentUrl = tab.url;

    const response = await fetch(
      "https://golden-novel-duck.ngrok-free.app/fetch",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: currentUrl,
        }),
      }
    );

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    lurnifiedData = data; // Store the data for later use
    const json_summary_content = JSON.parse(data.summary_content[0]);
    console.log("json_summary_content", json_summary_content);
    const title = json_summary_content.title;
    sendResponse({ status: "success", title }); // Notify about success
  } catch (error) {
    console.error("Error fetching data:", error);
    sendResponse({ status: "error", error }); // Notify about error
  }
}

async function sendDataToWebApp(url, sendResponse) {
  try {
    let lurnyTab = (await chrome.tabs.query({})).find(
      (tab) => tab.url && new URL(tab.url).origin === new URL(url).origin
    );

    const createOrActivateTab = async () => {
      if (!lurnyTab) {
        lurnyTab = await chrome.tabs.create({ url });
      } else {
        await chrome.tabs.update(lurnyTab.id, { active: true, url });
      }
    };

    await createOrActivateTab();

    // Function to send a message to the tab when it's ready
    const sendMessageWhenReady = async (tabId, changeInfo) => {
      if (tabId === lurnyTab.id && changeInfo.status === "complete") {
        chrome.tabs.onUpdated.removeListener(sendMessageWhenReady);
        await chrome.tabs.sendMessage(lurnyTab.id, {
          action: "sendData",
          data: lurnifiedData,
        });

        sendResponse({ status: "success" });
      }
    };

    // Listen for when the tab is updated to "complete"
    chrome.tabs.onUpdated.addListener(sendMessageWhenReady);

    // If the tab was just created, it might still be loading, so check the status.
    if (lurnyTab.status !== "complete") {
      // The tab is still loading; listener will handle sending the message.
    } else {
      // Tab is already complete; send the message now.
      await chrome.tabs.sendMessage(lurnyTab.id, {
        action: "sendData",
        data: lurnifiedData,
      });
      sendResponse({ status: "success" });
    }
  } catch (error) {
    console.error("Error sending data to web app:", error);
    sendResponse({ status: "error", error }); // Notify about error
  }
}

// Rest of your popup.js logic remains unchanged
