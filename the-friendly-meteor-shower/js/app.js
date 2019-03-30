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
        hue = 0,
        hueInc = 0.5,
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
        this.r = random(10, 50);
        this.rReversed = false;
        this.rMax = 50;
        this.rIncreaseInitial = 5;
        this.rIncrease = this.rIncreaseInitial;
        this.rDecrease = 0.98;
        this.lw = 1;
        this.lwIncrease = 2;
        this.w;
        this.h;
        this.x = random(0, w - this.r * 2);
        this.xv = 5;
        this.xDecline = random(-10, 10) * 0.001;
        this.y = random(0, h - this.r * 2);
        this.yv = 5;
        this.yDecline = this.xDecline;
        this.decline = 0.01;
        this.randomCounter = random(1, 10);
        this.opacityStart = 0;
        this.opacityInc = 0.005;
        this.opacityLimit = 1;
        this.initPosDone = false;
        this.done = false;

        this.hue = random(0, 360);
        this.light = random(0, 100);
        this.opacity = random(1, 10) * 0.1;

        this.mouseX = 0;
        this.mouseY = 0;

        this.mouseXDefault = w / 2;
        this.mouseYDefault = h / 2;

        particles[particleIndex] = this;
        this.id = particleIndex;
        particleIndex++;
    }

    Particle.prototype.draw = function () {
        if (!this.initPosDone) {
            this.initPosDone = true;
            this.counterX = 0;
            this.counterY = 0;
        }

        if (mouseX != null) {
            this.mouseX = (mouseX - (w / 2));
            this.mouseY = (mouseY - (h / 2));
        } else {
            this.mouseX = mouseXDefault;
            this.mouseY = mouseYDefault;
        }
        this.r *= (this.rDecrease);
        this.rIncrease *= 0.9;
        this.opacityStart += this.opacityInc;
        cx.beginPath();
        cx.fillStyle = `hsla(${hue},100%,${this.light}%,${this.opacityStart})`;
        cx.moveTo(this.x, this.y);
        this.x += this.mouseX * this.xDecline;
        this.y += this.mouseY * this.yDecline;
        cx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        cx.fill();

        if ((this.r < 0.1)) {
            delete particles[this.id];
        }
    }

    function render() {
        hue += hueInc;
        if (hue === 360) {
            hueInc *= -1;
        }
        if (hue < 0) {
            hueInc *= -1;
        }
        if ((mouseXDefault < w * -1) && (!mouseXReversed)) {
            mouseXReversed = true;
            defaultXInc *= -1;
        }
        if ((mouseXDefault > w) && (mouseXReversed)) {
            mouseXReversed = false;
            defaultXInc *= -1;
        }
        if ((mouseYDefault < h * -1) && (!mouseYReversed)) {
            mouseYReversed = true;
            defaultYInc *= -1;
        }
        if ((mouseYDefault > h) && (mouseYReversed)) {
            mouseYReversed = false;
            defaultYInc *= -1;
        }
        mouseXDefault += defaultXInc;
        mouseYDefault += defaultYInc;
        console.log(mouseXDefault);
        $(window).resize(function () {
            c.width = $('#c').outerWidth();
            c.height = $('#c').outerHeight();
            w = c.width;
            h = c.height;
        });
        cx.globalCompositeOperation = 'source-over';
        cx.fillStyle = `hsla(${hue - 180},50%,0%,0.05)`;
        cx.fillRect(0, 0, w, h);
        if (!particlesRendered) {
            //            particlesRendered = true;
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
        mouseX = e.clientX;
        mouseY = e.clientY;
    }
});