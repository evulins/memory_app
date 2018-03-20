/*
 * Create a list that holds all of your cards
 */
const cards = ['diamond', 'diamond', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'cube', 'cube', 'anchor', 'anchor', 'leaf', 'leaf', 'bicycle', 'bicycle', 'bomb', 'bomb'];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function showCards(cardList) { 
	var newList = shuffle(cards);

	for (var i = 0; i < cardList.length; i++) {
	    var current = cardList[i];
		const card = `
			<li class="card">
		    	<i class="fa fa-${current}"></i>
		    </li>`;
		$(".deck").append(card);
	};

	return cardList;
}

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

//Displays the card's symbol 
function showSymbol(card) {
	for (var i = 0; i < card.length; i++) {
	    var current = card[i];
		var cardSymbol = `
		<li class="card open show">
         	<i class="fa fa-${current}"></i>
        </li>`;
		$('.deck').append(cardSymbol);
	};

	return card;
}

//Adds the card to open cards list
function openCards() {

}

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

$('li.card').on('click', function(event) {
    event.preventDefault();
    showSymbol(cards);
  });



(function() {
  // showCards(cards);
  showSymbol(cards);
})();




