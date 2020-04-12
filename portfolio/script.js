// Blackjack
// by Karan Wafalay

// Card variables
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'],
  values = ['Ace', 'King', 'Queen', 'Jack',
    'Ten', 'Nine', 'Eight', 'Seven', 'Six',
    'Five', 'Four', 'Three', 'Two'];

// DOM variable
let textArea = document.getElementById('text-area'),
  newGameButton = document.getElementById('new-game-button'),
  hitButton = document.getElementById('hit-button'),
  stayButton = document.getElementById('stay-button'),
  quitButton = document.getElementById('quit-button');

// Game variable
let gameStarted = false,
  gameOver = false,
  playerWon = false,
  dealerCards = [],
  playerCards = [],
  dealerScore = 0,
  playerScore = 0,
  dealerWinCount = 0,
  playerWinCount = 0,
  playerMoney = 500,
  deck = [];
  
  

hitButton.style.display = 'none';
stayButton.style.display = 'none';
quitButton.style.display = 'none';
showStatus();

newGameButton.addEventListener('click', function () {
  gameStarted = true;
  gameOver = false;
  playerWon = false;
  quit = false;

  playerMoney -= 20;
  deck = createDeck();
  shuffleDeck(deck);
  dealerCards = [getNextCard()];
  playerCards = [getNextCard(), getNextCard()];

  // if(playerCards.dealerScore === 21){
  //   textArea.innerText = "BLACKJACK";
  // }

  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  quitButton.style.display = 'inline';
  showStatus();
});

hitButton.addEventListener('click', function () {
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

stayButton.addEventListener('click', function () {
  gameOver = true;
  checkForEndOfGame();
  showStatus();
});

quitButton.addEventListener('click', function() {
  gameOver = true;
  hitButton.style.display = 'none';
  stayButton.style.display = 'none';
  quitButton.style.display = 'none';
  newGameButton.style.display = 'inline';
  displayWinScore();
});

function createDeck() {
  let deck = [];
  for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
    for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
      let card = {
        suit: suits[suitIdx],
        value: values[valueIdx]
      };
      deck.push(card);
    }
  }
  return deck;
}

function shuffleDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
    let swapIdx = Math.trunc(Math.random() * deck.length);
    let tmp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = tmp;
  }
}

function getCardString(card) {
  let cardValue = getCardNumericValue(card);
  return cardValue + ' (' + card.value + ' of ' + card.suit + ')';
}

function getScore(cardArray) {
  let score = 0;
  let hasAce = false;
  for (let i = 0; i < cardArray.length; i++) {
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if (card.value === 'Ace') {
      hasAce = true;
    }
  }
  if (hasAce && score + 10 <= 21) {
    return score + 10;
  }
  return score;
}

function getCardNumericValue(card) {
  switch (card.value) {
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five':
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9;
    default:
      return 10;
  }
}

function updateScores() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

function checkForEndOfGame() {
  updateScores();

  if (gameOver) {
    // let dealer take cards
    while (dealerScore < 17) {
      dealerCards.push(getNextCard());
      updateScores();
    }
  }

  if (playerScore > 21) {
    playerWon = false;
    gameOver = true;
  }
  else if (dealerScore > 21) {
    playerWon = true;
    gameOver = true;
  }
  else if (gameOver) {
    if (playerScore > dealerScore) {
      playerWon = true;
    }
    else {
      playerWon = false;
    }
  }
}

function getNextCard() {
  return deck.shift();
}

function showStatus() {
  if (!gameStarted) {
    textArea.innerText = "Welcome to Blackjack!";
    return;
  }

  let dealerCardString = '';
  for (let i = 0; i < dealerCards.length; i++) {
    dealerCardString += getCardString(dealerCards[i]) + '\n';
  }

  let playerCardString = '';
  for (let i = 0; i < playerCards.length; i++) {
    playerCardString += getCardString(playerCards[i]) + '\n';
  }

  updateScores();

  textArea.innerText = 
    'Dealer has:\n' +
    dealerCardString +
    '=> Score: ' + dealerScore + '\n\n' +

    'Win count: ' + ' Dealer: ' + dealerWinCount + '  Player: ' + 
        playerWinCount + '\nTotal Amount: ' + playerMoney + 

    '\n\nPlayer has:\n' +
    playerCardString +
    '=> Score: ' + playerScore + '\n\n';

  if (gameOver) {
    if (playerWon) {
      playerWinCount += 1;
      playerMoney += 20;
      textArea.innerText += "YOU WIN!";
    }
    else if (dealerScore === playerScore) {
      playerMoney += 20;
      textArea.innerText += "DRAW";
    }
    else {
      dealerWinCount += 1;
      textArea.innerText += "DEALER WINS";
    }
    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';

    displayWin();
  }
}

function displayWin() {
  textArea.innerText = 
    'Dealer has:\n' +
    dealerCardString +
    '=> Score: ' + dealerScore + '\n\n' +

    'Win count: ' + ' Dealer: ' + dealerWinCount + '  Player: ' + 
        playerWinCount + '\nTotal Amount: ' + playerMoney + 

    '\n\nPlayer has:\n' +
    playerCardString +
    '=> Score: ' + playerScore + '\n\n';
}

function displayWinScore() {
  textArea.innerText = 'Game summary' + '\n\nDealer total win: ' + 
            dealerWinCount + '\nPlayer total win: ' + playerWinCount + 
            '\nTotal Amount : ' + playerMoney;
  dealerWinCount = 0; 
  playerWinCount = 0;
}
