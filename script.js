
const gameWords = ["doctor","elephant","recreation","graph","class","literal","wheel","mineral","earring"]
const newGameButton = document.querySelector(".new-game")
const letterContainer = document.querySelector(".letters-container")


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

let currentGame = {}

const createNewGame = function (){
    letterContainer.innerHTML = "";
    let wordSelector = Math.floor(Math.random() * (gameWords.length-1))
    currentGame = new Game(gameWords[wordSelector]);
    currentGame.shuffle();
    console.log(currentGame)
    for (let i = 0; i < currentGame.letters.length; i++) {
        let letterBlock = document.createElement('div')
    letterBlock.classList.add('letter')
    letterBlock.append(currentGame.letters[i])
    letterContainer.appendChild(letterBlock)
}
}

// add event listener to the button that generates a new game

newGameButton.addEventListener('click', createNewGame)

//create a function that checks the form word against the currentGame word.

let currentGuess = document.querySelector('.guess-box');
let points = 0;
let lives = 3;
const pointsTicker = document.querySelector('#points-count');
const answersContainer = document.querySelector('.answer-history');
let livesTracker = document.querySelector('.lives')


// check if an answer is right or wrong

function checkGuess (){
    let correctWord = document.createElement('li');
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
            livesElement.innerHTML = `<i class="fas fa-heart"></i>`
            livesTracker.appendChild(livesElement)
        }

    if (lives == 0) {
        gameOver()
    }
    }
    currentGuess.value = "";
    createNewGame();
}

function gameOver () {
    var popup = document.querySelector('.popup')
    popup.style.visibility = 'visible'
    // show popup with high scores and place to enter name.
    // clear points and letters and correct answers lists
}


// add event listener to submit button OR on enter key

const submitButton = document.querySelector('.submit-button')

submitButton.addEventListener('click', checkGuess)


// function addNameToLeaderboard () {
//     var leaderBoard = document.querySelector('.leader-board')
//     var newHighScore = document.createElement('li')
//     var playerName = document.querySelector('.name').value
//     newHighScore.append(playerName + ": " + score)
//     leaderBoard.appendChild(newHighScore)
// }