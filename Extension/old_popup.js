// let timeoutIDs = [];
// const totalPages = 5;
// const fetchDuration = 50000; // Estimated fetch duration of 70 seconds in milliseconds
// const intervalDuration = fetchDuration / totalPages; // Even time duration between page changes
// const states = [
//   "state1",
//   "state2",
//   "state3",
//   "state4",
//   "completeState",
//   "errorState",
// ];

// let lurnifiedData = {};
// const targetUrl = "http://localhost:5173/lurny-list";

// function initialization() {
//   states.forEach((stateId) => {
//     if (stateId !== "state1") {
//       const stateElement = document.getElementById(stateId);
//       if (stateElement) {
//         stateElement.style.display = "none";
//       }
//     }
//   });
// }
// // Function to change the current state of the popup and show the appropriate content
// function changeState(stateNumber) {
//   const previousStateElement = document.getElementById(states[stateNumber - 1]);
//   previousStateElement.style.display = "none";
//   const nextStateElement = document.getElementById(states[stateNumber]);
//   nextStateElement.style.display = "flex";
// }

// function startTimedTransitions() {
//   // Clear any previously set timeouts
//   timeoutIDs.forEach(clearTimeout);
//   timeoutIDs = [];

//   for (let i = 1; i < totalPages - 1; i++) {
//     // Schedule a state change at each interval
//     const id = setTimeout(() => changeState(i), i * intervalDuration);
//     timeoutIDs.push(id); // Save the timeout ID
//   }
// }

// function stopTimedTransitions() {
//   timeoutIDs.forEach(clearTimeout);
//   timeoutIDs = []; // Clear the array of timeout IDs
// }

// function completeFetch() {
//   stopTimedTransitions(); // Stop any ongoing transitions

//   states.forEach((stateId, index) => {
//     const stateElement = document.getElementById(stateId);
//     if (stateElement) {
//       stateElement.style.display = "none";
//     }
//   });
// }

// async function fetchDataFromAPI() {
//   initialization();
//   startTimedTransitions();
//   try {
//     // Your existing fetch code...
//     const [tab] = await chrome.tabs.query({
//       active: true,
//       currentWindow: true,
//     });
//     const currentUrl = tab.url;

//     const response = await fetch("http://localhost:5001/fetch", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         url: currentUrl,
//       }),
//     });

//     const data = await response.json();
//     lurnifiedData = data;
//     // const { summary_content, questions } = data;

//     // const json_summary_content = JSON.parse(summary_content[0]);

//     // const title = json_summary_content.title;
//     // const summary = json_summary_content.summary;
//     // const hash_tags = json_summary_content.hash_tags;

//     // console.log(title, summary, hash_tags);

//     // //title
//     // document.getElementById("title").textContent = title;
//     // const titleElement = document.createElement("h2");
//     // titleElement.style.fontSize = "20px";
//     // titleElement.innerHTML = `<strong>Title: ${title}</strong>`;

//     // //summary
//     // const summaryElement = document.createElement("div");
//     // summaryElement.style.marginTop = "30px";
//     // summaryElement.innerHTML = `<strong style="font-size: 16px; margin-top: 20px">Summary: ${summary.length} key learning takeaways</strong>`;
//     // summary.forEach((item, index) => {
//     //   const p = document.createElement("p");
//     //   p.style.paddingTop = "5px";
//     //   p.textContent = `${index + 1}. ${item}`;
//     //   summaryElement.appendChild(p);
//     // });

//     // //hash tags
//     // const hashTagsElement = document.createElement("div");
//     // hashTagsElement.style.marginTop = "20px";
//     // hashTagsElement.innerHTML =
//     //   '<strong style="font-size: 16px; margin-top: 30px">HASHTAG KEYWORDS:</strong>';
//     // hash_tags.forEach((item, index) => {
//     //   const p = document.createElement("p");
//     //   p.textContent = item;
//     //   hashTagsElement.appendChild(p);
//     // });

//     // // const hashTagsElement = document.createElement("div");
//     // // hashTagsElement.innerHTML =
//     // //   "<strong>HASHTAG KEYWORDS:</strong><br>" + hash_tags.join(", ");

//     // // Create questions container
//     // const questionsContainer = document.createElement("div");
//     // questionsContainer.style.marginTop = "10px";
//     // questionsContainer.innerHTML =
//     //   '<strong style="margin-top: 20px; font-size: 16px">Quiz:</strong>';

//     // questions.forEach((question, index) => {
//     //   const json_obj = JSON.parse(question);

//     //   const questionDiv = document.createElement("div");
//     //   questionDiv.style.paddingTop = "5px";

//     //   const questionTitle = document.createElement("strong");
//     //   questionTitle.textContent = `Question ${index + 1}: `;
//     //   questionDiv.appendChild(questionTitle);
//     //   questionDiv.appendChild(document.createTextNode(json_obj.question));

//     //   const answersDiv = document.createElement("div");
//     //   answersDiv.innerHTML = "<strong>Answers:</strong><br>";

//     //   json_obj.answer.forEach((answer, answer_index) => {
//     //     const p = document.createElement("p");
//     //     p.textContent = `Answer ${answer_index + 1}: ${answer}`;
//     //     answersDiv.appendChild(p);
//     //   });

//     //   questionDiv.appendChild(answersDiv);

//     //   const correctAnswerElem = document.createElement("p");
//     //   correctAnswerElem.innerHTML = `<strong>Correct Answer:</strong> ${json_obj.correctanswer}`;
//     //   questionDiv.appendChild(correctAnswerElem);

//     //   const explanationElem = document.createElement("p");
//     //   explanationElem.innerHTML = `<strong>Explanation:</strong> ${json_obj.explanation}`;
//     //   questionDiv.appendChild(explanationElem);

//     //   questionsContainer.appendChild(questionDiv);
//     // });

//     // // Clear existing solution content
//     // const solution = document.getElementById("solution"); // Assuming 'solution' is the ID of the container where you want to display this information

//     // // Append new solution content
//     // solution.appendChild(titleElement);
//     // solution.appendChild(summaryElement);
//     // solution.appendChild(questionsContainer);
//     // solution.appendChild(hashTagsElement);

//     completeFetch();
//     // document.getElementById("completeState").style.display = "flex";
//   } catch (error) {
//     completeFetch();
//     document.getElementById("errorState").style.display = "flex";

//     console.error("Error:", error);
//     // Handle errors, perhaps by showing an error state or message?
//   }
// }

// function main() {
//   fetchDataFromAPI(); // Immediately start the fetch process and page transitions
// }

// document.addEventListener("DOMContentLoaded", function () {
//   const showSolutionButton = document.getElementById("showSolutionButton");
//   showSolutionButton.addEventListener("click", function () {
//     // document.getElementById("completeState").style.display = "none";
//     // document.getElementById("solution").style.display = "flex";
//     sendDataToWebApp(targetUrl, lurnifiedData);
//   });

//   main(); // Start the main process.
// });

// async function checkForTabAndSendData(url, data) {
//   const tabs = await chrome.tabs.query({});

//   let lurnyTab = tabs.find(
//     (tab) => tab.url && new URL(tab.url).origin === new URL(url).origin
//   );
//   if (lurnyTab) {
//     await chrome.tabs.update(lurnyTab.id, { highlighted: true, active: true });
//   } else {
//     lurnyTab = await chrome.tabs.create({ url });
//   }

//   return new Promise((resolve, reject) => {
//     chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
//       if (tabId === lurnyTab.id && changeInfo.status === "complete") {
//         setTimeout(() => {
//           // Give some time for the content script to load before sending the message
//           chrome.tabs
//             .sendMessage(lurnyTab.id, { action: "sendData", data })
//             .then(() => {
//               chrome.tabs.onUpdated.removeListener(listener);
//               resolve();
//             })
//             .catch(reject);
//         }, 500); // You may need to adjust this delay
//       }
//     });
//   });
// }

// function sendDataToWebApp(url, data) {
//   checkForTabAndSendData(url, data).catch(console.error);
// }
