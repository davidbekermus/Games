const dealerCardsDiv = document.getElementById("dealerCards");
const playerCardsDiv = document.getElementById("playerCards");
const addCardsBtn = document.getElementById("addCards");
const stopAddBtn = document.getElementById("stopAdd");


function addDeskCount() {
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then((response) => response.json())
    .then((obj) => {
      console.log(obj);
      fetch(`https://deckofcardsapi.com/api/deck/${obj.deck_id}/draw/?count=5`)
        .then((response) => response.json())
        .then((data) => {
          // data.cards הוא מערך של קלפים
          data.cards.forEach((card) => {
            const img = document.createElement("img");
            img.src = card.image; // זו הגישה ל-key בשם "image"
            document.body.appendChild(img); // מוסיף את התמונה לדף
          });
        });
    });
}
addCardsBtn.addEventListener("click", addDeskCount);
// i apple
