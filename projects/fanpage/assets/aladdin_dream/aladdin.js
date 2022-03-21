let audio = document.querySelector(".setting_audio");
let text = document.querySelectorAll(".setting");
let texts = document.querySelectorAll(".setting");
console.log(text);
texts.forEach(function(text) {
    text.addEventListener("onmouseover", audio.play());
})