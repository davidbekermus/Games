// Game.js
// Game.js
export class Game {
  constructor(deck) {
    this.deck        = deck;
    this.playerCards = [];   // מערך של אובייקטי קלפים
    this.dilerCards  = [];   // מערך של אובייקטי קלפים לדילר
    this.status      = null; // 'player' | 'dealer' | 'finished'
  }

  /** מחשבת סכום יד עם התאמת ACE מ־11 ל־1 במידת הצורך */
  static calcSum(hand) {
    let sum  = hand.reduce((acc, card) => acc + card.value, 0);
    let aces = hand.filter(card => card.value === 11).length;
    while (sum > 21 && aces > 0) {
      sum  -= 10;  // מורידים 10 כדי להפוך ACE מ-11 ל-1
      aces -= 1;
    }
    return sum;
  }

  /** מחלק לשחקן ולדילר 2 קלפים ראשוניים */
  async prepareGame() {
    this.playerCards = [];
    this.dilerCards  = [];

    // שני קלפים לשחקן
    for (let i = 0; i < 2; i++) {
      const card = await this.deck.getOneCard();
      this.playerCards.push(card);
    }
    // שני קלפים לדילר
    for (let i = 0; i < 2; i++) {
      const card = await this.deck.getOneCard();
      this.dilerCards.push(card);
    }

    // מתחילים במצב השחקן
    this.status = 'player';
  }

  /** לוקח קלף לשחקן (hit) */
  async playerTurn() {
    if (this.status !== 'player') return;

    const card = await this.deck.getOneCard();
    this.playerCards.push(card);

    if (Game.calcSum(this.playerCards) > 21) {
      this.status = 'finished';
      return 'bust';
    }
    return 'continue';
  }

  /** תור הדילר: מושך עד 17 ומעלה */
  async dilerTurn() {
    if (this.status !== 'player') return;

    this.status = 'dealer';
    while (Game.calcSum(this.dilerCards) < 17) {
      const card = await this.deck.getOneCard();
      this.dilerCards.push(card);
    }
    this.status = 'finished';

    if (Game.calcSum(this.dilerCards) > 21) {
      return 'bust';
    }
  }

  /** מחזיר את תוצאת המשחק */
  calculateWin() {
    const p = Game.calcSum(this.playerCards);
    const d = Game.calcSum(this.dilerCards);

    if (p > 21) return 'Dealer wins!';
    if (d > 21) return 'Player wins!';
    if (p > d)  return 'Player wins!';
    if (d > p)  return 'Dealer wins!';
    return 'Tie!';
  }
}

// const winLoseBord = document.createElement("div");
// if (p > 21) winLoseBord.textContent = "Dealer wins!";
// if (d > 21) winLoseBord.textContent = "Player wins!";
// if (p > d) winLoseBord.textContent = "Player wins!";
// if (d > p) winLoseBord.textContent = "Dealer wins!";
// else winLoseBord.textContent = "Tie!";
// inBord.appendChild(winLoseBord);
