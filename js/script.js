$(document).ready(function() {
  fetchFollowersFromGithub(iAmGlobal.following[0]);
  //postTweet("ASHAY", "TWEET", new Date().toJSON());
  $('#new-tweet').submit(function(event) {
    event.preventDefault();
    postTweet(iAmGlobal.username,$(event.target).children('textarea').val(), new Date().toJSON());

    // refreshAndPopulateFeed();
    $(event.target).children('textarea').val("");
  });
});


var iAmGlobal = {
  username: "wthompson40",
  following: ["ashays"]
};

// Store tweet somewhere
function postTweet(user, tweet, date) {
  var newTweet = {
    user: user,
    date: date,
    tweet: tweet
  };
  //console.log(newTweet);
  addToFeed(newTweet);
}

function addToFeed(tweet) {
  twitter.add();
  $($('.tweet .tweet-pseudo')[0]).text(tweet.user);
  $($('.tweet .tweet-date')[0]).text(tweet.date);
  $($('.tweet .tweet-message')[0]).text(tweet.tweet);
  twitterMe.save();
}


// fetching data.JSON from github repo particular to each user
function fetchFollowersFromGithub(username) {
  //for(name in username.following) {
    var newTweet = {
      user: "wthompson40",
      date: new Date().toJSON(),
      tweet: tweet
    };
    tweets = []
    followingList = []
    var string = "https://raw.githubusercontent.com/" + username + "/decentralized-twitter/master/data.json";
    $.getJSON(string, function(data) {
      $.each(data, function(key, val) {
        if (key == "following") {
          followingList.push(val);
        } else if (key == "tweet") {
          for (var i = 0; i < val.length; i++) {
            currentTweet = val[i];
            postTweet(currentTweet.user, currentTweet.tweet, currentTweet.date);
            console.log(currentTweet.user +  currentTweet.tweet + currentTweet.date);
          };
        };
        // items.push()
      });

    });
  //};
};




// quick array contains method
Array.prototype.contains = function(obj) {
  var i = this.length;
  while (i--) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
}

// Returns list of tweets from feed who belong to users on "users" parameter and are posted after "dateFrom"
// This is the state (profile & feed) which will be sent from each user to Orbit-db for peer-to-peer connection
function exportFeed(users, dateFrom) {
  var ret = [];
  //Currently going to be very slow, but we can worry about algorithm "quickness" later.
  for (i = 0; i < feedTweets.length; i++) {
    if (users.contains(feedTweets[i].name) && (dateFrom < feedTweets[i].date) ) 
      ret.unshift(feedTweets[i]);
  }
  return ret;
}


//Instead of exporting feed, export State perhaps?  includes profile information about who is sending their feed.
// function exportState(current_user, users, dateFrom) {
//   var ret = [];
//   //Currently going to be very slow, but we can worry about algorithm "quickness" later.
//   for (i = 0; i < feedTweets.length; i++) {
//     if (users.contains(feedTweets[i].name) && (dateFrom < feedTweets[i].date) ) 
//       ret.unshift(feedTweets[i]);
//   }
//   return {name: current_user, feed: ret};
// }

// 
function importFeed(myProfile, tweets) {
}


// DOM Manipulation Functions
var randDate = "11/21/16 00:00";
function refreshAndPopulateFeed() {
  $('.feed').empty(); 
  //Unique entries, won't allow copies of the same tweet to appear in ones feed
  // var mySet = new Set();

  // for (y = 0; y < me.following.length; y++) {
  //   mySet.add(exportFeed(me.following[y], me.following, randDate))
  // }
  for (i = 0; i < feedTweets.length; i++) {
    $('.feed').append('<div class="tweet"><span class="tweet-pseudo">@' + feedTweets[i]['user'] + ' </span><span class="tweet-date">' + feedTweets[i]['date'] + '</span><span class="tweet-message">' + feedTweets[i]['tweet'] + '</span></div>');
  }
}