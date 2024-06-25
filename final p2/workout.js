let metronomeInterval;

function getTimerValue() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const time = urlParams.get('time');

    console.log(`Timer value requested for: ${time}`); // Debug log

    switch (time) {
        case '5min': return 5 * 60; // 5 minutes in seconds
        case '10min': return 10 * 60; // Consistent naming
        case '30min': return 30 * 60;
        case '1hour': return 60 * 60;
        default: return 0;
    }
}

function startTimer() {
    const timer = document.getElementById('timer');
    let time = getTimerValue();

    if (time === 0) {
        console.error('Invalid timer value. Timer cannot start.'); // Error log
        timer.textContent = 'Invalid Time';
        return;
    }

    let interval = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        time--;
        if (time < 0) {
            clearInterval(interval);
            timer.textContent = 'Time Up!';
        }
    }, 1000);
}

function toggleMetronome() {
    const metronomeButton = document.querySelector('.metronome-button');
    if (metronomeButton.textContent === 'Start Metronome') {
        startMetronome();
        metronomeButton.textContent = 'Stop Metronome';
    } else {
        stopMetronome();
        metronomeButton.textContent = 'Start Metronome';
    }
}

function startMetronome() {
    const bpm = document.getElementById('metronome-slider').value;
    const interval = 60 / bpm * 1000;
    let tick = true;

    metronomeInterval = setInterval(() => {
        document.getElementById('metronome-display').style.color = tick ? 'red' : '#32CD32'; // Green
        tick = !tick;
    }, interval / 2);
}

function stopMetronome() {
    clearInterval(metronomeInterval);
    document.getElementById('metronome-display').style.color = '#32CD32';
}

// Initialize the timer when the page loads
window.onload = startTimer;
