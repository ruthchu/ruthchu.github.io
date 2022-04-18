let data = [
  {name: "Pokemon Adventures", genres: "Action  Adventure  Comedy  Fantasy  Shounen"},
  {name: "Naruto", genres: "Action  Adventure  Comedy  Drama  Fantasy  Shounen"},
  {name: "Rurouni Kenshin", genres: "Action  Comedy  Drama  Historical  Martial Arts  Romance  Shounen"},
  {name: "Skip Beat", genres: "Comedy  Drama  Romance  Slice of Life  Shoujo"},
  {name: "One Piece", genres: "Action  Adventure  Comedy  Drama  Fantasy  Shounen"},
  {name: "Death Note", genres: "Drama  Mystery  Psychological  Supernatural  Tragedy  Shounen"},
  {name: "Fruits Basket", genres: "Comedy  Drama  Romance  School Life  Supernatural  Shoujo"},
];

let genreCount = [
  {genre: "Action", count: 0},
  {genre: "Adventure", count: 0},
  {genre: "Comedy", count: 0},
  {genre: "Drama", count: 0},
  {genre: "Historical", count: 0},
  {genre: "Martial Arts", count: 0},
  {genre: "Romance", count: 0},
  {genre: "Slice of Life", count: 0},
  {genre: "Shoujo", count: 0},
  {genre: "Mystery", count: 0},
  {genre: "Psychological", count: 0},
  {genre: "Supernatural", count: 0},
  {genre: "Tragedy", count: 0},
  {genre: "School Life", count: 0},
  {genre: "Fantasy", count: 0},
  {genre: "Shounen", count: 0},
];

let seriesCount = data.length;
let actionCount = 0;
let adventureCount = 0;
let comedyCount = 0;
let dramaCount = 0;
let historicalCount = 0;
let martialArtsCount = 0;
let romanceCount = 0;
let sliceOfLifeCount = 0;
let shoujoCount = 0;
let mysteryCount = 0;
let psychologicalCount = 0;
let supernaturalCount = 0;
let tragedyCount = 0;
let schoolLifeCount = 0;
let fantasyCount = 0;
let shounenCount = 0;


let container = document.querySelector(".container");
let i = 0;

// Iterates through the array of genres of a title, and updates the count for
// how many series have that specific genre.
function count(manga) {
  let genreArray = manga.genres.split("  ");
  genreArray.forEach(genre => 
    {
      if (genre === "Action") {
        genreCount[0].count += 1;
      }
      if (genre === "Adventure") {
        genreCount[1].count += 1;
      }
      if (genre === "Comedy") {
        genreCount[2].count += 1;
      }
      if (genre === "Drama") {
        genreCount[3].count += 1;
      }
      if (genre === "Historical") {
        genreCount[4].count += 1;
      }
      if (genre === "Martial Arts") {
        genreCount[5].count += 1;
      }
      if (genre === "Romance") {
        genreCount[6].count += 1;
      }
      if (genre === "Slice of Life") {
        genreCount[7].count += 1;
      }
      if (genre === "Shoujo") {
        genreCount[8].count += 1;
      }
      if (genre === "Mystery") {
        genreCount[9].count += 1;
      }
      if (genre === "Psychological") {
        genreCount[10].count += 1;
      }
      if (genre === "Supernatural") {
        genreCount[11].count += 1;
      }
      if (genre === "Tragedy") {
        genreCount[12].count += 1;
      }
      if (genre === "School Life") {
        genreCount[13].count += 1;
      }
      if (genre === "Fantasy") {
        genreCount[14].count += 1;
      }
      if (genre === "Shounen") {
        genreCount[15].count += 1;
      }
    }
  )
}


// Loops through each series and counts how many belong to each genre
data.forEach(count);

// Makes the divs for each genre, and scales the width, font-size, and color according to the count
function makeGenreDiv(genreObj) {
  let newItem = document.createElement("div");
  let genreDiv = container.appendChild(newItem);
  newItem.classList.add("genre");
  genreDiv.innerHTML = genreObj.genre;
  let genrePercent = genreObj.count / seriesCount;

  // Makes div wider the higher the genre count is 
  genreDiv.style.width = Math.floor(genrePercent * 100) + "%";

  // Makes font larger the higher the genre count is
  genreDiv.style.fontSize = 12 + genrePercent * 40 + "pt";
  
  // Makes color more yellow the higher the genre count is
  let redBurn = 255 * genrePercent;
  let blueBurn = 195 * (1- genrePercent);
  genreDiv.style.backgroundColor = "rgb(" + redBurn + ", 161, " + blueBurn + ")";

  // Pushes the div a random amount to the left, scaled so that the div is always
  // somewhat centered on the screen
  genreDiv.style.marginLeft = Math.random() * (1 - genrePercent) * 100 + "%";
}

// shuffles array for more visual iterest
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

shuffle(genreCount);
// Loops through each genre and makes the div for it
genreCount.forEach(makeGenreDiv);