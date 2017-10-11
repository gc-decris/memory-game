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
    }
});

$('button').click(function(){
    $('.card').toggleClass('open show match');
    $('.alert').toggleClass('hidden');
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