const gameWords = ["seaweed", "shark", "fish", "eel", "clam", "sponge", "dolphin", "octopus", "wave", "surfer",
"pirate", "sand", "coral", "crab", "tuna", "salmon","shrimp","jellyfish", "whale", "barnacle","seal","turtle",
"mermaid","squid", "anemone","urchin",""]
const newGameButton = document.querySelector(".new-game")
const letterContainer = document.querySelector(".letters-container")
const { styler, everyFrame } = window.popmotion;
let currentGame = {};
let currentGuess = document.querySelector('.guess-box');
let points = 0;
let lives = 3;
const pointsTicker = document.querySelector('#points-count');
const answersContainer = document.querySelector('.answers-list');
let livesTracker = document.querySelector('.lives');
var popup = document.querySelector('.popup');
var highScoreContainer = document.querySelector('.current-high-score')


// shuffle array code from https://www.jstips.co/en/javascript/shuffle-an-array/

class Game {
    constructor (word) {
        this.word = word;
        this.letters = word.split("");
    }
    shuffle () {
        var i;
        var j;
        var temp;
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
    const container = []
    letterContainer.innerHTML = "";
    let wordSelector = Math.floor(Math.random() * (gameWords.length - 1))
    currentGame = new Game(gameWords[wordSelector]);
    currentGame.shuffle();
    // add event to submit guess on enter key
    currentGuess.addEventListener('keypress', enterGuess)

    for (let i = 0; i < currentGame.letters.length; i++) {
        let letterBlock = document.createElement('div')
        letterBlock.classList.add('letter')
        letterBlock.append(currentGame.letters[i])
        container.push(letterBlock)
        letterContainer.appendChild(letterBlock)
    }
    
// GAME ANIMATION - JELLYFISH

    const jellyStylers = container.map(styler);
    
    const distance = 10;
    
    everyFrame()
      .start((timestamp) => jellyStylers.map((thisStyler, i) => {
        thisStyler.set('y', distance * Math.sin(0.002 * timestamp + (i * 0.6)));
    }));    

}

function enterGuess (evt){
    let keycode = evt.keyCode;
    if (keycode == 13) {
        checkGuess();
    }
}

// add event listener to the button that generates a new game

newGameButton.addEventListener('click', createNewGame)

// check if an answer is right or wrong

function checkGuess (){
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
            livesElement.classList.add('life')
            livesElement.innerHTML = `❤️`
            livesTracker.appendChild(livesElement)
        }
    }
    if (lives == 0) {
        gameOver()
    }
    currentGuess.value = "";
    createNewGame();
}

// function that triggers a game over scenario

function gameOver () {
    popup.style.visibility = 'visible';
    currentGuess.value = "";
    createNewGame();
    answersContainer.innerHTML = '';
    lives = 3;
    for (i = lives; i > 0; i--) {
        const livesElement = document.createElement('div');
        livesElement.classList.add('life')
        livesElement.innerHTML = `❤️`
        livesTracker.appendChild(livesElement)
        currentGuess.removeEventListener('keypress', enterGuess)
    // show popup with high scores and place to enter name.
    let highScore = Number(localStorage.getItem('.str_highScore'));
    if (points > highScore) {
        localStorage.setItem('str_highScore', `${points}`)
    }
    // clear points and letters and correct answers lists
}
};

// add event listener to the game over screen

popup.addEventListener('click', function () {
    popup.style.visibility = 'hidden';

})


// function addNameToLeaderboard () {
//     var leaderBoard = document.querySelector('.leader-board')
//     var newHighScore = document.createElement('li')
//     var playerName = document.querySelector('.name').value
//     newHighScore.append(playerName + ": " + score)
//     leaderBoard.appendChild(newHighScore)


//  HIGH SCORE - https://www.w3schools.com/html/html5_webstorage.asp

localStorage.str_highScore = '0';
highScoreContainer.innerHTML = 'High Score: ' + localStorage.getItem('str_highScore')




