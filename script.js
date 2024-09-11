// Items inside the cards
const animals = ['cat','cat','dog','dog','bird','bird','Lion','Lion','tiger','tiger','wolf','wolf','Falcon','Falcon','rabbit','rabbit']
// Setting game variables
let cord1 = null
let cord2 = null
let canFlip = true
let match = 0
let score = 0
// Locate cards
function create() {
    const game = document.getElementById('game')
// Place cards in random places.
// Use data to store values ​​and index
const random = animals.sort(() => 0.5 - Math.random())
//https://ar.w3hmong.com/js/js_array_sort.htm
random.forEach((value, index) => {
    const card = document.createElement('div')
    card.classList.add('card')
    card.dataset.value = value
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
    card.setAttribute('data-index', index)
// https://www.closetag.com/tutorials/javascript/javascript-dom-attributes    
    card.addEventListener('click', () => flipCard ( card))
    game.appendChild(card)
})
}
// Card flip function to prevent flipping while waiting and put the card to the first and second and check that the two cards match.
function flipCard (card) {
    if (!canFlip || card === cord1 || card.classList.contains('flipped')) return
    // https://www.closetag.com/tutorials/javascript/javascript-dom-classlist
    card.classList.add('flipped')
    card.textContent = card.dataset.value
    // https://www.shecodes.io/athena/87614-difference-between-innertext-and-textcontent-in-javascript
    if (cord1 === null) {
        cord1 = card
    } else {
        cord2 = card
        canFlip = false
        check()
    }
}
// Function to check cards matches, reset cards after matching, prevent cards from being flipped while waiting, and flip cards after a short period
function check() {
    if (cord1.dataset.value === cord2.dataset.value) {
        match++
        score++
        updateS()
        if (match === animals.length/ 2) {
        win()
    } else {
        reset()
    }
    } else {
        canFlip = false
        setTimeout(unflip, 1000)
// https://ar.javascript.info/settimeout-setinterval
    }    
}
// Function to flip the cards again if they are not identical and reset the variablesز
function unflip() {
    cord1.classList.remove('flipped')
    cord2.classList.remove('flipped')
// https://www.closetag.com/tutorials/javascript/javascript-dom-remove-methods
    cord1.textContent = ''
    cord2.textContent = ''
    reset()
}
// Reset variables function
function reset() {
    [cord1, cord2] = [null, null]
    canFlip = true
}
// Function to update points
function updateS() {
    const playerS = document.getElementById('score')
    playerS.textContent = `Score ${score}`
}
// Function to display winner message
function win () {
setTimeout(() => {
    alert('you Win')
    resetG()
}, 500)
}
// Game Restart Function: Clear cards, reset points, and regenerate cards.
function resetG() {
    const game = document.getElementById('game')
    game.innerHTML = ''
    match = 0
    score = 0
    updateS()
    create()
}
// play game
create()
// Add a dot element to HTML and place the dot element at the top of the page
const scoreE = document.createElement('div')
scoreE.id = 'score'
scoreE.textContent = 'Score: 0'
document.body.prepend(scoreE)
// https://api.jquery.com/prepend/