function creatGrid(rows, cols) {
    const container = document.getElementById('grid-container');
    if (!container) {
        console.error('Grid container not found!');//
        return;
    }
    console.log('Grid container found. Creating grid...');
    

    for (let i = 1; i <= rows * cols; i++) {
        const gridItem = document.createElement('div'); // Create a new div element for each grid item
        gridItem.classList.add('grid-item'); // Add the class name for styling
        gridItem.textContent = ''; // Ensure grid item content is empty
        gridItem.style.backgroundColor = 'lightgray'; // Set a consistent background color

        const Button = document.createElement('button');
        Button.classList.add('btn'); // Add the class name for styling
        Button.textContent = ''; // Initialize button text as empty

        Button.addEventListener('click', function () {
            if (this.textContent === 'X') {
                this.textContent = 'O'; // Toggle between 'X' and 'O'
            } else {
                this.textContent = 'X';
            }
        });

        gridItem.appendChild(Button); // Append the button to the grid item
        container.appendChild(gridItem); // Append the grid item to the container
    }
    console.log('Grid created successfully.');
}

window.onload = function () {
    console.log('Window loaded. Initializing grid...');
    creatGrid(3, 3); // Ensure this function is correctly referenced
};

function onButtonClick(){
    if (this.textContent === 'X') {
        this.textContent = 'O'; // Toggle between 'X' and 'O
    } else {
        this.textContent = 'X';
    }
    //
}

