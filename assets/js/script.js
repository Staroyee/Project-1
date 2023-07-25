//VARIABLES STORING THE API KEYS
var omdbAPIKEY = "5cd920da";
var nyTimesAPIKEY = "87EYTdm08vUVn8TB0BDTRVYiMy15YpUs";


//VARIABLE STORING THE FORM INPUT ELEMENT
var formEl = document.getElementById('form-input');
var infoSection = document.getElementById('info');

//EVENT-LISTENER ON FORM ELEMENT
formEl.addEventListener('submit', function (event) {
  event.preventDefault();
  infoSection.scrollIntoView({ behavior: 'smooth'});
  
  //CALL THE FUNCTIONS ON SUBMIT OF FORM ELEMENT
  getMovieDetails();
  getReviewDetails();
})

//GET RESPONSE FROM OMDB-API FOR MOVIE DETAILS IN AN ARRAY
var movieTitle = "";
$("#searchInput").change(function() {
  movieTitle = $(this).val();
  console.log(movieTitle)
});

function getMovieDetails(movie) {
    
  var omdbQueryUrl = "http://www.omdbapi.com/?apikey=" + omdbAPIKEY + "&t=" + movieTitle;
console.log(omdbQueryUrl);
  fetch(omdbQueryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (data) {
      if (movieTitle) {
        // POPULATE THE MOVIE DETAILS INTO THE HTML ELEMENTS
        document.getElementById('movieTitle').innerText = data.Title || "N/A";
        document.getElementById('movieYear').innerText = data.Year || "N/A";
        document.getElementById('movieGenre').innerText = data.Genre || "N/A";
        document.getElementById('movieDescription').innerText = data.Plot || "N/A";
      } else if (movieTitle === "") {
        document.getElementById('movieTitle').innerText = "N/A";
        document.getElementById('movieYear').innerText = "N/A";
        document.getElementById('movieGenre').innerText = "N/A";
        document.getElementById('movieDescription').innerText = "N/A";
      }
    })
    .catch(function (error) {
      console.error("Error fetching movie details: ", error);
      return {};
    });
}

//GET RESPONSE FROM NY-TIMES-API FOR MOVIE REVIEW DETAILS IN AN ARRAY

function getReviewDetails() {

  var nyTimesQueryUrl = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=" + movieTitle + "&api-key=" + nyTimesAPIKEY;

  return fetch(nyTimesQueryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (movieTitle) {
        // POPULATE THE REVIEW DETAILS INTO THE HTML ELEMENTS
        document.getElementById('reviewTitle').innerText = data.results[0].display_title || "N/A";
        document.getElementById('reviewAuthor').innerText = data.results[0].byline || "N/A";
        document.getElementById('reviewSummary').innerText = data.results[0].summary_short || "N/A";
        document.getElementById('reviewLink').href = data.results[0].link.url || "N/A";
      } else if (movieTitle === "") {
        document.getElementById('reviewTitle').innerText = "N/A";
        document.getElementById('reviewAuthor').innerText = "N/A";
        document.getElementById('reviewSummary').innerText = "N/A";
        document.getElementById('reviewLink').href = "N/A";
      }
    })
    .catch(function (error) {
      console.error("Error fetching review data: ", error);
      return {}; // RETURN AN EMPTY OBJECT IF THERE IS AN ERROR TO AVOID FURTHER
    });
};

//EVENT-LISTENER FOR SAVE BUTTON
var saveButton = document.getElementById('favouritesButton');
saveButton.addEventListener('click', function() {
  var movieTitle = document.getElementById('movieTitle').innerText;
  saveToFavourites(movieTitle);
});

//SAVE MOVIE TITLE TO favourites IN LOCAL STORAGE
function saveToFavourites(movieTitle) {
  // Get existing favourites from local storage or display an empty array
  var favourites = JSON.parse(localStorage.getItem('favourites')) || [];

  // Check if the movie title is already in favourites
  if (!favourites.includes(movieTitle)) {
    favourites.push(movieTitle);
    // Save updated favourites array back to local storage
    localStorage.setItem ('favourites', JSON.stringify(favourites));
    alert("Movie saved to favourites!");
    displayFavourites();
  } else {
      alert("Movie is already in favourites")
  }
}

// DISPLAY FAVOURITES ON THE HTML PAGE
function displayFavourites() {
  var favourites = JSON.parse(localStorage.getItem('favourites')) || [];
  var favouritesContainer = document.getElementById('favouritesContainer');
  favouritesContainer.innerHTML = ''; // Clear previous favourites

  if (favourites.length === 0) {
    var noFavouritesMessage = document.createElement('h5');
    noFavouritesMessage.innerText = 'No favourites saved yet.';
    noFavouritesMessage.setAttribute('class', 'noFavourites');
    favouritesContainer.appendChild(noFavouritesMessage);
  } else {
    favourites.forEach(function (favourite) {
      var favouriteElement = document.createElement('div');
      favouriteElement.setAttribute('class', 'favouriteItem');

      var movieTitleElement = document.createElement('button');
      movieTitleElement.setAttribute('class', 'movieBtn');
      movieTitleElement.innerText = favourite;
      favouriteElement.appendChild(movieTitleElement);

      var removeButton = document.createElement('button');
      removeButton.setAttribute('class', 'removeBtn');
      removeButton.innerText = 'x';
      favouriteElement.appendChild(removeButton);

      favouritesContainer.appendChild(favouriteElement);
    });
  }

  // Add event delegation for the .movieBtn click event
  favouritesContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('movieBtn')) {
      movieTitle = event.target.innerText;
      getMovieDetails();
      getReviewDetails();
    } else if (event.target.classList.contains('removeBtn')) {
      var movieToRemove = event.target.parentElement.querySelector('.movieBtn').innerText;
      removeFavourite(movieToRemove);
    }
  });
}

// ADDITIONAL FUNCTION TO REMOVE A MOVIE FROM FAVOURITES
function removeFavourite(movieTitle) {
  var favourites = JSON.parse(localStorage.getItem('favourites')) || [];
  var updatedFavourites = favourites.filter(function (favourite) {
    return favourite !== movieTitle;
  });

  localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  displayFavourites(); // Refresh the display after removal
}

// EVENT-LISTENER FOR REMOVE BUTTON
var favouritesContainer = document.getElementById('favouritesContainer');
favouritesContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('removeBtn')) {
    var movieTitleToRemove = event.target.parentElement.querySelector('.movieBtn').innerText;
    removeFavourite(movieTitleToRemove);
  }
});

// Displays favourites on page load
displayFavourites();