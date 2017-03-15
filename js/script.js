var me = {
  name: "sampleuser",
  following: ["anotheruser17", "someoneelse23", "example-other-user", "mickey"],
  //feed: feedTweets
};

var feedTweets = [
  {user: "anotheruser17", date: "11/23/16 14:23", tweet: "This is another sample tweet #letsgo #wegotthis"},
  {user: "someoneelse23", date: "11/22/16 12:03", tweet: "Favorite time of day! #blessed"},
  {user: "mickey", date: "11/21/16 00:19", tweet: "Sample sample tweet sample sample sample. These can be up to 140 characters?"},
  {user: "anotheruser17", date: "11/20/16 21:23", tweet: "First tweet! #wootwoot"}
];


// var feedTweetsOther = [
//   {user: "mickey", date: "11/21/16 00:19", tweet: "Sample sample tweet sample sample sample. These can be up to 140 characters?"},
//   {user: "example-other-user", date: "11/20/16 00:19", tweet: "Tweet from example-other-user"}

// ];

// var other = {
//   name: "example-other-user",
//   following: ["mickey"],
//   //feed: feedTweetsOther
// };

$(document).ready(function() {
  // refreshAndPopulateFeed();
  $('#new-tweet').submit(function(event) {
    event.preventDefault();
    postTweet($(event.target).children('textarea').val());
    refreshAndPopulateFeed();
    $(event.target).children('textarea').val("");
  });
});

// Store tweet somewhere
function postTweet(tweet) {
  var newTweet = {
    user: me.name,
    date: new Date().toJSON().slice(0,10),
    tweet: tweet
  };
  feedTweets.unshift(newTweet);
  //feedTweets.unshift(newTweet);
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