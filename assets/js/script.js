//VARIABLES STORING THE API KEYS
var omdbAPIKEY = "5cd920da";
var nyTimesAPIKEY = "87EYTdm08vUVn8TB0BDTRVYiMy15YpUs";


//VARIABLE STORING THE FORM INPUT ELEMENT
var formEl = document.getElementById('form-input')

//EVENT-LISTENER ON FORM ELEMENT
formEl.addEventListener('submit', function(event) {
    event.preventDefault();
//CALL THE FUNCTIONS ON SUBMIT OF FORM ELEMENT
    getMovieDetails();
  })

//GET RESPONSE FROM OMDB-API FOR MOVIE DETAILS IN AN ARRAY
   function getMovieDetails() {
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
          // Populate the movie details in the HTML
          document.getElementById('movieTitle').innerText = data.Title || "N/A";
          document.getElementById('movieYear').innerText = data.Year || "N/A";
          document.getElementById('movieGenre').innerText = data.Genre || "N/A";
          document.getElementById('movieDescription').innerText = data.Plot || "N/A";
           
          // Fetch reviews for the movie
           return getReviewDetails(movieTitle);
        })
        .then(function (review) {
          // Populate the review details in the HTML
          document.getElementById('reviewTitle').innerText = review.display_title || "N/A";
          document.getElementById('reviewAuthor').innerText = review.byline || "N/A";
          document.getElementById('reviewSummary').innerText = review.summary_short || "N/A";
          document.getElementById('reviewLink').href = review.link.url || "";
      })
        .catch(function (error) {
          console.error("Error fetching movie details: ", error);
      });
}

//GET RESPONSE FROM NY-TIMES-API FOR MOVIE REVIEW DETAILS IN AN ARRAY
function getReviewDetails(movieTitle) {
  var nyTimesQueryUrl = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=" + movieTitle + "&api-key=" + nyTimesAPIKEY;

  return fetch(nyTimesQueryUrl)
      .then(function (response) {
          if (!response.ok) {
              throw response.json();
          }
          return response.json();
      })
      .then(function (data) {
          // Assuming the first review is the most relevant one
          return data.results[0] || {};
      })
      .catch(function (error) {
          console.error("Error fetching review data: ", error);
          return {}; // Return an empty object if there's an error to avoid further issues.
      });
}

