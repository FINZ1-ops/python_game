export default class Snake {
    constructor(gridSize, tileCount) {
        this.GS = gridSize;
        this.TC = tileCount;

        this.reset();
    }

    reset() {
        this.x = Math.floor(this.TC / 2);
        this.y = Math.floor(this.TC / 2);

        // start bergerak ke kanan
        this.vx = 1;
        this.vy = 0;

        this.tail = 6;
        this.score = 6;

        this.trail = [];
        this.initTrail();
    }

    initTrail() {
        this.trail = [];

        // Tubuh memanjang ke kanan (di belakang kepala)
        for (let i = 0; i < this.tail; i++) {
            this.trail.push({
                x: this.x - i,
                y: this.y
            });
        }
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
    }

    grow() {
        this.tail++;
        this.score++;
    }

    shrink() {
    if (this.tail > 1) {
        this.tail--;
        this.score--;
        this.trail.shift(); // remove 1 segment
    }
  }


    setDirection(vx, vy) {
        // Tidak boleh reverse 180°
        if (this.vx === -vx && this.vx !== 0) return;
        if (this.vy === -vy && this.vy !== 0) return;

        this.vx = vx;
        this.vy = vy;
    }

    updateTrail() {
        // tambah kepala baru
        this.trail.push({ x: this.x, y: this.y });

        // buang ekor lama
        while (this.trail.length > this.tail) {
            this.trail.shift();
        }
    }

    isCollidingWithSelf() {
        // cek tubuh (kecuali kepala)
        for (let i = 0; i < this.trail.length - 1; i++) {
            if (this.trail[i].x === this.x && this.trail[i].y === this.y) {
                return true;
            }
        }
        return false;
    }

    isOutOfBounds() {
        return (
            this.x < 0 ||
            this.x >= this.TC ||
            this.y < 0 ||
            this.y >= this.TC
        );
    }

    draw(ctx, GS) {
        ctx.fillStyle = "rgba(0, 8, 92, 0.8)";
        this.trail.forEach(p => {
            ctx.fillRect(p.x * GS, p.y * GS, GS - 1, GS - 1);
        });
    }
}
