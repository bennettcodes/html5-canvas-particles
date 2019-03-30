$(window).bind('load', function () {
    const raf = function (entry) {
        window.requestAnimationFrame(entry);
    };
    const random = function (min, max) {
        max = max + 1;
        return Math.floor(Math.random() * (max - min) + min);
    }

    var container = $('#container'),
        cContainer = $('#c-container'),
        c = document.getElementById('c'),
        cx = c.getContext('2d'),
        Particle,
        canvas,
        particleIndex = 0,
        particles = {},
        particleNum = 3,
        w,
        h,
        cx,
        mouseX,
        mouseXOld,
        mouseY,
        mouseYOld,
        color1 = 'rgba(4,13,44,1)',
        color2 = 'rgba(76,36,157,1)',
        particlesLoaded = false;

    TweenMax.set(container, {
        opacity: 1
    });

    c.width = $('#c').outerWidth();
    c.height = $('#c').outerHeight();

    w = c.width;
    h = c.height;

    //INITIAL CANVAS DRAW
    cx.fillStyle = 'rgba(0,0,0,1)';
    cx.fillRect(0, 0, c.width, c.height);

    Particle = function () {
        this.w = random(10, 100) * 0.05;
        this.h = this.w;
        this.initialR = this.w / 2;
        this.r = this.w / 2;
        this.rMult = this.r * 0.2;
        this.x = (w / 2) - (this.w / 2);
        this.y = (h / 2) - (this.h / 2);
        this.vxInitial = 5;
        this.vyInitial = this.vxInitial;
        this.vx = this.vxInitial;
        this.vy = this.vyInitial;
        this.gravity = 0.95;
        this.hue = random(0, 360);
        this.saturation = 100;
        this.light = 50;
        this.lightInc = -0.1;
        this.clusterLight = 50;
        this.opacity = 1;
        this.opacityChange = -0.005;
        this.opacityEnd = 0;
        this.opacityReversed = false;

        this.lessThanX = false;
        this.moreThanX = false;
        this.lessThanY = false;
        this.moreThanY = false;

        this.counter = 0;
        this.counterInc = random(1, 10) * 0.0001;
        this.counterRate = random(-20, 20);

        this.reachedXDestination = false;
        this.reachedYDestination = false;

        this.multiplierX = random(-50, 50);
        this.multiplierY = random(-50, 50);

        this.ran = random(0, 10) * 0.002;

        this.placeInCluster = (random(1, 2) === 1);
        particles[particleIndex] = this;
        this.id = particleIndex;
        particleIndex++;
    }

    Particle.prototype.draw = function () {
        if (this.light > this.lightLimit) {
            this.light += this.lightInc;
        }
        this.counter += Math.sin(this.counterInc);
        this.r += this.rMult;
        if (this.r > this.w * 5) {
            this.rMult *= -1;
        }
        if (this.r < this.initialR) {
            this.rMult *= -1;
        }
        if (mouseX != null) {
            this.x += ((mouseX - w / 2) * Math.sin(this.multiplierX)) * Math.sin(this.ran) / 2 * (this.counter * 100);
            this.y += ((mouseY - h / 2) * Math.sin(this.multiplierY)) * Math.sin(this.ran) / 2 * (this.counter * 100);
        } else {
            this.x += ((w * 0.05) * Math.sin(this.multiplierX)) * Math.sin(this.ran) / 2 * (this.counter * 100);
            this.y += ((h * 0.05) * Math.sin(this.multiplierY)) * Math.sin(this.ran) / 2 * (this.counter * 100);
        }
        this.vx *= this.gravity;
        this.opacity += this.opacityChange;
        if ((this.opacity < this.opacityEnd)) {
            delete particles[this.id];
        }
        cx.beginPath();
        cx.fillStyle = `hsla(${this.hue},${this.saturation}%,${this.light}%,${this.opacity})`;
        cx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        cx.fill();
    }

    function canvasFunction() {

        cx.globalCompositeOperation = 'source-over';
        cx.fillStyle = 'rgba(0,0,0,0.03)';
        cx.fillRect(0, 0, w, h);
        if (!particlesLoaded) {
            //                particlesLoaded = true;
            for (var i = 0; i < particleNum; i++) {
                new Particle();
            }
        }
        //        cx.globalCompositeOperation = 'lighter';
        for (var i in particles) {
            particles[i].draw();
        }
        raf(canvasFunction);
    }

    raf(canvasFunction);

    $(window).resize(function initial() {

        c.width = $('#c').outerWidth();
        c.height = $('#c').outerHeight();

        w = c.width;
        h = c.height;

        return initial;
    }());

    function cursorEvents(e) {
        mouseXOld = mouseX;
        mouseYOld = mouseY;
        mouseX = e.clientX;
        mouseY = e.clientY;
    }

    window.addEventListener('mousemove', cursorEvents, false);
});