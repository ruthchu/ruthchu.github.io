let pickups = [
  {name: "messages", amount: 16},
  {name: "discord", amount: 7},
  {name: "safari", amount: 6},
  {name: "messenger", amount: 6},
  {name: "gmail", amount: 4},
  {name: "colorfulstage", amount: 3},
  {name: "instagram", amount: 2},
  {name: "facebook", amount: 2},
  {name: "camera", amount: 1},
  {name: "canvas", amount: 1},
  {name: "webtoon", amount: 1},
  {name: "opera", amount: 1},
  ];


// First show all the flowers and create divs for each of them
let container = document.querySelector(".phone");
// create a counter variable that will give us each flowers number in the array
let i = 0;

function animateApps(app) {
  // creates a new div; appends that div to the container
  let newItem = document.createElement("div");
  let appDiv = container.appendChild(newItem);
  // increase the counter variable by one
  i++;
  // adds a shared class to each new div
  newItem.classList.add("app");
  // adds a specific class to each new div
  // places the flower name and amount to the div
  appDiv.innerHTML = app.name + " – " + app.amount;
  // sets height of flower to the amount. try changing height to width, or padding
  let seconds = app.amount + "s";
  appDiv.style.animation = "jump " + (10/app.amount) + "s" + " infinite";
  let whiteColor = 255/(app.amount + 1);
  appDiv.style.backgroundColor = "rgb(" + whiteColor + ", " + whiteColor + "," + whiteColor + ")";
  console.log(appDiv.style.backgroundColor);
}

// loops through the flowers and runs the displayFlowers function for each one
pickups.forEach(animateApps);