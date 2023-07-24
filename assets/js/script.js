//VARIABLES STORING THE API KEYS
var omdbAPIKEY = "5cd920da";
var nyTimesAPIKEY = "87EYTdm08vUVn8TB0BDTRVYiMy15YpUs";


//VARIABLE STORING THE FORM INPUT ELEMENT
var formEl = document.getElementById('form-input');
var infoSection = document.getElementById('info');

//EVENT-LISTENER ON FORM ELEMENT
formEl.addEventListener('submit', function (event) {
  event.preventDefault();
  infoSection.scrollIntoView({ bheaviour: 'smooth'});
  //CALL THE FUNCTIONS ON SUBMIT OF FORM ELEMENT
  getMovieDetails();
  getReviewDetails();
})

//GET RESPONSE FROM OMDB-API FOR MOVIE DETAILS IN AN ARRAY
function getMovieDetails() {
  movieTitle = ""
  var movieTitle = document.getElementById('searchInput').value;
  
  var omdbQueryUrl = "http://www.omdbapi.com/?apikey=" + omdbAPIKEY + "&t=" + movieTitle;

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
        document.getElementById('movieTitle').innerText = data.Title;
        document.getElementById('movieYear').innerText = data.Year;
        document.getElementById('movieGenre').innerText = data.Genre;
        document.getElementById('movieDescription').innerText = data.Plot;
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
  movieTitle = ""
  var movieTitle = document.getElementById('searchInput').value;

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
        document.getElementById('reviewTitle').innerText = data.results[0].display_title;
        document.getElementById('reviewAuthor').innerText = data.results[0].byline;
        document.getElementById('reviewSummary').innerText = data.results[0].summary_short;
        document.getElementById('reviewLink').href = data.results[0].link.url;
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