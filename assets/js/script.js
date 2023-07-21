
var omdbAPIKEY = "5cd920da";
var nyTimesAPIKEY = "87EYTdm08vUVn8TB0BDTRVYiMy15YpUs";


var formEl = document.getElementById('form-input')

formEl.addEventListener('submit', function(event) {
    event.preventDefault();

    getMovieDetails();
    getReviewDetails();
  })


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

