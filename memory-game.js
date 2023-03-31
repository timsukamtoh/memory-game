"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);
let secondCard = false;
createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    // missing code here ...
    const card = document.createElement('button');
    card.classList.add(color);
    gameBoard.append(card);

    card.addEventListener('click',(e)=>{
      handleCardClick(e);
    })
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  // ... you need to write this ...
  card.classList.add('active');
}

/** Flip a card face-down. */

function unFlipCard(card) {
  // ... you need to write this ...
  card.classList.remove('active');
}

function setCard(card){
  unFlipCard(card);
  card.classList.add('set');
}

/** function to disable or enable card button */
function enableDisable(card){
  if(card.disabled = true){
    card.disabled = false;
  } else {
    card.disabled = true;
  }
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  // ... you need to write this ...
  const gameBoard = document.getElementById("game");
  
  let activeChild;
  for(const child of gameBoard.children){
    if(child.classList.contains('active')){
      secondCard = true;
      activeChild = child;
    }
  }
  if(!secondCard){
    flipCard(evt.target);
  } else {
    flipCard(evt.target);
    for(const child of gameBoard.children){
      enableDisable(child);
    }
    let color1 = Array.from(activeChild.classList)[0]
    let color2 = Array.from(evt.target.classList)[0]
    console.log(color1,color2)
    if(color1!==color2){
      console.log('do timeout')
      setTimeout(function(){
        unFlipCard(evt.target);
        unFlipCard(activeChild);  
      }, 1500);
    } else {
      setCard(evt.target);
      setCard(activeChild);

    }
    enableDisable(evt.target);
    enableDisable(activeChild);
    secondCard = false;
  }
  console.log(secondCard);
}
