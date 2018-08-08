const express = require('express');
const app = express();

// Aim: On GET to the server root, from a static list of movies fetch the latest information from a pretend external API and return the results

app.get('/', function (req, res) {
  
  var fs = require('fs')

  const fullMovieData = []
  let movieData = fs.readFileSync('./data.json')

  movieData.forEach(movie => {
    let fetchedMovie = fetchMovieFromApi(movie);
    fullMovieData.push(fetchedMovie);
  });

  res.send(fullMovieData);

});

app.listen(3000)

function fetchMovieFromApi (movie) {

  fetch('http://my-movie-service.com/' + movie.name)
    .then(res => {
      return res.data;
    });

}
