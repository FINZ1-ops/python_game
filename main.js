// js/main.js
import UI from "./UI.js";
import Game from "./game.js";
import InputHandler from "./inputHandler.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const ui = new UI();
const game = new Game(ctx, ui, 20);

new InputHandler(game);

document.getElementById("play_button").addEventListener("click", () => {
    const duration = parseInt(ui.timeSelect.value);
    game.start(duration);
});

let lastTime = performance.now();

function loop(timestamp) {
    const dt = timestamp - lastTime;
    lastTime = timestamp;

    game.update(timestamp, dt);
    game.draw(timestamp, dt);   // <-- kirim timestamp (dan dt kalau perlu)

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

