let timeoutIDs = [];

const totalPages = 6;
const fetchDuration = 50000; // Estimated fetch duration of 35 seconds in milliseconds
const intervalDuration = fetchDuration / totalPages; // Even time duration between page changes

const states = [
  "state1",
  "state2",
  "state3",
  "state4",
  "completeState", // Assuming there is a matching complete state in the HTML
  "errorState", // Assuming there is a matching error state in the HTML
];

const appUrl = "https://9c08-88-99-162-157.ngrok-free.app/lurny-category";

function initialization() {
  states.forEach((stateId) => {
    const stateElement = document.getElementById(stateId);
    if (stateElement) {
      stateElement.style.display = stateId === "state1" ? "flex" : "none";
    }
  });
}

// Function to change the current state of the popup and show the appropriate content
function changeState(stateNumber) {
  if (stateNumber < states.length - 2) {
    // Exclude the completeState and errorState
    const previousStateElement = document.getElementById(
      states[stateNumber - 1]
    );
    const nextStateElement = document.getElementById(states[stateNumber]);

    if (previousStateElement && nextStateElement) {
      previousStateElement.style.display = "none";
      nextStateElement.style.display = "flex";
    }
  }
}

function startTimedTransitions() {
  // Clear any previously set timeouts
  timeoutIDs.forEach(clearTimeout);
  timeoutIDs = [];

  for (let i = 1; i < totalPages - 2; i++) {
    // Schedule transitions up to the last interactive state
    const id = setTimeout(() => changeState(i), intervalDuration * i);
    timeoutIDs.push(id); // Save the timeout ID
  }
}

function stopTimedTransitions() {
  timeoutIDs.forEach(clearTimeout);
  timeoutIDs = []; // Clear the array of timeout IDs
}

function setStateVisible(stateId) {
  states.forEach((state) => {
    const element = document.getElementById(state);
    if (element) {
      element.style.display = state === stateId ? "flex" : "none";
    }
  });
}

function completeFetch() {
  stopTimedTransitions(); // Stop any ongoing transitions
  setStateVisible("completeState");
}

function showErrorState() {
  stopTimedTransitions(); // Stop any ongoing transitions
  setStateVisible("errorState");
}

document.addEventListener("DOMContentLoaded", () => {
  const showSolutionButton = document.getElementById("showSolutionButton");
  showSolutionButton.addEventListener("click", () => {
    chrome.runtime.sendMessage(
      {
        action: "sendDataToWebApp",
        url: appUrl,
      },
      (response) => {
        if (response.status === "error") {
          console.error("Error sending data to the web app:", response.error);
          showErrorState();
        }
      }
    );
  });

  initialization();
  startTimedTransitions();

  chrome.runtime.sendMessage({ action: "fetchDataFromAPI" }, (response) => {
    if (response.status === "success") {
      completeFetch();
      document.getElementById("title").textContent = response.title;
    } else if (response.status === "error") {
      console.error("Error fetching data:", response.error);
      showErrorState();
    }
  });
});
