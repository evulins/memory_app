
//Global variables
 
// The list which holds all of cards
const cards = ['diamond', 'diamond', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'cube', 'cube', 'anchor', 'anchor', 'leaf', 'leaf', 'bicycle', 'bicycle', 'bomb', 'bomb'];

//The list which holds only open cards
const openCards = [];

let moveCounter = 0;

let gameStarted = false;



//Displays the cards on the page
function showCards(cardList) {

//Shuffles the list
	const shuffledCards = shuffle(cards);

//Loops through each card and create its HTML
 	shuffledCards.forEach(function(card) {
 		const cardHTML = `
			<li class='card'>
		    	<i class="fa fa-${card}"></i>
		    </li>`;

//Adds each card's HTML to the page
		$(".deck").append(cardHTML);
 	})
}

//Shuffle function from http://stackoverflow.com/a/2450976
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
			card1.removeClass('wrongPair');
			card2.removeClass('wrongPair');
		}, 200);
		
	}
	openCards.splice(0, openCards.length);
}

//Increments and updates the move counter
function updateMoveCounter() {
	moveCounter += 1;
	$('span.moves').text(moveCounter);
}

//Counts stars
function starsCount() {
	let starsCount = 3;

	if (moveCounter > 10 && moveCounter <= 20) {
		starsCount = 2;

	} else if (moveCounter > 20) {
		starsCount = 1;
	}
	return starsCount;
}

//Updates stare raiting
function updateStarRating() {
	const star = `
		<li>
			<i class='fa fa-star'></i>
		</li>
	`;
	let starsNumber = starsCount();
	$('.stars').empty();
	for (let i = 0; i < starsNumber; i = i + 1) {
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
				const stars = starsCount();
				const scorePopup = $('.score-popup');
				scorePopup.find('.totalMoves').text(moveCounter);
				scorePopup.find('.totalTime').text(time);
				scorePopup.find('.totalStars').text(stars);			
				scorePopup.show();
				$('.score-window').show();
			},
			500
		)
    }
}

//Closes pop-up with the final score
$('.close').on('click', function() {
	event.preventDefault();
	$('.score-popup').hide();
	$('.score-window').hide();
});

//Resets the game and the score
$('.restart, .button').on('click', function() {
	event.preventDefault();
	$('li').removeClass('open show');
	$('li').removeClass('match');
	$('span.moves').text('0');
	$('.runner').runner('reset', true);
	moveCounter = 0;
	updateStarRating();
	$('.score-popup').hide();
	$('.score-window').hide();
	gameStarted = false;
});

//This function is activating every time when page is reloding
(function() {
	showCards(cards);
	updateStarRating();

//Runs the stopwatch
	$('.runner').runner();

//Adds the event listener for a clicked card
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




