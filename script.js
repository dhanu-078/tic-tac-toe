// Board representation using a 1D array (DSA Concept)
let board = Array(9).fill(''); // An array to represent the game board
let currentPlayer = 'X'; // Tracks the current player
const cells = document.querySelectorAll('.cell'); // HTML cells
const winnerDisplay = document.getElementById('winner'); // Winner display
const resetButton = document.getElementById('resetButton'); // Reset button

// Winning patterns (DSA Concept: Pattern Matching)
const winPatterns = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal 1
    [2, 4, 6], // Diagonal 2
];

// Function to check if there's a winner or a draw (DSA Concept: Traversal)
function checkWinner() {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]; // Return the winning player
        }
    }
    return board.includes('') ? null : 'Draw'; // Return 'Draw' if no empty cells
}

// Function to handle a cell click
function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (!board[cellIndex]) {
        board[cellIndex] = currentPlayer; // Update the board
        cell.textContent = currentPlayer; // Display the move
        cell.classList.add('taken');

        const result = checkWinner();
        if (result) {
            winnerDisplay.textContent = result === 'Draw' ? "It's a draw!" : `Player ${result} wins!`;
            cells.forEach(c => c.removeEventListener('click', handleCellClick)); // Disable further clicks
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
        }
    }
}

// Function to reset the game
function resetGame() {
    board.fill(''); // Reset the board (DSA Concept: Array Manipulation)
    currentPlayer = 'X'; // Reset to Player X
    winnerDisplay.textContent = ''; // Clear winner display
    cells.forEach(cell => {
        cell.textContent = ''; // Clear cell content
        cell.classList.remove('taken'); // Remove 'taken' class
        cell.addEventListener('click', handleCellClick); // Reattach event listeners
    });
}

// Add event listeners to cells and reset button
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
