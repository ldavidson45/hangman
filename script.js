
const gameWords = ["doctor","elephant","recreation","graph","class","literal","wheel","mineral","earring"]
const newGameButton = document.querySelector(".new-game")
const letterContainer = document.querySelector(".letters-container")

class Game {
    constructor (word) {
        this.word = word;
        this.letters = word.split("");
    }
}

// this function and variables are related to the creation of a new game. the "New Gmae Button" triggers this function to assign a new currentGame

let currentGame = {}

const createNewGame = function (){
    letterContainer.innerHTML = "";
    let wordSelector = Math.floor(Math.random() * (gameWords.length-1))
    currentGame = new Game(gameWords[wordSelector])
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