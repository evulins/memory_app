/*
 * Create a list that holds all of your cards
 */
const cards = ['diamond', 'diamond', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'cube', 'cube', 'anchor', 'anchor', 'leaf', 'leaf', 'bicycle', 'bicycle', 'bomb', 'bomb'];
const openCards = [];

let moveCounter = 0;

let gameStarted = false;



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function showCards(cardList) { 
	const shuffledCards = shuffle(cards);
 	shuffledCards.forEach(function(card) {
 		const cardHTML = `
			<li class='card'>
		    	<i class="fa fa-${card}"></i>
		    </li>`;
		$(".deck").append(cardHTML);
 	})
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

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
function showCard(card) {
	card.addClass('open show');
}

//Hides the card's symbol
function hideCard(card) {
	card.removeClass('open show')
}

//Adds animation to not matching cards
function animateWrongResult(card) {
	card.addClass('wrongPair')
}

//Adds the card to open cards list
function addToOpenCards(card) {
	openCards.push(card);
}

//Gets card class
function getCardClass(card) {
	return card.find('i:first').attr('class');
}

//Locks the matching cards in the open position 
function lockOpenCard (card) {
	card.addClass('match');
}

//Checks to see if the two cards match
function matchCards (card1, card2) {
	const card1Class = getCardClass(card1);
	const card2Class = getCardClass(card2);

	if (card1Class === card2Class) {
		lockOpenCard(card1);
		lockOpenCard(card2);
	} else {
		animateWrongResult(card1);
		animateWrongResult(card2);
		setTimeout(function() {
    		hideCard(card1);
			hideCard(card2);
		}, 300);
		
	}
	openCards.splice(0, openCards.length);
}

//Increments and updates the move counter

function updateMoveCounter() {
	moveCounter += 1;
	$('span.moves').text(moveCounter);
}

//Updates stare raiting

function updateStarRating() {
	const star = `
		<li>
			<i class="fa fa-star"></i>
		</li>
	`;
	let starsCount = 3;

	if (moveCounter > 10 && moveCounter <= 20) {
		starsCount = 2;

	} else if (moveCounter > 20) {
		starsCount = 1;
	}
	$('.stars').empty();
	for (let i = 0; i < starsCount; i = i + 1) {
		$('.stars').append(star);
	}
}

//Displays final score
function displayFinalScore() {
	let matchCards = $('li.match').length;
    if (matchCards === cards.length) {
		$('.runner').runner('stop');
		setTimeout (
			function() {
				const time = $('.runner').text();
				const scorePopup = $('.score-popup');
				scorePopup.find('.totalMoves').text(moveCounter);
				scorePopup.find('.totalTime').text(time);				
				scorePopup.show();
			},
			500
		)
    }
}

//Closes pop-up with the final score
$('.close').on('click', function() {
	event.preventDefault();
	$('.score-popup').hide();
});

//Resets the game and the score
$('.restart').on('click', function() {
	event.preventDefault();
	$('li').removeClass('open show');
	$('li').removeClass('match');
	$('span.moves').text('0');
	$('.runner').runner('reset', true);
	moveCounter = 0;
	updateStarRating();
	$('.score-popup').hide();
	gameStarted = false;
});

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



(function() {

  showCards(cards);
  updateStarRating();
  $('.runner').runner();
  $('.card').on('click', function(event) {
    event.preventDefault();

    if (gameStarted === false) {
    	gameStarted = true;
    	$('.runner').runner('start');
    }

    updateStarRating();
    if (openCards.length < 2 && $(this).hasClass('open show') === false) {
    	showCard($(this));
    	addToOpenCards($(this));	
    }
   
    setTimeout(
    	function() {

	    	if (openCards.length === 2) {
	    		matchCards(openCards[0], openCards[1]);
	    		updateMoveCounter();
	    		displayFinalScore();
	    	}
    	},
    	1200
    )

 });

})();




