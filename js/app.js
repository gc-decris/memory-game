
//Shuffle Deck 
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
// End Shuffle function from http://stackoverflow.com/a/2450976

shuffle(deckList);

for (x = 0; x < deckList.length; x++) {
    var card = deckList[x];
    $('.deck').append(card);
};

// End Shuffle Desk

// Check if cards match
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
    if (($(cardOne).position().left === $(cardTwo).position().left) && ($(cardOne).position().top === $(cardTwo).position().top)){
        unmatched(cardOne, cardTwo)
    }
    else if ($(cardOne).find('i').attr('class') === $(cardTwo).find('i').attr('class')) {
        matched(cardOne, cardTwo);
    } else {
        setTimeout(function(){
            unmatched(cardOne, cardTwo);
        }, 750)
    }
    return selected = [];
};

// End Check if cards match

// Count player's moves
function moveCounter() {
    $('.moves').empty();
    $('.moves').text(moveCount);
};
// End Count player's moves

//Check for game won 
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
        // $('.time').toggleClass('hidden');
        $('.starFinal').html($('.stars')); 
        $('.scorePanel').toggleClass('hidden');
    }
};
//End Check for game won

// Start function to reset the stars
function starReset() {
    $('.stars').empty();
    $('.stars').append('<li><i class="fa fa-star"></i></li>', '<li><i class="fa fa-star"></i></li>', '<li><i class="fa fa-star"></i></li>');
}
// End function to reset stars

// Function on card click -- check for match, check for win, and change star rating
$('.card').click(function(){
    $(this).addClass('open show')
    selected.push($(this));
    moveCount = moveCount + 1;
    moveCounter();
    if (selected.length == 2) {
            checkCards(selected);
            checkWin();
    };
        if (moveCount === 15) {
            $('.stars li').last().remove();
        } else if (moveCount === 22) {
            $('.stars li').last().remove();
        };
    });


//End Function on card click

// Reset game after game is won
$('#playAgain').click(function(){
    $('.card').toggleClass('open show match');
    $('.alert').toggleClass('hidden');
    // $('.time').toggleClass('hidden');
    $('.scorePanel').toggleClass('hidden');
    $('.starContainer').html($('.stars'));
    starReset();
    resetTime();
    moveCount = 0;
    moveCounter();
    shuffle(deckList);
    for (x = 0; x < deckList.length; x++) {
        var card = deckList[x];
        $('.deck').append(card);
    };
});
//End Reset game after game is won

//Restart game mid-game
$('.restart').click(function () {
    $('.card').removeClass('open show match');
    shuffle(deckList);
    for (x = 0; x < deckList.length; x++) {
        var card = deckList[x];
        $('.deck').append(card);
    };
    moveCount = 0;
    moveCounter();
    resetTime();
});
//End Restart game mid-game

// Timer functions

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

function countUp() {
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
    setTimeout("countUp()", 1000);
};

$('.startTimer').click(function(){
    $('.seconds').text(timerSec);
    countUp();
    $('.startAlert').toggleClass('hidden');
})

// End Timer functions
