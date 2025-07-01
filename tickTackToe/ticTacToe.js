const result = document.querySelector('#result');

let clickCount = 0; // Initialize click count
let gridstate = Array(3).fill().map(() => Array(3).fill('')); // Initialize grid state

function onButtonClick(event) {
    const buttonIndex = event.target.dataset.index; // Get the index of the clicked button
    const row = Math.floor(buttonIndex / 3); // Calculate the row index
    const col = buttonIndex % 3; // Calculate the column index

    if (gridstate[row][col] !== '') { // Check if the button has already been clicked
        return; // Ignore clicks on already clicked buttons
    }
    clickCount++; // Increment click count
    if (clickCount % 2 === 1) { // Odd number of clicks: 'X'
        gridstate[row][col] = 'X';
        event.target.textContent = 'X'; // Update button text to 'X'
    } else { // Even number of clicks: 'O'
        gridstate[row][col] = 'O';
        event.target.textContent = 'O'; // Update button text to 'O'
    }

    const winner = whoWon(gridstate);
    if (winner) {
        result.textContent = `Winner: ${winner}`; // Display the winner
        result.classList.remove('hidden'); // Show the result
        disableButtons(); // Disable further clicks
    } else if (clickCount === 9) {
        result.textContent = 'Draw!'; // Display draw message
        result.classList.remove('hidden'); // Show the result
    }
}

function disableButtons() {
    const buttons = document.querySelectorAll('.toggle-btn');
    buttons.forEach(button => {
        button.disabled = true; // Disable all buttons
    });
}

function resetGame() {
    gridstate = Array(3).fill().map(() => Array(3).fill('')); // Reset the grid state
    clickCount = 0; // Reset click count
    result.textContent = ''; // Clear the result display
    result.classList.add('hidden'); // Hide the result
    const buttons = document.querySelectorAll('.toggle-btn');
    buttons.forEach(button => {
        button.textContent = ''; // Clear button text
        button.disabled = false; // Enable all buttons
    });
}

function columns(arr, n) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(arr[i][n]); // Push the column numbers into the array
    }
    return result;
}

function diagonal(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(arr[i][i]); // Push the diagonal numbers into the array
    }
    return result;
}

function otherDiagonal(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(arr[i][arr.length - 1 - i]); // Push the other diagonal numbers into the array
    }
    return result;
}

function isSame(arr) {
    return arr[0] !== '' && arr[0] === arr[1] && arr[0] === arr[2]; // Check if all elements are the same
}

function whoWon(grid) {
    for (let i = 0; i < 3; i++) {
        if (isSame(grid[i])) {
            return grid[i][0]; // Return the winner from a row
        }
    }
    for (let i = 0; i < 3; i++) {
        if (isSame(columns(grid, i))) {
            return grid[0][i]; // Return the winner from a column
        }
    }
    if (isSame(diagonal(grid))) {
        return grid[0][0]; // Return the winner from the main diagonal.
    }
    if (isSame(otherDiagonal(grid))) {
        return grid[0][2]; // Return the winner from the other diagonal
    }
    return null; // No winner yet
}

// Assign data-index to buttons and add event listeners
const buttons = document.querySelectorAll('.toggle-btn');
buttons.forEach((button, index) => {
    button.dataset.index = index; // Assign a data-index to each button
    button.addEventListener('click', onButtonClick);
});

// Add event listener to reset button
const resetBtn = document.querySelector('#resetBtn');
resetBtn.addEventListener('click', resetGame);

