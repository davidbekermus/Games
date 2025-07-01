// https://deckofcardsapi.com/static/img/back.png

export class Deck {
  constructor() {
    this.id    = null;
    this.ready = fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=4")
      .then(res => res.json())
      .then(data => { this.id = data.deck_id; });
  }

  async getOneCard() {
    await this.ready;

    const res       = await fetch(`https://deckofcardsapi.com/api/deck/${this.id}/draw/?count=1`);
    const { cards } = await res.json();
    const c         = cards[0];

    const numeric = ["JACK","QUEEN","KING"].includes(c.value)
      ? 10
      : c.value === "ACE"
        ? 11
        : Number(c.value);

    return {
      code:  c.code,  
      value: numeric, 
      suit:  c.suit,  
      image: c.image 
    };
  }
}


  //        - json()
  // {
  //   "success": true,
  //   "deck_id": "brjs00jeibq0",
  //   "cards": [
  //     {
  //       "code": "QC",
  //       "image": "https://deckofcardsapi.com/static/img/QC.png",
  //       "images": {
  //         "svg": "https://deckofcardsapi.com/static/img/QC.svg",
  //         "png": "https://deckofcardsapi.com/static/img/QC.png"
  //       },
  //       "value": "QUEEN",
  //       "suit": "CLUBS"
  //     }
  //   ],
  //   "remaining": 51
  // }

  // async getOneCard(turn) {
  //   await this.initDeck;
  //   let value = null;
  //   await fetch(
  //     `https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //         data.cards.forEach((v) => {
  //             value = Number(v.value);
  //       });

  //       if (value == "JACK" || value == "KING" || value == "QUEEN") {
  //           value = 10;
  //       }
  //       if (value == "ACE") {
  //         value = 11; //    צריך להוסיף כאן את האפשרות של לבחור אם זה 11 אן 1
  //       }
  //       return value;
  //     })
  //     .then((value) => {
  //         if (turn == 0) {
  //           this.playerCards.push(value);
  //       } else {
  //         this.dilerCards.push(value);
  //       }
  //     });
  //   }

