// Grab DOM elements from HTML
const word = document.getElementById('word');
const wrongLetters = document.getElementById('wrong-letters');
const popup = document.getElementById('popup-container');
const message = document.getElementById('win-lose');
const restartButton = document.getElementById('restart');
const notification = document.getElementById('slider-container');

const hangmanParts = document.querySelectorAll('.hangman-part');

const wordPool = ['football','html','hangman','movie','youtube'];

let selectedWord = wordPool[Math.floor(Math.random() * wordPool.length)];

const correctLetters = [];
const incorrectLetters = [];

function displaySelectedWord() {
    word.innerHTML = `
        ${selectedWord
            .split('')
            .map(
                letter => `
                    <span class="letter">
                        ${correctLetters.includes(letter) ? letter : '' }
                    </span>
                `
            )
            .join('')
        }
    `;

    const wordText = word.innerText.replace(/\n/g, '');

    if( wordText === selectedWord ) {
        message.innerText = 'You won!';
        popup.style.display = 'flex';
    }

};


function showNotification() {
    notification.classList.add('show');

    setTimeout( () => {notification.classList.remove('show');}, 3000);
}


function updateWrongLetters() {
    
    wrongLetters.innerHTML = `
    ${incorrectLetters.length > 0 ? `<p>Wrong</p>` : '' }
    ${incorrectLetters.map( letter => `<span>${letter}</span>`)}
    `;

    
    hangmanParts.forEach( (part, index) => {
        const errors = incorrectLetters.length;

        if ( index < errors ) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    
    if(incorrectLetters.length === hangmanParts.length) {
        message.innerText = 'You lost!';
        popup.style.display = 'flex';
    }
}


window.addEventListener('keydown', e => {
    if( e.keyCode >= 65 && e.keyCode <= 90 ) {
        const letter = e.key;
        
        if( selectedWord.includes(letter) ) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displaySelectedWord();
            } else {
                showNotification();
            }
        } else {
            if(!incorrectLetters.includes(letter)) {
                incorrectLetters.push(letter);
                updateWrongLetters();
            } else {
                showNotification();
            }
        }

    }
})


restartButton.addEventListener('click', () => {
    // Empty Arrays
    correctLetters.splice(0);
    incorrectLetters.splice(0);

    
    selectedWord = wordPool[Math.floor(Math.random() * wordPool.length)];

    displaySelectedWord();

    
    updateWrongLetters();

    
    popup.style.display = 'none';

})

displaySelectedWord();