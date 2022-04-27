/* globals require */
console.log("Hello, Airtable");

let selectedGenres = [];

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
}

// just loop through the books and console.log them
function consoleLogManga() {
  console.log("consoleLogManga()");
  mangaList.forEach((manga) => {
    console.log("Manga:", manga);
  });
}

// loop through the books, create an h2 for each one, and add it to the page
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

    // make title of manga show next to cursor on hover
    mangaDiv.title = manga.fields.title;

    // get associated image and display as greyscale background image
    mangaDiv.style.backgroundImage = "url(\""+manga.fields.cover+"\")";
    mangaDiv.style.filter = "grayscale(100%)";

    // adds each class associated with the genre of the series
    let genresString = manga.fields.genres;
    genresString.trim();
    let genreArray = genresString.split("  ");

    // loops through the genre's in the string and add the class associated
    // to the manga div
    genreArray.forEach((genre) => {
      genre = genre.replaceAll(" ", "");
      mangaDiv.classList.add(genre);
    });

    yearDiv.appendChild(mangaDiv);
  });
  console.log("mangashown");
}

// checks whether a manga series contains all of the genres that are being selected
// referenced the first example from here
// https://www.designcise.com/web/tutorial/how-to-check-if-an-array-contains-all-elements-of-another-array-in-javascript
function filterObjects(items) {
  console.log("filter");
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
    if (genreIncluded) {
      manga.classList.add("selected");
    }
    else {
      manga.classList.remove("selected");
    }
  });
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
  console.log(selectedGenres);
}