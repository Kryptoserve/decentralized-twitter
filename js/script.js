$(document).ready(function() {
  $('#new-tweet').submit(function(event) {
    event.preventDefault();
    postTweet($(event.target).children('textarea').val());
    // refreshAndPopulateFeed();
    $(event.target).children('textarea').val("");
  });
});

// Store tweet somewhere
function postTweet(tweet) {
  var newTweet = {
    user: "ashays",
    date: new Date().toJSON().slice(0,10),
    tweet: tweet
  };
  addToFeed(newTweet);
  // feedTweets.unshift(newTweet);
  //feedTweets.unshift(newTweet);
}

function addToFeed(tweet) {
  // $('.feed').prepend('<div class="tweet" mv-multiple property="feed" mv-order="desc" typeof="Item"><span class="tweet-pseudo">@' + tweet['user'] + ' </span><span class="tweet-date">' + tweet['date'] + '</span><span class="tweet-message">' + tweet['tweet'] + '</span></div>');
  twitter.add();
  $($('.tweet .tweet-pseudo')[0]).text(tweet.user);
  $($('.tweet .tweet-date')[0]).text(tweet.date);
  $($('.tweet .tweet-message')[0]).text(tweet.tweet);
  twitterMe.save();
}




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