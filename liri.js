// write the code i need. to grab data from keys.js
// then store keys in a variable
var request = require('request');
var keys = require('./keys.js');
var Twitter = require('twitter');
var twitterKeys = keys.twitterKeys;
var Spotify = require('node-spotify-api');
var spotifyKeys = keys.spotifyKeys;
//console.log(spotifyKeys)
var spotify = new Spotify(spotifyKeys);
var fs = require('fs');
var client = new Twitter(twitterKeys);
var command = process.argv[2];






var userInput = process.argv[2]


if (userInput === 'spotify-this-song'){
  console.log('spoify-logic')

var songTitle = process.argv[3]
}
else if (userInput === 'my-tweets'){

var params = {screen_name: 'fancyPants_2016'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    /*console.log(tweets[0].text)*/
  for(var i = 0; i < tweets.length; i ++ ){
  console.log(tweets[i].text)
  }



  }
});
}
