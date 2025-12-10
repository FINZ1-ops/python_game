import Snake from "./snake.js";
import Apple from "./apple.js";

export default class Game {
    constructor(ctx, ui, gridSize) {
        this.ctx = ctx;
        this.GS = gridSize;

        this.TC = ctx.canvas.width / gridSize;

        this.snake = new Snake(this.GS, this.TC);
        this.apple = new Apple(this.TC);
        this.ui = ui;                                                               

        this.running = false;
        this.over = true;

        this.totalTime = 0;
        this.timeRemaining = 0;
        this.timerId = null;

        this.highScore = localStorage.getItem("snake_highscore") || 6;

        // movement speed (custom)
        this.moveSpeed = 10;               // langkah per detik
        this.moveDelay = 1000 / this.moveSpeed;
        this.lastMoveTime = 0;
    }

    start(duration) {
        this.totalTime = duration;
        this.timeRemaining = duration;

        this.ui.hideMenu();
        this.snake.reset();
        this.apple.spawn(this.snake.trail);

        this.running = true;
        this.over = false;

        this.startTimer();
    }

    startTimer() {
        if (this.timerId) clearInterval(this.timerId);
        this.timerId = setInterval(() => {
            if (!this.running) return;

            this.timeRemaining--;
            this.ui.updateTimer(this.timeRemaining);

            if (this.timeRemaining <= 0) {
                this.gameOver("Waktu Habis!");
            }
        }, 1000);
    }

    gameOver(reason) {
        this.running = false;
        this.over = true;

        clearInterval(this.timerId);

        if (this.snake.score > this.highScore) {
            this.highScore = this.snake.score;
            localStorage.setItem("snake_highscore", this.highScore);
        }

        this.ui.showMenu(`
            GAME OVER!<br>
            ${reason}<br>
            Skor Akhir: ${this.snake.score}<br>
            Tekan Play untuk mulai lagi.
        `);
    }

update(timestamp) {
    if (!this.running) return;

    // Update apple timer setiap frame
    this.apple.update(this.snake.trail, timestamp);

    // Kontrol kecepatan gerak ular
    if (timestamp - this.lastMoveTime >= this.moveDelay) {

        this.lastMoveTime = timestamp;
        this.snake.move();

        // collision tembok
        if (this.snake.isOutOfBounds()) {
            this.gameOver("Menabrak Tembok!");
            return;
        }

        // collision diri sendiri
        if (this.snake.isCollidingWithSelf()) {
            this.gameOver("Menabrak Diri Sendiri!");
            return;
        }

        // makan apel
       if (this.snake.x === this.apple.x && this.snake.y === this.apple.y) {

    switch (this.apple.type) {
        case "normal":
            this.snake.grow(); // +1
            break;

        case "gold":
            this.snake.grow();
            this.snake.grow(); // +2
            break;

        case "poison":
            this.snake.shrink(); // kita buat di snake.js
            break;
    }

    this.apple.eaten(this.snake.trail);
}


        this.snake.updateTrail();
        this.ui.updateScore(this.snake.score, this.highScore);
    }
}


    draw(timestamp) {
    const ctx = this.ctx;

    // background checker
    for (let y = 0; y < this.TC; y++) {
        for (let x = 0; x < this.TC; x++) {
            ctx.fillStyle = (x + y) % 2 === 0 ? "#21e75cff" : "#08cd9bff";
            ctx.fillRect(x * this.GS, y * this.GS, this.GS, this.GS);
        }
    }

    // snake
    ctx.fillStyle = "rgba(0, 8, 92, 0.8)";  
    this.snake.trail.forEach(p => {
        ctx.fillRect(p.x * this.GS, p.y * this.GS, this.GS - 1, this.GS - 1);
    });

    // head lebih gelap
    ctx.fillStyle = "rgba(0, 20, 150, 0.95)";
    ctx.fillRect(this.snake.x * this.GS, this.snake.y * this.GS, this.GS - 1, this.GS - 1);

    // apple
    this.apple.draw(ctx, this.GS, timestamp);
}

}