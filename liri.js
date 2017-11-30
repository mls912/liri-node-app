var keys = require('./keys.js');

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var request = require('request');

var fs = require("fs");



var getTweets = function() {

    var client = new Twitter(keys.twitterKeys);

    var params = {screen_name: 'matt_and_amy'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        // console.log(tweets);
        for(var i = 0; i < tweets.length; i++) {
          console.log(tweets[i].created_at);
          console.log(tweets[i].text);
          console.log("---------------");
        }
      }
    });
  }



var getArtistName = function(artist) {
  return artist.name;
}


var getMySpotify = function(userSong) {

  var userSong;
  if (process.argv[3] === undefined || process.argv[3]=== " "){
             userSong = "The Sign";
         } else{
                 userSong = process.argv[3] 
             }


      var getSpotifyKeys = keys.spotifyKeys;
      var spotify = new Spotify(getSpotifyKeys);
  
      spotify.search({ type: 'track', query: userSong }, function(err, data) {
        if (err) {
          console.log('Error occurred: ' + err);
          return;
        }
        var songs = data.tracks.items;
        for (i = 0; i < songs.length; i++) {
          console.log(i);
          console.log('Artist(s): ' + songs[i].artists.map(getArtistName));
          console.log("Song Name: " + songs[i].name);
          console.log("Preview Song: " + songs[i].preview_url);
          console.log("Album: " + songs[i].album.name);
          console.log('--------------------------');
        }
    });
  }
     

var getMyMovie = function(movieName) {

  var movieName;
  if (process.argv[3] === undefined || process.argv[3]=== " "){
             movieName = "Mr. Nobody";
         } else{
                 userSong = process.argv[3] 
             }
  
  request('http://www.omdbapi.com/?apikey=trilogy&t=' + movieName, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var movieData = JSON.parse(body);
      console.log("Title: " + movieData.Title);
      console.log("Year: " + movieData.Year);
      console.log("IMDB Rating: " + movieData.imdbRating);
      console.log("Rotten Tomatoes Rating: " + movieData.Ratings[1].Value);
      console.log("Country: " + movieData.Country);
      console.log("Language: " + movieData.Language);
      console.log("Plot: " + movieData.Plot);
      console.log("Actors: " + movieData.Actors);
    }
  });
}

var doWhatItSays = function() {
  fs.readFile('random.txt', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }

    // console.log(data);

    var dataArr = data.split(",");
  
    // console.log(dataArr);
    var getSpotifyKeys = keys.spotifyKeys;
    var spotify = new Spotify(getSpotifyKeys);

    spotify.search({ type: 'track', query: dataArr[1] }, function(err, data) {
      if (err) {
        console.log('Error occurred: ' + err);
        return;
      }
      var songs = data.tracks.items;
      for (i = 0; i < songs.length; i++) {
        console.log(i);
        console.log('Artist(s): ' + songs[i].artists.map(getArtistName));
        console.log("Song Name: " + songs[i].name);
        console.log("Preview Song: " + songs[i].preview_url);
        console.log("Album: " + songs[i].album.name);
        console.log('--------------------------');
      }
  });
  
  });
}


  var findInput = function(caseData, functionData) {
    switch(caseData) {
      case 'my-tweets' :
          getTweets();
          break;
      case 'spotify-this-song' :
          getMySpotify(functionData);
          break;
      case 'movie-this' :
          getMyMovie(functionData);
          break;
      case 'do-what-it-says' :
          doWhatItSays();      
          break;
      default:
        console.log("LIRI does not know that")
    }
  }


var runThis = function(argOne, argTwo){
    findInput(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);