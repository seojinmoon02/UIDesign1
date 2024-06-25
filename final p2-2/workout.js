let metronomeInterval;
let currentBPM = 100; // Default BPM

function getTimerValue() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const time = urlParams.get('time');
    const workout = urlParams.get('workout');

    if (workout) {
        document.getElementById('workout-name').textContent = decodeURIComponent(workout);
    }

    console.log(`Timer value requested for: ${time}`);

    switch (time) {
        case '5min': return 5 * 60;
        case '10min': return 10 * 60;
        case '30min': return 30 * 60;
        case '1hour': return 60 * 60;
        default: return 0;
    }
}

function startTimer() {
    const timer = document.getElementById('timer');
    const progressCircle = document.querySelector('.progress-ring__circle');
    const radius = progressCircle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;

    let time = getTimerValue();
    let totalTime = time;

    if (time === 0) {
        console.error('Invalid timer value. Timer cannot start.');
        timer.textContent = 'Invalid Time';
        return;
    }

    function setProgress(percent) {
        const offset = circumference - percent / 100 * circumference;
        progressCircle.style.strokeDashoffset = offset;
    }

    let interval = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        setProgress((totalTime - time) / totalTime * 100);
        time--;
        if (time < 0) {
            clearInterval(interval);
            timer.textContent = 'Time Up!';
            setProgress(100);
            window.location.href = 'congratulations.html';
        }
    }, 1000);
}

function toggleMetronome() {
    const metronomeButton = document.getElementById('metronome-icon');
    if (metronomeButton.src.includes('play-icon.png')) {
        metronomeInterval = startMetronome();
        metronomeButton.src = 'stop-icon.png';
    } else {
        stopMetronome();
        metronomeButton.src = 'play-icon.png';
    }
}

function startMetronome() {
    const interval = 60 / currentBPM * 1000;
    let tick = true;

    metronomeInterval = setInterval(() => {
        document.getElementById('bpm-number').style.color = tick ? 'red' : '#FFBD25';
        tick = !tick;
    }, interval / 2);

    return metronomeInterval;
}

function stopMetronome() {
    clearInterval(metronomeInterval);
    document.getElementById('bpm-number').style.color = '#FFBD25';
}

function setBPM(bpm) {
    currentBPM = bpm;
    document.getElementById('bpm-number').textContent = bpm;

    if (metronomeInterval) {
        stopMetronome();
        startMetronome();
    }
}

window.onload = () => {
    startTimer();
    document.addEventListener('keydown', handleKeyPress);
};
