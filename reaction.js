const startButton = document.getElementById('startButton');
const circle = document.getElementById('circle');
const resultDisplay = document.getElementById('result');
const instructions = document.getElementById('instructions');
const container = document.querySelector('.game-container');

let startTime;
let reactionTimes = [];
let clicksRemaining = 10;

function getRandomPosition() {
  const containerRect = container.getBoundingClientRect();
  const x = Math.random() * (containerRect.width - 50);
  const y = Math.random() * (containerRect.height - 50);
  return { x, y };
}

startButton.addEventListener('click', () => {
  // Hide text elements
  startButton.style.display = 'none';
  instructions.style.display = 'none';
  resultDisplay.textContent = '';
  resultDisplay.style.display = 'none';

  reactionTimes = [];
  clicksRemaining = 10;
  showCircle();
});

function showCircle() {
  if (clicksRemaining === 0) {
    const averageTime =
      reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;
    resultDisplay.textContent = `Game Over! Your average reaction time is ${Math.round(
      averageTime
    )} ms.`;
    resultDisplay.style.display = 'block'; // Show result after game ends
    startButton.style.display = 'inline-block'; // Show start button
    startButton.disabled = false;
    return;
  }

  const delay = Math.floor(Math.random() * 3000) + 1000; // 1 to 4 seconds
  const { x, y } = getRandomPosition();

  setTimeout(() => {
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.style.display = 'block';
    startTime = new Date().getTime();
  }, delay);
}

circle.addEventListener('click', () => {
  const reactionTime = new Date().getTime() - startTime;
  reactionTimes.push(reactionTime);
  clicksRemaining--;
  circle.style.display = 'none';
  showCircle();
});
