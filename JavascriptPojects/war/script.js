const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
let player1Score = 0;
let player2Score = 0;

let deck = [];

function createDeck() {
    deck = [];
    suits.forEach(suit => {
        values.forEach(value => {
            deck.push({ suit, value, rank: values.indexOf(value) + 2 });
        });
    });
    deck = shuffleDeck(deck);
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function drawCards() {
    if (deck.length < 2) {
        createDeck();
    }

    const player1Card = deck.pop();
    const player2Card = deck.pop();

    document.getElementById('player1-card').textContent = `${player1Card.value}\n${player1Card.suit}`;
    document.getElementById('player2-card').textContent = `${player2Card.value}\n${player2Card.suit}`;

    const resultElement = document.getElementById('result');

    if (player1Card.rank > player2Card.rank) {
        player1Score++;
        resultElement.textContent = 'שחקן 1 ניצח את הסיבוב!';
    } else if (player1Card.rank < player2Card.rank) {
        player2Score++;
        resultElement.textContent = 'שחקן 2 ניצח את הסיבוב!';
    } else {
        resultElement.textContent = 'תיקו!';
    }

    document.getElementById('score').textContent = `ניקוד: שחקן 1 - ${player1Score} | שחקן 2 - ${player2Score}`;
}

document.getElementById('draw-cards').addEventListener('click', drawCards);

createDeck();
