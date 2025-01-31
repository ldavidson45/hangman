const gameWords = ["seaweed", "shark", "fish", "eel", "clam", "sponge", "dolphin", "octopus", "wave", "surf",
"pirate", "sand", "coral", "crab", "tuna","shrimp","jellyfish", "whale", "barnacle","seal","turtle",
"mermaid","squid", "anemone","urchin","pelican", "brine","otter", "humpback","manatee","flounder",
"walrus","narwhal","oyster","lobster","seahorse","blowfish","stingray","barracuda","kelp","beluga","otter","angler fish",
"seashell","sand dollar","mussel","conch","cuttlefish"];
const newGameButton = document.querySelector(".new-game");
const letterContainer = document.querySelector(".letters-container");
const { styler, everyFrame } = window.popmotion;
let currentGame = {};
let currentGuess = document.querySelector('.guess-box');
let points = 0;
let lives = 3;
const pointsTicker = document.querySelector('#points-count');
const answersContainer = document.querySelector('.answers-list');
let livesTracker = document.querySelector('.lives');
const popup = document.querySelector('.popup');
const highScoreContainer = document.querySelector('.current-high-score');
localStorage.str_highScore = '0';
const yourFinalScore = document.querySelector('.your-score');



// shuffle array code from https://www.jstips.co/en/javascript/shuffle-an-array/

class Game {
    constructor (word) {
        this.word = word;
        this.letters = word.split("");
    }
    shuffle () {
        let i;
        let j;
        let temp;
        for (i = this.letters.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = this.letters[i];
            this.letters[i] = this.letters[j];
            this.letters[j] = temp;
        }

    }
}

// this function and variables are related to the creation of a new game. the "New Gmae Button" triggers this function to assign a new currentGame
// createNewGame () steps:
// 1. Clear the div with the letter tiles
// 2. picks a random word from the gameWords array
// 3. currentGame = new instance of Game based on random word
// 4. calls the shuffle method on the new instance of Game
// 5. for each letter in the currentGame, create a div with the class 'letter'
// 6. append each letter into the div
// 7. appends each div into the letters container element
// 8. add event listener to the input so that the user can press enter to guess.



const createNewGame = function () {
    let container = [];
    letterContainer.innerHTML = "";
    let wordSelector = Math.floor(Math.random() * (gameWords.length - 1));
    currentGame = new Game(gameWords[wordSelector]);
    currentGame.shuffle();
    // add event to submit guess on enter key
    currentGuess.addEventListener('keypress', enterGuess);

    for (let i = 0; i < currentGame.letters.length; i++) {
        let letterBlock = document.createElement('div');
        letterBlock.classList.add('letter');
        letterBlock.append(currentGame.letters[i]);
        container.push(letterBlock);
        letterContainer.appendChild(letterBlock);
    }
    
// GAME ANIMATION - JELLYFISH

    const jellyStylers = container.map(styler);
    
    const distance = 10;
    
    everyFrame()
      .start((timestamp) => jellyStylers.map((thisStyler, i) => {
        thisStyler.set('y', distance * Math.sin(0.002 * timestamp + (i * 0.6)));
    }));

};

function enterGuess (evt){
    let keycode = evt.keyCode;
    if (keycode == 13) {
        checkGuess();
    }
};

// add event listener to the button that generates a new game

newGameButton.addEventListener('click', createNewGame);

// check if an answer is right or wrong

function checkGuess () {
    let correctWord = document.createElement('div');
    correctWord.classList.add('words');
    if (currentGuess.value === currentGame.word) {
        points += currentGame.letters.length;
        pointsTicker.innerText = points;
        correctWord.append(currentGame.word);
        answersContainer.appendChild(correctWord);
        
    } else { 
        correctWord.append(currentGame.word);
        correctWord.classList.add('wrong');
        answersContainer.appendChild(correctWord);
        lives -= 1;
        livesTracker.innerHTML = "";
        for (i = lives; i > 0; i--) {
            const livesElement = document.createElement('div');
            livesElement.classList.add('life');
            livesElement.innerHTML = `❤️`;
            livesTracker.appendChild(livesElement);
        }
    };
    if (lives == 0) {
        gameOver();
    };
    currentGuess.value = "";
    updateHighScore ();
    createNewGame();
}

// function that triggers a game over scenario

function gameOver () {
    popup.style.visibility = 'visible';
    currentGuess.value = "";
    createNewGame();
    answersContainer.innerHTML = '';
    lives = 3;
    yourFinalScore.innerText = "Your Score: " + `${points}`;
    for (i = lives; i > 0; i--) {
        const livesElement = document.createElement('div');
        livesElement.classList.add('life');
        livesElement.innerHTML = `❤️`;
        livesTracker.appendChild(livesElement);
        currentGuess.removeEventListener('keypress', enterGuess);
    }
    // clear points and letters and correct answers lists
    points = 0;
    pointsTicker.innerText = points;
// add event listener to the game over screen
popup.addEventListener('click', function () {
    popup.style.visibility = 'hidden';

})
};

//  HIGH SCORE - https://www.w3schools.com/html/html5_webstorage.asp


function updateHighScore () {
let int_highScore = Number(localStorage.str_highScore);
if (int_highScore < points) {
    localStorage.str_highScore = `${points}`;
    highScoreContainer.innerText = ('High Score: ' + localStorage.str_highScore);
}
};