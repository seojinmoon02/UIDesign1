document.addEventListener('DOMContentLoaded', function() {
    const videoGrid = document.getElementById('videoGrid');
    let videoCount = 6; // Initial video count

    function loadMoreVideos() {
        for (let i = 0; i < 6; i++) { // Load 6 more videos
            videoCount++;
            const videoItem = document.createElement('div');
            videoItem.className = 'video-item';
            videoItem.innerText = 'Video ' + videoCount;
            videoGrid.appendChild(videoItem);
        }
    }

    // Infinite scroll logic
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            loadMoreVideos();
        }
    });
});
