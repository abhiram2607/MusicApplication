function enterApp() {
    const welcomeContainer = document.querySelector('.welcome-container');
    welcomeContainer.style.animation = 'fadeOut 1.5s ease-in-out forwards';
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}


