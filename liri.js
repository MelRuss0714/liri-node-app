require("dotenv").config();
var fs = require("fs");

var keys = require("./keys.js");
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var query = "";
for (var i = 3; i = process.argv.length; i++){
    query = JSON.stringify(process.argv[i]);
}
console.log(query);

function myTweets() {
    //Show the last 20 tweets and when they were created

    var params = {
        screen_name: '@Melinda72911617',
        count: 20
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(error);
        }

        for (var i = 0; i < tweets.length; i++) {
            console.log("Tweet #: " + (i + 1) + " Created on: " + tweets[i].created_at);
            console.log(tweets[i].text);
            console.log("-------------");
        }

    });

};
function spotifySong() {
    //show the artist, song name, preview link of the song, and album for the song at process.argv[3]


    if (query === undefined) {
        query = "The Sign";
    }

    spotify.search({ type: 'track', query: query, limit: 5 }, function (err, data) {
        console.log("I am here.");
        if (err) {
            return console.log('Error occurred in Spotify: ' + err);
        }
        for (var i = 0; i < data.tracks.items.length; i++) {
            console.log("Artist: " + data.tracks.items[i].artists[0].name);
            console.log("Song: " + data.tracks.items[i].name);
            console.log("URL: " + data.tracks.items[i].preview_url);
            console.log("Album: " + data.tracks.items[i].album.name);
            console.log("----------");
        }




    });
    //default to ace of base the sign
};
function movieSearch() {
    /*show the following for the movie at process.argv[3] 
        Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.*/
    //default to Mr.Nobody
    if (query === undefined) {
        query = "Mr.Nobody";
    }
    var request = require("request");

    // Then run a request to the OMDB API with the movie specified
    request("http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Source);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("----------");
        }
    });



};
function doIt() {
    //use the text from the fs node package from random.txt as the command
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data

        var dataArr = data.split(",");

        console.log(dataArr[0]);
        console.log(dataArr[1]);
        console.log(dataArr);

        command = dataArr[0];
        query = dataArr[1];
        options(command, query);

    });
};
function options(command, query) {
    switch (command) {
        case "my-tweets":
            myTweets();
            break;
        case "spotify-this-song":
            spotifySong();
            break;
        case "movie-this":
            movieSearch();
            break;
        case "do-what-it-says":
            doIt();
            break;
        default:
            console.log(" Commands to use: my-tweets, spotify-this-song, movie-this, do-what-it-says");
            break;

    };
}
options(command, query);