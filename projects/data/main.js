/* globals require */
console.log("Hello, Airtable");

let selectedGenres = [];
let genreArray = new Array(23).fill(0);

// load the airtable library, call it "Airtable"
let Airtable = require("airtable");
console.log(Airtable);

// use the airtable library, connect to our base using API key
let base = new Airtable({ apiKey: "keyVLtMm22ZguuYu4" }).base(
  "appw9wvOCemC6P7uh"
);

//get the "books" table from the base, select ALL the records, and specify the functions that will receive the data
base("mangadata").select({}).eachPage(gotPageOfManga, gotAllManga);

// an empty array to hold our book data
let mangaList = [];

// callback function that receives our data
function gotPageOfManga(records, fetchNextPage) {
  console.log("gotPageOfManga()");
  // add the records from this page to our books array
  mangaList.push(...records);
  // request more pages
  fetchNextPage();
}

// call back function that is called when all pages are loaded
function gotAllManga(err) {
  console.log("gotAllManga()");

  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading mangadata");
    console.error(err);
    return;
  }

  // call functions to log and show the books
  //consoleLogManga();
  //showManga();
  addMangaToYearDiv();
  addCountToGenreDiv();
  setYearDivZIndex();
}

// just loop through the books and console.log them
function consoleLogManga() {
  console.log("consoleLogManga()");
  mangaList.forEach((manga) => {
    console.log("Manga:", manga);
  });
}

// loop through the books, make a div for each and add it to the proper year
// also make a span that displays info on hover
function addMangaToYearDiv() {
  console.log("addMangaToYearDiv()");
  mangaList.forEach((manga) => {
    
    // find the div that corresponds to the year the manga belongs to
    let mangaYear = manga.fields.year;
    let yearDivName = ".year" + mangaYear;
    let yearDiv = document.querySelector(yearDivName);

    // create a div for each manga
    let mangaDiv = document.createElement("div");
    mangaDiv.classList.add("entry");
    mangaDiv.classList.add("tooltip");
    let mangaSpan = document.createElement("span");
    mangaSpan.classList.add("tooltiptext");

    // get associated image and display as greyscale background image
    mangaDiv.style.backgroundImage = "url(\""+manga.fields.cover+"\")";
    mangaDiv.style.filter = "grayscale(100%)";

    let mangaImg = document.createElement("img");
    mangaImg.src = manga.fields.cover;
    mangaImg.style.height = "300px";
    mangaSpan.appendChild(mangaImg);
    let mangaTitle = document.createElement("h2");
    mangaTitle.innerHTML += manga.fields.title;
    mangaSpan.appendChild(mangaTitle);
    mangaSpan.innerHTML += manga.fields.comment;

    // adds each class associated with the genre of the series
    let genresString = manga.fields.genres;
    genresString.trim();
    let genreArray = genresString.split("  ");

    // loops through the genre's in the string and add the class associated
    // to the manga div
    genreArray.forEach((genre) => {
      genre = genre.replaceAll(" ", "");
      mangaDiv.classList.add(genre);
      countGenre(genre);
    });
    mangaDiv.appendChild(mangaSpan);
    yearDiv.appendChild(mangaDiv);
  });
  console.log("mangashown");
}

function addCountToGenreDiv() {
  for (let i = 0; i < genreArray.length; i++) {
    let divNum = "nav" + (i + 1);
    let currDiv = document.querySelector("." + divNum);
    currDiv.innerHTML += " (" + genreArray[i] + ")";
  }
}

// function to count the number of series that belong to each genre
function countGenre(genre) {
  if (genre === "Action") {
    genreArray[0] += 1;
  }
  if (genre === "Adventure") {
    genreArray[1] += 1;
  }
  if (genre === "Comedy") {
    genreArray[2] += 1;
  }
  if (genre === "Drama") {
    genreArray[3] += 1;
  }
  if (genre === "Fantasy") {
    genreArray[4] += 1;
  }
  if (genre === "GenderBender") {
    genreArray[5] += 1;
  }
  if (genre === "Historical") {
    genreArray[6] += 1;
  }
  if (genre === "Horror") {
    genreArray[7] += 1;
  }
  if (genre === "Josei") {
    genreArray[8] += 1;
  }
  if (genre === "MartialArts") {
    genreArray[9] += 1;
  }
  if (genre === "Mature") {
    genreArray[10] += 1;
  }
  if (genre === "Mystery") {
    genreArray[11] += 1;
  }
  if (genre === "Psychological") {
    genreArray[12] += 1;
  }
  if (genre === "Romance") {
    genreArray[13] += 1;
  }
  if (genre === "SchoolLife") {
    genreArray[14] += 1;
  }
  if (genre === "Sci-fi") {
    genreArray[15] += 1;
  }
  if (genre === "Seinen") {
    genreArray[16] += 1;
  }
  if (genre === "Shoujo") {
    genreArray[17] += 1;
  }
  if (genre === "Shounen") {
    genreArray[18] += 1;
  }
  if (genre === "SliceofLife") {
    genreArray[19] += 1;
  }
  if (genre === "Sports") {
    genreArray[20] += 1;
  }
  if (genre === "Supernatural") {
    genreArray[21] += 1;
  }
  if (genre === "Tragedy") {
    genreArray[22] += 1;
  }
}

// checks whether a manga series contains all of the genres that are being selected
// referenced the first example from here
// https://www.designcise.com/web/tutorial/how-to-check-if-an-array-contains-all-elements-of-another-array-in-javascript
function filterObjects(items) {
  console.log("filter");
  let count = 0;
  let mangaList = document.querySelectorAll(".entry");
  mangaList.forEach((manga) => {
    let genreIncluded = true;
    if (items.length == 0) {
      genreIncluded = false;
    }
    else {
      items.forEach((genre) => {
        if (!manga.classList.contains(genre)) {
          genreIncluded = false;
        }
      });
    }
    let hoverSpan = manga.firstChild.firstChild;
    if (genreIncluded) {
      hoverSpan.style.height = "350px";
      manga.classList.add("selected");
      count++;
    }
    else {
      hoverSpan.style.height = "300px";
      manga.classList.remove("selected");
    }
  });
  updateSelectedCount(count);
}

function addRemoveClass(elem, className) {
  if (selectedGenres.includes(className)) {
    let index = selectedGenres.indexOf(className);
    if (index > -1) {
      selectedGenres.splice(index, 1); // 2nd parameter means remove one item only
      elem.classList.remove("clicked");
    }
  }
  else {
    selectedGenres.push(className);
    elem.classList.add("clicked");
  }
  filterObjects(selectedGenres);
}

function updateSelectedCount(count) {
  let selectedDiv = document.querySelector(".currSelect");
  selectedDiv.innerHTML = "selected: " + count;
}

function setYearDivZIndex() {
  let zindex = 0;
  for (let i = 2022; i >= 2013; i--) {
    let selectYear = document.querySelector(".year" + i);
    selectYear.style.zIndex = zindex;
    zindex++;
    console.log(i);
  }
}