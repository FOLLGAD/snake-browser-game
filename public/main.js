const gameBoard = document.getElementById('game-board');
let scoreDisplay = document.getElementById('score');
let score = 0;
let snake = [{ top: 10, left: 10 }];
let direction = { top: 0, left: 0 };
let food = null;

function updateGame() {
    if (food === null) {
        food = { top: Math.floor(Math.random() * 20), left: Math.floor(Math.random() * 20) };
    }

    const head = { ...snake[0] }; // copy head
    head.top += direction.top;
    head.left += direction.left;

    if (head.top === food.top && head.left === food.left) {
        food = null;
        score += 10;
    } else {
        snake.pop();
    }

    snake.unshift(head);

    gameBoard.innerHTML = '';
    snake.forEach(part => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = part.top;
        snakeElement.style.gridColumnStart = part.left;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });

    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.top;
    foodElement.style.gridColumnStart = food.left;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);

    scoreDisplay.textContent = `Score: ${score}`;
}

setInterval(updateGame, 200);

window.addEventListener('keydown', e => {
    switch(e.key) {
        case 'ArrowUp': direction = { top: -1, left: 0 }; break;
        case 'ArrowDown': direction = { top: 1, left: 0 }; break;
        case 'ArrowLeft': direction = { top: 0, left: -1 }; break;
        case 'ArrowRight': direction = { top: 0, left: 1 }; break;
    }
});
