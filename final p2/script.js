function togglePlay() {
    var bgmButton = document.querySelector('.bgm-button');
    if (bgmButton.innerText === 'PLAY') {
        bgmButton.innerText = 'STOP';
    } else {
        bgmButton.innerText = 'PLAY';
    }
}
functionselectWorkout (time) {
 window.location.href= `workout.html?time=${time}`;
}
