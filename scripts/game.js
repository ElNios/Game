class Game {
    constructor() {
        this.player = null;
        this.enemies = [];
        this.projectiles = [];
        this.items = [];
        this.isGameRunning = false;
        this.isPaused = false;
        this.currentScreen = 'start';
        
        this.setupEventListeners();
        this.initializeScreens();
    }

    setupEventListeners() {
        // Handle game controls
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
        document.addEventListener('mousedown', this.handleMouseDown.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
        
        // Button listeners
        document.getElementById('start-button').addEventListener('click', () => this.changeScreen('character-select'));
        document.getElementById('instructions-button').addEventListener('click', () => this.changeScreen('instructions'));
        document.getElementById('start-battle').addEventListener('click', () => this.startGame());
        document.getElementById('pause-button').addEventListener('click', () => this.togglePause());
    }

    initializeScreens() {
        // Hide all screens except start
        document.querySelectorAll('.screen').forEach(screen => {
            if (screen.id !== 'start-screen') {
                screen.classList.add('hidden');
            }
        });
    }

    changeScreen(screenName) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.add('hidden');
        });
        document.getElementById(`${screenName}-screen`).classList.remove('hidden');
        this.currentScreen = screenName;
    }

    startGame() {
        this.isGameRunning = true;
        this.player = new Player();
        this.changeScreen('battle');
        this.gameLoop();
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        if (this.isPaused) {
            this.changeScreen('pause');
        } else {
            this.changeScreen('battle');
        }
    }

    gameLoop() {
        if (!this.isGameRunning) return;

        if (!this.isPaused) {
            this.update();
            this.render();
        }

        requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        this.player.update();
        this.updateEnemies();
        this.updateProjectiles();
        this.checkCollisions();
    }

    render() {
        // Render game state
        this.player.render();
        this.enemies.forEach(enemy => enemy.render());
        this.projectiles.forEach(projectile => projectile.render());
    }

    handleKeyDown(event) {
        if (!this.isGameRunning || this.isPaused) return;
        
        switch(event.key) {
            case 'w':
            case 'W':
                this.player.move('up');
                break;
            case 's':
            case 'S':
                this.player.move('down');
                break;
            case 'a':
            case 'A':
                this.player.move('left');
                break;
            case 'd':
            case 'D':
                this.player.move('right');
                break;
            case ' ':
                this.player.dash();
                break;
            case 'Escape':
                this.togglePause();
                break;
        }
    }

    handleMouseDown(event) {
        if (!this.isGameRunning || this.isPaused) return;
        
        if (event.button === 0) { // Left click
            this.player.toggleAiming(true);
        }
    }

    handleMouseUp(event) {
        if (!this.isGameRunning || this.isPaused) return;
        
        if (event.button === 0) { // Left click
            this.player.toggleAiming(false);
        }
    }
}

// Initialize game when window loads
window.addEventListener('load', () => {
    const game = new Game();
});