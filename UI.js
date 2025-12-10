    // js/UI.js
export default class UI {
    constructor() {
        this.menu = document.getElementById("game_menu");
        this.timeSelect = document.getElementById("time_select");
        this.timerDisplay = document.getElementById("timer_display");
        this.scoreDisplay = document.getElementById("score_display");
        this.highScoreDisplay = document.getElementById("high_score_display");
        this.message = this.menu.querySelector("h3");
    }

    showMenu(text) {
        this.message.innerHTML = text;
        this.menu.style.display = "flex";
    }

    hideMenu() {
        this.menu.style.display = "none";
    }

    updateTimer(value) {
        this.timerDisplay.innerText = value;
    }

    updateScore(score, highScore) {
        this.scoreDisplay.innerText = score;
        this.highScoreDisplay.innerText = highScore;
    }
}
