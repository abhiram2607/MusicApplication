document.addEventListener("DOMContentLoaded", function() {
    // Navigation from welcome page to player page
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.addEventListener('click', function() {
            // Add a fade-out effect before navigating
            document.body.classList.add('fade-out');
            setTimeout(function() {
                window.location.href = 'index.html';
            }, 1000); // Adjust the timeout to match the fade-out duration
        });
    }

    // Player page functionality
    if (window.location.pathname.includes('index.html')) {
        const audio = new Audio();
        let isPlaying = false;
        let currentTrack = 0;
        const playlist = [
            { title: "Track 1", artist: "Marshmello", src: "Alone.mp3", albumArt: "marshmello.jpeg" },
            { title: "Track 2", artist: "Marshmello & Demi Lavato", src: "Itsok.mp3", albumArt: "car.jpg" },
            // Add more tracks as needed
        ];

        const playPauseButton = document.getElementById('playPauseButton');
        const prevButton = document.getElementById('prevButton');
        const nextButton = document.getElementById('nextButton');
        const progressBar = document.getElementById('progressBar');
        const volumeBar = document.getElementById('volumeBar'); // Volume control bar
        const trackTitle = document.getElementById('trackTitle');
        const trackArtist = document.getElementById('trackArtist');
        const albumArt = document.getElementById('albumArt');
        const playlistContainer = document.getElementById('playlist');
        const nightModeToggle = document.getElementById('nightModeToggle');
        const drivingModeToggle = document.getElementById('drivingModeToggle');
        const feedbackButton = document.getElementById('feedbackButton');
        const copyrightInfo = document.getElementById('copyrightInfo');
        const feedbackModal = new bootstrap.Modal(document.getElementById('feedbackModal'));
        const copyrightModal = new bootstrap.Modal(document.getElementById('copyrightModal'));
        const startTimeInput = document.getElementById('startTime');
        const endTimeInput = document.getElementById('endTime');
        const trimButton = document.getElementById('trimButton');

        function loadTrack(index) {
            const track = playlist[index];
            audio.src = track.src;
            trackTitle.textContent = track.title;
            trackArtist.textContent = track.artist;
            albumArt.src = track.albumArt;
            currentTrack = index;
        }

        function playTrack() {
            audio.play();
            isPlaying = true;
            playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        }

        function pauseTrack() {
            audio.pause();
            isPlaying = false;
            playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        }

        playPauseButton.addEventListener('click', function() {
            if (isPlaying) {
                pauseTrack();
            } else {
                playTrack();
            }
        });

        prevButton.addEventListener('click', function() {
            if (currentTrack > 0) {
                loadTrack(currentTrack - 1);
                playTrack();
            }
        });

        nextButton.addEventListener('click', function() {
            if (currentTrack < playlist.length - 1) {
                loadTrack(currentTrack + 1);
                playTrack();
            }
        });

        audio.addEventListener('timeupdate', function() {
            progressBar.value = (audio.currentTime / audio.duration) * 100;
        });

        progressBar.addEventListener('input', function() {
            audio.currentTime = (progressBar.value / 100) * audio.duration;
        });

        playlist.forEach((track, index) => {
            const listItem = document.createElement('a');
            listItem.classList.add('list-group-item', 'list-group-item-action');
            listItem.innerHTML = `${track.title} - ${track.artist}`;
            listItem.addEventListener('click', function() {
                loadTrack(index);
                playTrack();
            });
            playlistContainer.appendChild(listItem);
        });

        // Load the first track by default
        loadTrack(currentTrack);

        // Night Mode Toggle
        nightModeToggle.addEventListener('change', function() {
            if (nightModeToggle.checked) {
                document.body.classList.add('night-mode');
                drivingModeToggle.checked = false; // Disable driving mode
                audio.volume = volumeBar.value / 100; // Restore volume
                document.body.classList.remove('driving-mode');
            } else {
                document.body.classList.remove('night-mode');
            }
        });

        // Driving Mode Toggle
        drivingModeToggle.addEventListener('change', function() {
            if (drivingModeToggle.checked) {
                document.body.classList.add('driving-mode');
                nightModeToggle.checked = false; // Disable night mode
                document.body.classList.remove('night-mode');
                audio.volume = 0.6; // Decrease volume to 60%
                volumeBar.value = 60; // Update volume bar to 60%
            } else {
                document.body.classList.remove('driving-mode');
                audio.volume = volumeBar.value / 100; // Restore volume
            }
        });

        // Volume Control
        volumeBar.addEventListener('input', function() {
            audio.volume = volumeBar.value / 100;
        });

        // Feedback Modal
        feedbackButton.addEventListener('click', function() {
            feedbackModal.show();
        });

        document.getElementById('feedbackForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const feedbackText = document.getElementById('feedbackText').value;
            alert('Feedback submitted: ' + feedbackText);
            feedbackModal.hide();
        });

        // Copyright Modal
        copyrightInfo.addEventListener('click', function() {
            copyrightModal.show();
        });

        // Audio Trimming
        trimButton.addEventListener('click', function() {
            const startTime = parseFloat(startTimeInput.value);
            const endTime = parseFloat(endTimeInput.value);
            if (isNaN(startTime) || isNaN(endTime) || startTime >= endTime) {
                alert('Invalid trim times.');
                return;
            }
            // Apply trimming logic here (this is a placeholder)
            alert(`Audio trimmed from ${startTime} to ${endTime} seconds.`);
        });
    }
});

