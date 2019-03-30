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
        particleNum,
        particleIndex = 0,
        mouseXOld = null,
        mouseX = null,
        mouseYOld = null,
        mouseY = null,
        mouseUp = false,
        mouseDown = false,
        mouseLeft = false,
        mouseRight = false,
        mouseUpRight = false,
        mouseDownRight = false,
        mouseDownLeft = false,
        mouseUpLeft = false,
        timeScale = 10 * 0.005,
        collisionActive = true,
        oneVW = container.width() * 0.01,
        oneVH = container.height() * 0.01,
        particlesRendered = false;

    TweenMax.set(container, {
        opacity: 1
    });

    c.width = $('#c').outerWidth();
    c.height = $('#c').outerHeight();

    var w = c.width,
        h = c.height,
        noMouseTempXInitial = w * 0.1,
        noMouseTempX = noMouseTempXInitial,
        noMouseTempYInitial = h * 0,
        noMouseTempY = noMouseTempYInitial,
        noMouseTempInterval = 0.5;

    particleNum = 15;

    cx.fillStyle = 'rgba(0,0,0,1)';
    cx.fillRect(0, 0, w, h);

    Particle = function () {
        this.w = random(1, 3);
        this.growthRate = random(1, 10) * 0.015;
        this.r = this.w / 2;
        this.wFive = this.w * 0.3;
        this.h = this.w;
        this.x = random((w * 0.49) - (this.w * 0.5), (w * 0.51) - (this.w * 0.5));
        this.xv = 0;
        this.y = random((h * 0.49) - (this.h * 0.5), (h * 0.51) - (this.h * 0.5));
        this.yv = 0;
        this.xOffset = 0.9;
        this.yOffset = this.xOffset;
        this.xMultiplier = random(-100, 100) * 0.05;
        this.yMultiplier = random(-100, 100) * 0.05;
        this.speed = random(1, 20);
        this.reverseSpeed = this.speed * -1;
        this.gravity = 0.9;
        this.reverseGravity = this.gravity * -1;
        this.hue = random(150, 250);
        this.saturation = 100;
        this.light = random(0, 70);
        this.opacity = 0;
        this.circles = true;
        this.opacityChange = random(1, 7) * 0.005;
        this.opacityLimit = random(2, 5) * 0.1;
        this.secondOpacityLimit = 0;
        this.collisionTriggered = false;
        this.timeScale = random(1, 10) * 0.005;
        particles[particleIndex] = this;
        this.id = particleIndex;
        this.counter = random(0, 15);
        this.counterAdd = random(5, 15) * 0.005;
        particleIndex++;
    }

    Particle.prototype.draw = function () {
        this.counter += this.counterAdd;
        this.w += this.growthRate;
        this.h = this.w;
        this.r = this.w / 2;
        if (mouseX != null) {
            this.x += (mouseX - (w / 2)) * this.timeScale * (Math.sin(this.counter) * 1);
            this.y += (mouseY - (h / 2)) * this.timeScale * (Math.sin(this.counter) * 1);
        } else {
            this.x += noMouseTempX * this.timeScale * (Math.sin(this.counter) * 1);
            this.y += noMouseTempY * this.timeScale * (Math.sin(this.counter) * 1);
        }
        this.xv *= this.gravity;
        this.yv *= this.gravity;

        if (this.circles) {
            cx.beginPath();
            cx.fillStyle = `hsla(${this.hue},${this.saturation}%,${this.light}%,${this.opacity})`;
            cx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            cx.fill();
        } else {
            cx.fillStyle = `hsla(${this.hue},${this.saturation}%,${this.light}%,${this.opacity})`;
            cx.fillRect(this.x, this.y, this.w, this.h);
        }

        this.opacity += this.opacityChange;

        if (this.opacity > this.opacityLimit) {
            this.opacity = this.opacityLimit + this.opacityChange;
            this.opacityChange *= -1;
        }
        if (this.opacity < this.secondOpacityLimit) {
            delete particles[this.id];
        }
    }

    function render() {
        noMouseTempX += noMouseTempInterval;
        noMouseTempY += noMouseTempInterval;
        if (noMouseTempX < 0) {
            noMouseTempInterval *= -1;
            noMouseTempX = 0;
        }
        if (noMouseTempX > noMouseTempXInitial) {
            noMouseTempInterval *= -1;
            noMouseTempX = noMouseTempXInitial;
        }
        $(window).resize(function () {
            c.width = $('#c').outerWidth();
            c.height = $('#c').outerHeight();
            w = c.width;
            h = c.height;
        });
        cx.globalCompositeOperation = 'source-over';
        cx.fillStyle = 'rgba(0,0,0,0.2)';
        cx.fillRect(0, 0, w, h);
        if (!particlesRendered) {
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

    window.addEventListener('mousemove', mouseCoord, false);

    function mouseCoord(e) {
        mouseXOld = mouseX;
        mouseYOld = mouseY;
        mouseX = e.clientX;
        mouseY = e.clientY;
        switch (true) {
        case mouseXOld > mouseX:
            mouseLeft = true;
            mouseRight = false;
            switch (true) {
            case mouseYOld > mouseY:
                mouseUp = true;
                mouseDown = false;
                mouseUpLeft = true;
                mouseDownLeft = false;
                mouseUpRight = false;
                mouseDownRight = false;
                break;
            case mouseYOld < mouseY:
                mouseUp = false;
                mouseDown = true;
                mouseUpLeft = false;
                mouseDownLeft = true;
                mouseUpRight = false;
                mouseDownRight = false;
                break;
            }
            break;
        case mouseXOld < mouseX:
            mouseLeft = false;
            mouseRight = true;
            switch (true) {
            case mouseYOld > mouseY:
                mouseUp = true;
                mouseDown = false;
                mouseUpLeft = false;
                mouseDownLeft = false;
                mouseUpRight = true;
                mouseDownRight = false;
                break;
            case mouseYOld < mouseY:
                mouseUp = false;
                mouseDown = true;
                mouseUpLeft = false;
                mouseDownLeft = false;
                mouseUpRight = false;
                mouseDownRight = true;
                break;
            }
            break;
        }
    }
});