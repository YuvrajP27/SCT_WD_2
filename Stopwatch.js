let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const timeDisplay = document.getElementById('time-display');

function formatTime(time) {
  const date = new Date(time);
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
  const currentTime = Date.now() - startTime + elapsedTime;
  timeDisplay.textContent = formatTime(currentTime);
}

document.getElementById('startBtn').onclick = () => {
  if (!isRunning) {
    startTime = Date.now();
    timerInterval = setInterval(updateDisplay, 10);
    isRunning = true;
  }
};

document.getElementById('pauseBtn').onclick = () => {
  if (isRunning) {
    clearInterval(timerInterval);
    elapsedTime += Date.now() - startTime;
    isRunning = false;
  }
};

document.getElementById('resetBtn').onclick = () => {
  clearInterval(timerInterval);
  elapsedTime = 0;
  isRunning = false;
  timeDisplay.textContent = '00:00:00.000';
  document.getElementById('lap-times').innerHTML = '';
};

document.getElementById('lapBtn').onclick = () => {
  if (isRunning) {
    const lapTime = timeDisplay.textContent;
    const li = document.createElement('li');
    li.textContent = `Lap: ${lapTime}`;
    document.getElementById('lap-times').appendChild(li);
  }
};