document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const openVideoPopup = document.getElementById('openVideoPopup');
    const closeVideoPopup = document.getElementById('closeVideoPopup');
    const videoPopup = document.getElementById('videoPopup');

    // Check the saved theme from local storage
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');

        // Save the theme to local storage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            localStorage.setItem('dark-mode', 'disabled');
        }
    });

    openVideoPopup.addEventListener('click', function () {
        videoPopup.style.display = 'flex';
    });

    closeVideoPopup.addEventListener('click', function () {
        videoPopup.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === videoPopup) {
            videoPopup.style.display = 'none';
        }
    });
});
