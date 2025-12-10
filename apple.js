// js/Apple.js
export default class Apple {
    constructor(tileCount) {
        this.TC = tileCount;

        this.visible = true;
        this.spawnTime = 0;
        this.lifetime = 5000; // 5 detik

        this.x = 0;
        this.y = 0;

        this.type="normal";
        }

        randomType() {
        const r = Math.random();

        if (r < 0.1) return "poison";    // 10%
        if (r < 0.3) return "gold";      // 20%
        return "normal";                 // 70%
    }

    // SPAWN apel baru
    spawn(trail) {
        let valid = false;

        while (!valid) {
            this.x = Math.floor(Math.random() * this.TC);
            this.y = Math.floor(Math.random() * this.TC);

            valid = !trail.some(p => p.x === this.x && p.y === this.y);
        }

        this.visible = true;
        this.spawnTime = performance.now();
    }

    // Update waktu apel
    update(trail, now) {
        if (!this.visible) return;

        // hilang setelah 5 detik → respawn
        if (now - this.spawnTime >= this.lifetime) {
            this.visible = false;       // Hilangkan dulu 
            this.spawn(trail);          // Spawn apel baru 
        }
    }

    // ketika dimakan
    eaten(trail) {
        this.spawn(trail);
    }

   draw(ctx, gridSize, timestamp) {
        if (!this.visible) return;

        let color = "red";

        // warna berdasarkan apple type
        switch (this.type) {
            case "gold":
                color = "gold";
                break;
            case "poison":
                color = "purple";
                break;
        }

        // apel normal → berkedip 1 detik sebelum hilang
        if (this.type === "normal") {
            const timeLeft = this.lifetime - (timestamp - this.spawnTime);

            if (timeLeft < 1000) {
                // kedip (blink)
                if (Math.floor(timestamp / 100) % 2 === 0) {
                    return; // tidak digambar (invisible)
                }
            }
        }

        ctx.fillStyle = color;
        ctx.fillRect(
            this.x * gridSize,
            this.y * gridSize,
            gridSize - 1,
            gridSize - 1
        );
    }
}
