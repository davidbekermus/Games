import { Deck } from "./Deck.js";
import { Game } from "./Game.js";

const dealerDiv   = document.querySelector(".diler");
const playerDiv   = document.querySelector(".player");
const btnHit      = document.querySelector(".hit");
const btnStop     = document.querySelector(".stop");
const btnRestart  = document.querySelector(".restart");
const messageDiv  = document.querySelector(".message");
const spinner     = document.getElementById("spinner");
const dealerSum   = document.getElementById("dealer-sum");
const playerSum   = document.getElementById("player-sum");
const sndHit      = document.getElementById("snd-hit");
const sndReveal   = document.getElementById("snd-reveal");
const bgMusic     = document.getElementById("bg-music");

bgMusic.volume = 0.2;
bgMusic.play().catch(() => {});

// עזרי ספינר
function showSpinner() { spinner.style.display = "block"; }
function hideSpinner() { spinner.style.display = "none"; }

// עדכון סכומים
function updateSums() {
  playerSum.textContent = Game.calcSum(game.playerCards);
  if (game.status === "finished" || game.status === "dealer") {
    dealerSum.textContent = Game.calcSum(game.dilerCards);
  } else {
    dealerSum.textContent = Game.calcSum([ game.dilerCards[0] ]);
  }
}

/**
 * מציירת יד של קלפים.
 * @param {HTMLElement} container 
 * @param {Array} hand 
 * @param {boolean} animateAll - אם true מוסיפים אנימציה לכל הקלפים, אחרת רק לקלף החדש
 */
async function renderHand(container, hand, animateAll = false) {
  container.innerHTML = "";
  hand.forEach((card, idx) => {
    const img = document.createElement("img");
    img.src = card.image;
    img.alt = card.code;
    img.width = 80;
    img.classList.add("card-img");
    // מוסיפים אנימציית deal לפי הפרמטר
    if (animateAll || idx === hand.length - 1) {
      img.classList.add("deal");
      img.addEventListener("animationend", () => img.classList.remove("deal"));
    }
    container.append(img);
  });
  updateSums();
}

/**
 * מציירת יד של הדילר בשלב ההתחלתי:
 * - קלף ראשון גלוי
 * - קלף שני מוסתר
 * @param {boolean} animateAll 
 */
async function renderDealerHidden(animateAll = false) {
  dealerDiv.innerHTML = "";
  // קלף ראשון
  const first = game.dilerCards[0];
  const img   = document.createElement("img");
  img.src     = first.image;
  img.alt     = first.code;
  img.width   = 80;
  img.classList.add("card-img");
  if (animateAll) {
    img.classList.add("deal");
    img.addEventListener("animationend", () => img.classList.remove("deal"));
  }
  dealerDiv.append(img);

  // גב מוסתר
  const back = document.createElement("div");
  back.classList.add("card-back");
  if (animateAll) {
    back.classList.add("deal");
    back.addEventListener("animationend", () => back.classList.remove("deal"));
  }
  dealerDiv.append(back);

  updateSums();
}

// חושף את כל הקלפים של הדילר עם אנימציה על האחרון
async function revealDealer() {
  sndReveal.currentTime = 0;
  sndReveal.play();
  await renderHand(dealerDiv, game.dilerCards, false);
}

let deck, game;

// מסיימים את המשחק
function endGame() {
  btnHit.disabled = btnStop.disabled = true;
  btnRestart.style.display = "inline-block";
}

// אתחול משחק חדש
async function startNewGame() {
  messageDiv.textContent = "";
  btnHit.disabled = btnStop.disabled = false;
  btnRestart.style.display = "none";
  dealerDiv.innerHTML = playerDiv.innerHTML = "";
  dealerSum.textContent = playerSum.textContent = "";

  deck = new Deck();
  game = new Game(deck);

  showSpinner();
  await game.prepareGame();
  hideSpinner();

  // כלל הקלפים הראשוניים מקבלים אנימציית deal
  await renderHand(playerDiv, game.playerCards, true);
  await renderDealerHidden(true);
}

// מאזיני כפתורים
btnHit.addEventListener("click", async () => {
  if (game.status !== "player") return;
  sndHit.currentTime = 0; sndHit.play();
  showSpinner();
  const card = await deck.getOneCard();
  hideSpinner();
  game.playerCards.push(card);
  // רק הקלף החדש מקבל אנימציה
  await renderHand(playerDiv, game.playerCards, false);
  if (Game.calcSum(game.playerCards) > 21) {
    game.status = "finished";
    await revealDealer();
    messageDiv.textContent = "You busted! Dealer wins.";
    endGame();
  }
});

btnStop.addEventListener("click", async () => {
  if (game.status !== "player") return;
  game.status = "dealer";
  showSpinner();
  while (Game.calcSum(game.dilerCards) < 17) {
    const card = await deck.getOneCard();
    game.dilerCards.push(card);
  }
  hideSpinner();
  await revealDealer();
  messageDiv.textContent = game.calculateWin();
  endGame();
});

btnRestart.addEventListener("click", async () => {
  await startNewGame();
});

// הפעלת משחק בפעם הראשונה
(async () => {
  await startNewGame();
})();
