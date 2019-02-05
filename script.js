
class Game {
    constructor (word) {
        this.word = word;
        this.letters = word.split("");
    }
}

const gameWords = ["doctor","elephant","recreation","graph","class","literal","wheel","mineral","earring"]

let currentGame = {}

const createNewGame = function (){
    let wordSelector = Math.floor(Math.random() * (gameWords.length-1))
    currentGame = new Game(gameWords[wordSelector])
    console.log(currentGame)
}

// add event listener to the button that generates a new game

const newGameButton = document.querySelector(".new-game")

newGameButton.addEventListener('click', createNewGame)