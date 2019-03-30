$(window).bind('load', function () {
    const raf = function (entry) {
        window.requestAnimationFrame(entry);
    };
    const random = function (min, max) {
        max = max + 1;
        return Math.floor(Math.random() * (max - min) + min);
    }
    var container = $('#container'),
        c = document.getElementById('c'),
        cx = c.getContext('2d'),
        Particle,
        particles = {},
        particleNum = 2,
        particleIndex = 0,
        mouseX = null,
        mouseY = null,
        particlesRendered = false,
        hue = random(1, 179),
        hueInc = 1,
        hue2 = random(180, 359),
        hueInc2 = 1,
        particleContainer = $("#particle-container");

    TweenMax.set(container, {
        opacity: 1
    });

    c.width = $('#c').outerWidth();
    c.height = $('#c').outerHeight();

    var w = c.width,
        h = c.height,
        mouseXDefault = w / 2,
        defaultXInc = -5,
        mouseXReversed = false,
        mouseYDefault = h / 2,
        defaultYInc = -5,
        mouseYReversed = false;

    cx.fillStyle = 'rgba(0,0,0,1)';
    cx.fillRect(0, 0, w, h);

    Particle = function () {
        this.lw = 15;
        this.xInc = w * 0.3;
        this.x = 0 - this.xInc;
        this.y = h / 2;
        this.p0x = this.x * 5;
        this.p0y = this.y;
        this.p0xLeftover = 0;
        this.p10xLeftover = w;

        this.yHigher = Math.abs(this.y) * 1.5;
        this.yLower = Math.abs(this.y) * 0.5;
        this.p1x = this.x * 4;
        this.p1y = this.yLower;
        this.p2x = this.x * 3;
        this.p2y = this.y * 1;
        this.p3x = this.x * 2;
        this.p3y = this.yHigher;
        this.p4x = this.x * 1;
        this.p4y = this.y * 1;
        this.p5x = 0;
        this.p5y = this.yLower;
        this.p6x = this.xInc * 1;
        this.p6y = this.y * 1;
        this.p7x = this.xInc * 2;
        this.p7y = this.yHigher;
        this.p8x = this.xInc * 3;
        this.p8y = this.y * 1;
        this.p9x = this.xInc * 4;
        this.p9y = this.yLower;
        this.p10x = this.xInc * 5;
        this.p10y = this.y * 1;
        this.xv = 5;
        this.yv = 50;
        this.xSpeed = 10;
        this.ySpeed = 0.9;

        this.curveSpeed = 0.5;
        this.yCurveSpeed = this.curveSpeed;

        this.hue = random(0, 360);
        this.hueInc = 1;
        this.light = 50;
        this.opacity = 1;
        this.opacityLimit = 0;
        this.opacityChange = -0.1;

        particles[particleIndex] = this;
        this.id = particleIndex;
        particleIndex++;
        this.flipped = this.id;
    }

    Particle.prototype.draw = function () {

        if (this.flipped % 2 === 0) {
            this.p1y = this.yLower;
            this.p3y = this.yHigher;
            this.p5y = this.yLower;
            this.p7y = this.yHigher;
            this.p9y = this.yLower;

            cx.beginPath();
            cx.strokeStyle = `hsla(${hue},100%,${this.light}%,${this.opacity})`;
            cx.lineWidth = this.lw;
            cx.moveTo(this.p0x, this.p0y);
            if (mouseY != null) {
                cx.quadraticCurveTo(this.p1x, this.p1y - ((mouseY - h / 2) * 0.5), this.p2x, this.p2y - ((mouseY - h / 2) * 0.5));
                cx.quadraticCurveTo(this.p3x, this.p3y - ((mouseY - h / 2) * 0.5), this.p4x, this.p4y - ((mouseY - h / 2) * 0.5));
                cx.quadraticCurveTo(this.p5x, this.p5y - ((mouseY - h / 2) * 0.5), this.p6x, this.p6y - ((mouseY - h / 2) * 0.5));
                cx.quadraticCurveTo(this.p7x, this.p7y - ((mouseY - h / 2) * 0.5), this.p8x, this.p8y - ((mouseY - h / 2) * 0.5));
                cx.quadraticCurveTo(this.p9x, this.p9y - ((mouseY - h / 2) * 0.5), this.p10x, this.p10y - ((mouseY - h / 2) * 0.5));
            } else {
                cx.quadraticCurveTo(this.p1x, this.p1y, this.p2x, this.p2y);
                cx.quadraticCurveTo(this.p3x, this.p3y, this.p4x, this.p4y);
                cx.quadraticCurveTo(this.p5x, this.p5y, this.p6x, this.p6y);
                cx.quadraticCurveTo(this.p7x, this.p7y, this.p8x, this.p8y);
                cx.quadraticCurveTo(this.p9x, this.p9y, this.p10x, this.p10y);
            }
            cx.stroke();
            this.p0x += this.xSpeed;
            this.p1x += this.xSpeed;
            this.p2x += this.xSpeed;
            this.p3x += this.xSpeed;
            this.p4x += this.xSpeed;
            this.p5x += this.xSpeed;
            this.p6x += this.xSpeed;
            this.p7x += this.xSpeed;
            this.p8x += this.xSpeed;
            this.p9x += this.xSpeed;
            this.p10x += this.xSpeed;
            this.p0xLeftover = this.p1x;

            if (this.p0xLeftover >= 0) {
                this.p0x = this.x * 5 + this.p0xLeftover;
                this.p1x = this.x * 4 + this.p0xLeftover;
                this.p2x = this.x * 3 + this.p0xLeftover;
                this.p3x = this.x * 2 + this.p0xLeftover;
                this.p4x = this.x * 1 + this.p0xLeftover;
                this.p5x = this.p0xLeftover;
                this.p6x = this.xInc * 1 + this.p0xLeftover;
                this.p7x = this.xInc * 2 + this.p0xLeftover;
                this.p8x = this.xInc * 3 + this.p0xLeftover;
                this.p9x = this.xInc * 4 + this.p0xLeftover;
                this.p10x = this.xInc * 5 + this.p0xLeftover;
            }
        } else {
            this.p1y = this.yHigher;
            this.p3y = this.yLower;
            this.p5y = this.yHigher;
            this.p7y = this.yLower;
            this.p9y = this.yHigher;

            cx.beginPath();
            cx.strokeStyle = `hsla(${hue2},100%,${this.light}%,${this.opacity})`;
            cx.lineWidth = this.lw;
            cx.moveTo(this.p0x, this.p0y);
            if (mouseY != null) {
                cx.quadraticCurveTo(this.p1x, this.p1y + ((mouseY - h / 2) * 0.5), this.p2x, this.p2y + ((mouseY - h / 2) * 0.5));
                cx.quadraticCurveTo(this.p3x, this.p3y + ((mouseY - h / 2) * 0.5), this.p4x, this.p4y + ((mouseY - h / 2) * 0.5));
                cx.quadraticCurveTo(this.p5x, this.p5y + ((mouseY - h / 2) * 0.5), this.p6x, this.p6y + ((mouseY - h / 2) * 0.5));
                cx.quadraticCurveTo(this.p7x, this.p7y + ((mouseY - h / 2) * 0.5), this.p8x, this.p8y + ((mouseY - h / 2) * 0.5));
                cx.quadraticCurveTo(this.p9x, this.p9y + ((mouseY - h / 2) * 0.5), this.p10x, this.p10y + ((mouseY - h / 2) * 0.5));
            } else {
                cx.quadraticCurveTo(this.p1x, this.p1y, this.p2x, this.p2y);
                cx.quadraticCurveTo(this.p3x, this.p3y, this.p4x, this.p4y);
                cx.quadraticCurveTo(this.p5x, this.p5y, this.p6x, this.p6y);
                cx.quadraticCurveTo(this.p7x, this.p7y, this.p8x, this.p8y);
                cx.quadraticCurveTo(this.p9x, this.p9y, this.p10x, this.p10y);
            }
            cx.stroke();
            this.p0x -= this.xSpeed;
            this.p1x -= this.xSpeed;
            this.p2x -= this.xSpeed;
            this.p3x -= this.xSpeed;
            this.p4x -= this.xSpeed;
            this.p5x -= this.xSpeed;
            this.p6x -= this.xSpeed;
            this.p7x -= this.xSpeed;
            this.p8x -= this.xSpeed;
            this.p9x -= this.xSpeed;
            this.p10x -= this.xSpeed;
            this.p10xLeftover = this.p9x;

            if (this.p10xLeftover <= w) {
                this.p0x = this.x * 5 + this.p10xLeftover;
                this.p1x = this.x * 4 + this.p10xLeftover;
                this.p2x = this.x * 3 + this.p10xLeftover;
                this.p3x = this.x * 2 + this.p10xLeftover;
                this.p4x = this.x * 1 + this.p10xLeftover;
                this.p5x = this.p10xLeftover;
                this.p6x = this.xInc * 1 + this.p10xLeftover;
                this.p7x = this.xInc * 2 + this.p10xLeftover;
                this.p8x = this.xInc * 3 + this.p10xLeftover;
                this.p9x = this.xInc * 4 + this.p10xLeftover;
                this.p10x = this.xInc * 5 + this.p10xLeftover;
            }
        }
    }

    function render() {
        hue += hueInc;
        hue2 += hueInc2;
        if (hue >= 360) {
            hueInc *= -1;
        }
        if (hue <= 0) {
            hueInc *= -1;
        }
        if (hue2 >= 360) {
            hueInc2 *= -1;
        }
        if (hue2 <= 0) {
            hueInc2 *= -1;
        }
        $(window).resize(function () {
            c.width = $('#c').outerWidth();
            c.height = $('#c').outerHeight();
            w = c.width;
            h = c.height;
        });
        cx.globalCompositeOperation = 'source-over';
        cx.fillStyle = 'rgba(0,0,0,0.05)';
        cx.fillRect(0, 0, w, h);
        if (!particlesRendered) {
            particlesRendered = true;
            for (var i = 0; i < particleNum; i++) {
                new Particle();
            }
        }

        cx.globalCompositeOperation = 'lighter';

        for (var i in particles) {
            particles[i].draw();
        }

        raf(render);
    }

    raf(render);

//    window.addEventListener('mousemove', mouseCoord, false);

    function mouseCoord(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }
});