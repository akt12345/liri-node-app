var keys = require('./keys.js');
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");


var twitterClient = new twitter(keys.twitterKeys);
var spotifyClient = new spotify(keys.spotifyKeys);
var command = process.argv[2];


if (command === "my-tweets") {
    myTweets();
} else if (command === "spotify-this-song") {
    var songQuery = process.argv[3];
    if (songQuery) {
        for (var i = 4; i < process.argv.length; i++) {
            songQuery = songQuery + " " + process.argv[i];
        }
    } else if (!songQuery) {
        songQuery = "We're Ready";

    }
    spotifyInfo(songQuery);
} else if (command === "movie-this") {
    var movieQuery = process.argv[3];

    if (movieQuery) {
        for (var i = 4; i < process.argv.length; i++) {
            movieQuery = movieQuery + "+" + process.argv[i];
        }
    } else {
        movieQuery = "Braveheart";
        console.log("If you haven't watched 'Braveheart,' then you should: http://www.imdb.com/title/tt0112573/");
        console.log("It's on Netflix!");
    }

    getMovieInfo(movieQuery);
} else if (command === "do-what-it-says") {
    doWhatItSays();
}


//my-tweets (working)
function myTweets() {
    var screenName = "fancyPants_2016";

    console.log("Latest & Greatest Tweets from the Fabulous" + screenName);
    console.log("✪✪✪✪✪✪✪✪✪✪✪");

    var params = { screen_name: screenName };

    twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text + " at " + tweets[i].created_at);
                console.log("✪✪✪✪✪✪✪✪✪✪✪");
            }

        }
    });
}

//spotify-this-song (working)
function spotifyInfo(userQuery) {

    console.log("Song Info: " + userQuery);
    console.log("✪✪✪✪✪✪✪✪✪✪✪");

    spotifyClient.search({ type: 'track', query: userQuery }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }


        for (var i = 0; i < data.tracks.items.length; i++) {
            if (userQuery === data.tracks.items[i].name) {
                console.log("Artist: " + data.tracks.items[i].artists[0].name);
                console.log("Song title: " + data.tracks.items[i].name);
                console.log("Album: " + data.tracks.items[i].album.name);
                if (data.tracks.items[i].preview_url != null) {
                    console.log("Preview Link: " + data.tracks.items[i].preview_url);
                } else {
                    console.log("Sorry, no preview is available.")
                }
                console.log("✪✪✪✪✪✪✪✪✪✪✪");

            }

        }
    });
}

//movie-this (working)
function getMovieInfo(userQuery) {

    request("http://www.omdbapi.com/?t=" + userQuery + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Production Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("✪✪✪✪✪✪✪✪✪✪✪");


        }
    });
}

//do-what-it-says
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
            if (error) {
                return console.log(error);
            }
            dataArray = data.split(",");
            var doWhatItSaysCommand = dataArray[0];
            var doWhatItSaysQuery = dataArray[1];
            if (doWhatItSaysCommand === "my-tweets") {
                myTweets();
            } else if (doWhatItSaysCommand === "spotify-this-song") {
                spotifyInfo(doWhatItSaysQuery);

            } else if (doWhatItSaysCommand === "movie-this") {
                getMovieInfo(doWhatItSaysQuery);

            }

    });

    }
