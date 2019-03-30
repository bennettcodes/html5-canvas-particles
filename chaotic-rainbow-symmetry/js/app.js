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
        particleNum = 10,
        particleIndex = 0,
        mouseX = null,
        mouseXOld = mouseX,
        mouseY = null,
        mouseYOld = mouseY,
        w,
        h,
        ax,
        ay,
        az,
        rotation = null,
        arAlpha,
        arBeta,
        arGamma,
        hue = 0,
        mouseMoved = false,
        particlesRendered = false;

    window.ondevicemotion = function (event) {
        ax = event.accelerationIncludingGravity.x;
        ay = event.accelerationIncludingGravity.y;
        az = event.accelerationIncludingGravity.z;
        if ((event.rotationRate.alpha != null) || (event.rotationRate.beta != null) || (event.rotationRate.gamma != null)) {
            rotation = event.rotationRate;
        }
        if (rotation != null) {
            arAlpha = Math.round(rotation.alpha);
            arBeta = Math.round(rotation.beta);
            arGamma = Math.round(rotation.gamma);
        }
    }

    TweenMax.set(container, {
        opacity: 1
    });

    w = c.width = c.offsetWidth;
    h = c.height = c.offsetHeight;

    cx.fillStyle = 'rgba(0,0,0,1)';
    cx.fillRect(0, 0, w, h);

    Particle = function () {
        this.multXInit = 5;
        this.multYInit = 5;
        this.multX = this.multXInit;
        this.multY = this.multYInit;
        this.multReduce = 2;

        this.w = 5;
        this.lw = this.w;
        this.h = this.w;
        this.r = this.w / 2;
        this.x = w / 2 - this.w / 2;
        this.rxInit = w / 2 - this.lw / 2;
        this.rx = this.rxInit - this.multX;
        this.y = h / 2 - this.h / 2;
        this.ryInit = h / 2 - this.multY;
        this.ry = this.ryInit - this.multY;
        this.rChange = ((this.w * Math.PI * 2) / 100) * -0.16;
        this.rChangeUp = 1;
        this.rEnd = 0.1;

        this.hue = hue;
        this.saturation = 100;
        this.light = 50;
        this.opacity = 1;
        this.opacityChange = -0.01;
        this.opacityEnd = 0;

        this.var = random(1, 4);

        this.tick = 0;
        this.increase = (Math.PI * 2) / 100;

        particles[particleIndex] = this;
        this.id = particleIndex;
        particleIndex++;
    }

    Particle.prototype.draw = function () {
        this.rxInit = w / 2 - this.multX * Math.PI * 2;
        this.ryInit = h / 2 - this.multY * Math.PI * 2;
        this.lw += this.rChange;
        //        this.opacity += this.opacityChange;
        if ((this.opacity < this.opacityEnd) || (this.lw < this.rEnd)) {
            delete particles[this.id];
        }

        cx.beginPath();
        cx.strokeStyle = `hsla(${this.hue},${this.saturation}%,${this.light}%,${this.opacity})`;
        cx.lineWidth = this.lw;
        cx.moveTo(this.rx, this.ry);
        this.tick += this.increase;
        switch (true) {
        case this.var === 1:
            this.rx += Math.cos(this.tick) * this.multX;
            this.ry += (Math.sin(this.tick) * this.multY);
            break;
        case this.var === 2:
            this.rx += Math.sin(this.tick) * this.multX;
            this.ry += (Math.cos(this.tick) * this.multY);
            break;
        case this.var === 3:
            this.rx -= Math.cos(this.tick) * this.multX;
            this.ry -= (Math.sin(this.tick) * this.multY);
            break;
        case this.var === 4:
            this.rx -= Math.sin(this.tick) * this.multX;
            this.ry -= (Math.cos(this.tick) * this.multY);
            break;
        }
        if ((mouseX != null) && (rotation === null)) {
            this.multX = this.multXInit + (mouseX - (w / 2)) * 0.04;
            this.multY = this.multYInit + (mouseY - (h / 2)) * 0.04;
        }
        if ((mouseX === null) && (rotation != null)) {
            this.multX = this.multXInit + ((Math.abs(arBeta) + Math.abs(arGamma)) / 2) * 0.12;
            this.multY = this.multYInit + (arAlpha) * 0.12;
        }
        cx.lineTo(this.rx, this.ry);
        cx.stroke();
    }

    function render() {
        $(window).resize(function () {
            w = c.width = c.offsetWidth;
            h = c.height = c.offsetHeight;
        });
        cx.globalCompositeOperation = 'source-over';
        cx.fillStyle = 'rgba(0,0,0,0.2)';
        cx.fillRect(0, 0, w, h);
        if (!particlesRendered) {
            //            particlesRendered = true;
            for (var i = 0; i < particleNum; i++) {
                new Particle();
            }
        }

        hue += 10;

        //                cx.globalCompositeOperation = 'lighter';

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
        mouseMoved = true;
    }
});