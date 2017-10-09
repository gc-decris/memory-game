/*
 * Create a list that holds all of your cards
 */
var deckList = [];

$('.card').each(function(){
    deckList.push($(this));
});


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
}
shuffle(deckList);

for (x = 0; x < deckList.length; x++) {
    var card = deckList[x];
    $('.deck').append(card);
};


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
// classes open and show = flipped card --- class match = matched card
var selected = [];
var moveCount = 0;

function checkCards (array) {
    var cardOne = array[0];
    var cardTwo = array[1];
    if ($(cardOne).find('i').attr('class') === $(cardTwo).find('i').attr('class')){
        matched(cardOne, cardTwo);
    } else {
        unmatched(cardOne, cardTwo);
    }
    return selected = [];
};
function unmatched(one, two) {
    $(one).removeClass('open show');
    $(two).removeClass('open show');
}

function matched(one, two) {
    $(one).addClass('match');
    $(two).addClass('match');
}

function moveCounter() {
    $('.moves').empty();
    $('.moves').text(moveCount);
}

$('.card').click(function(){
    $(this).addClass('open show')
    selected.push($(this));
    if (selected.length == 2){
        setTimeout(function() {
        checkCards(selected); 
        moveCount = moveCount + 1;
        moveCounter(); 
        }, 1000);
    }
})


