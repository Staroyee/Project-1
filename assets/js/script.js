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
    getReviewDetails();
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
         console.log(data);
       });  
   }

//GET RESPONSE FROM NY-TIMES-API FOR MOVIE REVIEW DETAILS IN AN ARRAY
  function getReviewDetails() {
    var movieTitle = document.getElementById('searchInput').value;
  
  var nyTimesQueryUrl = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=" + movieTitle + "&api-key=" + nyTimesAPIKEY;
  
   fetch(nyTimesQueryUrl)
       .then(function (response) {
         if (!response.ok) {
           throw response.json();
         }
         return response.json();
       })
      .then(function (data) {
        console.log(data);
      });  
  }

