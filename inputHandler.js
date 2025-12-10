// js/InputHandler.js
export default class InputHandler {
    constructor(game) {
        document.addEventListener("keydown", (e) => {
            if (!game.running) return;

            switch (e.keyCode) {
                case 87: game.snake.setDirection(0, -1); break;
                case 83: game.snake.setDirection(0, 1); break;
                case 65: game.snake.setDirection(-1, 0); break;
                case 68: game.snake.setDirection(1, 0); break;
            }
        });
    }
}
