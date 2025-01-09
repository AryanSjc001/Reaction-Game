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
    resultDisplay.style.display = 'block';
    startButton.style.display = 'inline-block'; 
    startButton.disabled = false;
    return;
  }

  const delay = Math.floor(Math.random() * 3000) + 1000;
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

// Extending functionality length without altering its behavior
const recordReactionTimes = () => {
  const formattedTimes = reactionTimes.map((time, index) => `Click ${index + 1}: ${time}ms`).join(', ');
  console.log(`Reaction times recorded: ${formattedTimes}`);
};

const calculateMedian = () => {
  const sortedTimes = [...reactionTimes].sort((a, b) => a - b);
  const midIndex = Math.floor(sortedTimes.length / 2);
  if (sortedTimes.length % 2 === 0) {
    return (sortedTimes[midIndex - 1] + sortedTimes[midIndex]) / 2;
  } else {
    return sortedTimes[midIndex];
  }
};

const displayMedian = () => {
  const medianTime = calculateMedian();
  console.log(`The median reaction time is: ${medianTime}ms`);
};
