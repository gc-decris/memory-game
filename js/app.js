// ******STAR RATING FEATURE******
// The game displays a star rating (from 1- 3) that reflects the player's performance. At the beginning of a game, it should display 3 stars. After some number of moves, it should change to a 2 star rating. After a few more moves, it should change to a 1 star rating.

// The number of moves needed to change the rating is up to you, but it should happen at some point

// ******TIMER FEATURE*******
// When the player starts a game, a timer should also start.Once the player wins the game, the timer stops.

// ******CHANGES REQUIRED ON THE CONGRATS ALERT******
// When a user wins the game, a modal appears to congratulate the player and ask if they want to play again.It should also tell the user how much time it took to win the game, and what the star rating was.

var deckList = [];

$('.card').each(function () {
    deckList.push($(this));
});
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};
shuffle(deckList);

for (x = 0; x < deckList.length; x++) {
    var card = deckList[x];
    $('.deck').append(card);
};

// classes open and show = flipped card --- class match = matched card
var selected = [];
var moveCount = 0;

function unmatched(one, two) {
    $(one).removeClass('open show');
    $(two).removeClass('open show');
};

function matched(one, two) {
    $(one).addClass('match');
    $(two).addClass('match');
};

function checkCards(array) {
    var cardOne = array[0];
    var cardTwo = array[1];
    if ($(cardOne).find('i').attr('class') === $(cardTwo).find('i').attr('class')) {
        matched(cardOne, cardTwo);
    } else {
        unmatched(cardOne, cardTwo);
    }
    return selected = [];
};

function moveCounter() {
    $('.moves').empty();
    $('.moves').text(moveCount);
};

function checkWin() {
    var win = true
    for (var index = 0; index < deckList.length; index++) {
        var cards = deckList[index];
        if ($(cards).hasClass('match') === false) {
            win = false
        }
    }
    if (win === true) {
        $('.score').text(moveCount);
        $('.alert').toggleClass('hidden');
        $('.finalTime').text(timerMin + ":" + timerSecTen + timerSec);  
        $('.time').toggleClass('hidden');    
    }
};

$('.card').click(function () {
    $(this).addClass('open show')
    selected.push($(this));
    if (selected.length == 2) {
        setTimeout(function () {
            checkCards(selected);
            moveCount = moveCount + 1;
            moveCounter();
            checkWin();
        }, 1000);
        if (moveCount === 12) {
            $('.stars li').last().remove();
        } else if (moveCount === 18) {
            $('.stars li').last().remove();
        };
    }
});

$('#playAgain').click(function(){
    $('.card').toggleClass('open show match');
    $('.alert').toggleClass('hidden');
    $('.time').toggleClass('hidden');
    resetTime();
    shuffle(deckList);
    for (x = 0; x < deckList.length; x++) {
        var card = deckList[x];
        $('.deck').append(card);
    };
});

$('.restart').click(function () {
    $('.card').removeClass('open show match');
    shuffle(deckList);
    for (x = 0; x < deckList.length; x++) {
        var card = deckList[x];
        $('.deck').append(card);
    };
    moveCount = 0;
    moveCounter();
});

// TIMER FUNCTION

var timerSec = 0;
var timerMin = 0;
var timerSecTen = "0";

function resetTime(){
    timerSec = 0;
    timerSecTen = 0;
    timerMin = 0;
    $('.seconds').text(timerSec);
    $('.secondsTen').text(timerSecTen);
    $('.minutes').text(timerMin);
}

function countUP() {
    if (timerSec === 9) {
        timerSecTen = "";
        timerSec++;
        $('.seconds').text(timerSec);
        $('.secondsTen').text(timerSecTen);
    } else if (timerSec === 59){
        timerSec = 0;
        timerSecTen = "0";
        timerMin++;
        $('.seconds').text(timerSec);
        $('.secondsTen').text(timerSecTen);
        $('.minutes').text(timerMin);
    } else {
        timerSec++;
        $('.seconds').text(timerSec);
    };
    setTimeout("countUP()", 1000);
};

$('.startTimer').click(function(){
    $('.seconds').text(timerSec);
    countUP();
    $('.startAlert').toggleClass('hidden');
})