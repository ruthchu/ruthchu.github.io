let button = document.querySelector(".button");
let buttons = document.querySelectorAll(".button");
let container = document.querySelector(".wrapper");
let instructions = document.querySelector("h1");

function pickReal() {
  let randIndex = Math.floor(Math.random() * buttons.length);
  buttons[randIndex].classList.add("realButton");
  console.log("this the real button " + randIndex);
}

pickReal();

let real = document.querySelector(".realButton");

function realClicked() {
  buttons.forEach(function (button) {
    button.classList.add("green");
    button.innerHTML = "you found it :0";
  });
  instructions.innerHTML = "restart";
  instructions.classList.add("restart");
};

real.addEventListener("click", realClicked);

instructions.addEventListener("click", function (event) {
  if (event.target.classList.contains("restart")) {
    location.reload();
  }
});

container.addEventListener("click", function (event) {
  console.log("clicked");
    if (event.target.classList.contains("button") && !event.target.classList.contains("realButton")) {
      event.target.remove();
    }
  });