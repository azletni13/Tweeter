'use strict';

$(document).ready(() => {

  //calculates time of tweet
  const timeAgo = (tweetTime) => {
    const todayTime = new Date().getTime();
    const timeDiff = todayTime - tweetTime;
    const hoursDiff = timeDiff / (1000 * 3600);
    console.log(hoursDiff);
    if(Math.round(hoursDiff) == 1){
      return `${Math.round(hoursDiff, 0)} hour ago`;
    }else if(hoursDiff < 24){
      return `${Math.round(hoursDiff, 0)} hours ago`;
     } else {
      return `${Math.round(hoursDiff / 24, 0)} days ago`;
    }
  }
  //creates tweet element
  const createTweetElement = (newTweet) => {

    const img = newTweet.user.avatars.small;
    const name = newTweet.user.name;
    const handle = newTweet.user.handle;
    const content = newTweet.content.text;
    const timeStamp = timeAgo(newTweet.created_at);

  const myHTML =
    `<article class="existing-tweets">
      <header>
        <img src=${img}>
        <h2 class="full-name">${name}</h2>
        <span class="handle">${handle}</span>
      </header>
        <p class="tweet-body">${content}</p>
      <footer>
        <span class="time-stamp">${timeStamp}</span>
        <span class="icons">
          <i class="fa fa-flag" aria-hidden="true"></i>
          <i class="fa fa-retweet" aria-hidden="true"></i>
          <i class="fa fa-heart" aria-hidden="true"></i>
        </span>
      </footer>
    </article>`;

    $('#existing-tweets').append(myHTML);
  };
  //creates a tweet element for each tweet held in database
  const renderTweets = (tweets) => {
    //empties page of existing tweets to render all tweets
    $('#existing-tweets').empty();
    // loops through tweets
    tweets.forEach(tweet =>{
      createTweetElement(tweet);
    })
  };

  var $form = $('#tweetForm');
  //submits tweet through AJAX
  $form.submit(function (ev) {
    ev.preventDefault()
    var inputArr = $(this).serializeArray();
    var dataObj = {};
    inputArr.forEach(input => {
      dataObj[input.name] = input.value;
    });
    if(dataObj.text.length === 0) {
      alert("You must enter a Tweet!");
    } else if(dataObj.text.length > 140){
      alert("Your Tweet is too long!");
    } else {
      console.log('Button clicked, performing ajax call...');
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: dataObj,
        success: function (responseTweetJson) {
          // console.log('Success: ', responseTweetJson);
          getTweets();
        }
      });
    }
    //Empties textarea after submit text
    $('#tweet').val('');
    $('.counter').text("140");

  });

  const getTweets = () => {

    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (newTweet) {
        // console.log('Success: ', newTweet);
        renderTweets(newTweet);
      }
    });
  }
  getTweets();

  $(".compose").click(function(){
    $(".new-tweet").slideToggle();
    $("#tweet").focus();
  });

})




