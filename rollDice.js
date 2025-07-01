const dotPosition = {
  1:[4],
  2:[0, 8],
  3:[0, 4, 8],
  4:[0, 2, 6, 8],
  5:[0, 2, 4, 6, 8],
  6:[0, 2, 3, 5, 6, 8]
};

function createDiceFace(dieElement, value) {
    dieElement.innerHTML = ''; 
  const position = dotPosition[value];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    if (position.includes(i)) {
     const dot = document.createElement('div'); 
      dot.classList.add('dot'); 
      cell.appendChild(dot); 
  }
    dieElement.appendChild(cell); 
  }
}

function rollDice() {
    const die1 = document.querySelector('.die1'); 
    const die2 = document.querySelector('.die2'); 

    die1.classList.add('shake');
    die2.classList.add('shake'); 

    setTimeout(() => {
        die1.classList.remove('shake'); 
        die2.classList.remove('shake'); 
    const die1Value = Math.floor(Math.random() * 6) + 1;
    const die2Value = Math.floor(Math.random() * 6) + 1;
   
    createDiceFace(die1, die1Value); 
    createDiceFace(die2, die2Value); 
    },500);
}

rollDice(); 



