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
        c2Container = $('#c2-container'),
        darkOverlay = $('#dark-overlay'),
        c = document.getElementById('c'),
        cStars = document.getElementById('c-stars'),
        c2 = document.getElementById('c2'),
        c2Stars = document.getElementById('c2-stars'),
        mainStarsContext = cStars.getContext('2d'),
        mainContext = c.getContext('2d'),
        altStarsContext = c2Stars.getContext('2d'),
        altContext = c2.getContext('2d'),
        mainStar,
        mainParticle,
        altStar,
        altParticle,
        mainStarsCanvas = cStars,
        mainCanvas = c,
        altStarsCanvas = c2Stars,
        altCanvas = c2,
        mainStarsCanvasFunction,
        mainCanvasFunction,
        altStarsCanvasFunction,
        altCanvasFunction,
        particleIndex = 0,
        particles = {},
        particleNum = 5,
        mainStarW,
        mainW,
        altStarW,
        altW,
        mainStarH,
        mainH,
        altStarH,
        altH,
        mouseX = null,
        mouseXOld,
        mouseY = null,
        mouseYOld,
        pageResized = false,
        color1 = 'rgba(4,13,44,1)',
        color2 = 'rgba(76,36,157,1)',
        particlesLoaded = false;

    TweenMax.set(container, {
        opacity: 1
    });

    TweenMax.set(c2Container, {
        transformOrigin: 'center bottom',
        scaleY: -1
    });

    TweenMax.set(c2, {
        filter: 'blur(10px)',
        opacity: 1
    });

    TweenMax.set(c2Stars, {
        filter: 'blur(4px)',
        opacity: 1
    });

    mainStarsCanvas.width = $('#c-stars').outerWidth();
    mainCanvas.width = $('#c').outerWidth();
    mainStarsCanvas.height = $('#c-stars').outerHeight();
    mainCanvas.height = $('#c').outerHeight();
    altStarsCanvas.width = $('#c2-stars').outerWidth();
    altCanvas.width = $('#c2').outerWidth();
    altStarsCanvas.height = $('#c2-stars').outerHeight();
    altCanvas.height = $('#c2').outerHeight();

    mainStarsW = mainStarsCanvas.width;
    mainW = mainCanvas.width;
    mainStarsH = mainStarsCanvas.height;
    mainH = mainCanvas.height;

    altStarsW = altStarsCanvas.width;
    altW = altCanvas.width;
    altStarsH = altStarsCanvas.height;
    altH = altCanvas.height;

    //INITIAL STARS CANVAS DRAW
    mainStarsContext.fillStyle = 'rgba(0,0,0,1)';
    mainStarsContext.fillRect(0, 0, mainStarsCanvas.width, mainStarsCanvas.height);

    //INITIAL CANVAS DRAW
    mainContext.fillStyle = 'rgba(10,10,0,1)';
    mainContext.fillRect(0, 0, mainCanvas.width, mainCanvas.height);

    //ALT STARS CANVAS DRAW
    altStarsContext.fillStyle = 'rgba(10,10,0,1)';
    altStarsContext.fillRect(0, 0, altStarsCanvas.width, altStarsCanvas.height);

    //ALT CANVAS DRAW
    altContext.fillStyle = 'rgba(10,10,0,1)';
    altContext.fillRect(0, 0, altCanvas.width, altCanvas.height);

    function starFactory(thisCanvas, thisContext, thisStarName, thisCanvasFunction) {

        var starIndex = 0,
            cx = thisContext,
            Star,
            canvasFunction = thisCanvasFunction,
            stars = {},
            starNum = 2,
            c = thisCanvas,
            cw = thisCanvas.width,
            ch = thisCanvas.height,
            starsLoaded = false;

        Star = function () {
            this.r = random(0.5, 1.5);
            this.cw = thisCanvas.width;
            this.ch = thisCanvas.height;
            this.xInitial = random(0 - this.cw * 0.5, this.cw * 1.5);
            this.x = this.xInitial;
            this.y = random(0, this.ch - this.r);

            this.hue = random(0, 360);
            this.saturation = 100;
            this.light = 100;

            this.xRate = random(1, 20) * 0.005;

            this.opacity = 0;
            this.opacityChange = 0.01;
            this.opacityFirst = 1;
            this.opacitySecond = -1;
            this.opacityReversed = false;
            this.opacityDone = false;

            stars[starIndex] = this;
            this.id = starIndex;
            starIndex++;
        }

        Star.prototype.draw = function () {

            cx.beginPath();

            if (mouseX != null) {
                this.x += (mouseX - (this.cw * 0.5)) * this.xRate;
            } else {
                this.x = this.xInitial;
            }

            if (pageResized) {
                this.cw = thisCanvas.width;
                this.ch = thisCanvas.height;
            }

            cx.fillStyle = `hsla(${this.hue},${this.saturation}%,${this.light}%,${this.opacity})`;
            cx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            cx.fill();
            if ((this.opacity > this.opacityFirst) && (!this.opacityReversed)) {
                this.opacityReversed = true;
                this.opacityChange *= -1;
                this.opacity = this.opacityFirst;
            }
            if ((this.opacity <= this.opacitySecond) && (this.opacityReversed)) {
                this.opacityDone = true;
                this.opacity = 0;
                delete stars[this.id];
            }
            if (!this.opacityDone) {
                this.opacity += this.opacityChange;
            }
        }

        canvasFunction = function () {

                cx.globalCompositeOperation = 'source-over';
                if (c === altStarsCanvas) {
                    cx.fillStyle = 'rgba(27,34,69,0)';
                } else {
                    cx.fillStyle = 'rgba(5,5,0,1)';
                }
                cx.clearRect(0, 0, c.width, c.height);
                if (!starsLoaded) {
                    //                        starsLoaded = true;
                    for (var i = 0; i < starNum; i++) {
                        new Star();
                    }
                }
                cx.globalCompositeOperation = 'lighter';
                for (var i in stars) {
                    stars[i].draw();
                }
                //            raf(canvasFunction);
            }
            //        raf(canvasFunction);
        setInterval(canvasFunction, 15);
    }

    function particleFactory(thisCanvas, thisContext, thisParticleName, thisCanvasFunction) {

        var particleIndex = 0,
            cx = thisContext,
            Particle = thisParticleName,
            canvasFunction = thisCanvasFunction,
            particles = {},
            particleNum = 2,
            c = thisCanvas,
            cw = thisCanvas.width,
            ch = thisCanvas.height,
            blueDark = 'rgba(3,55,104,0.1)',
            blueLight = 'rgba(15,114,207,0.1)';
        particlesLoaded = false;

        var grd = cx.createLinearGradient(0, 0, 0, ch * 0.25);
        grd.addColorStop(0, blueLight);
        grd.addColorStop(1, blueDark);

        Particle = function () {
            this.w = 10;
            this.h = 10;
            this.cw = thisCanvas.width;
            this.ch = thisCanvas.height;
            this.lw = 30;
            this.lwChange = 0.9;
            this.lwEnd = 0;
            this.r = 50;
            this.rChange = this.r * 0.055;
            this.rEnd = 0.5;
            this.xRan1 = this.cw * 0.45 - this.w * 0.5;
            this.xRan2 = this.cw * 0.55 - this.w * 0.5;
            this.yRan1 = this.ch * 0.45 - this.h * 0.5;
            this.yRan2 = this.ch * 0.55 - this.h * 0.5;

            this.plots = 50;
            this.increase = Math.PI * 2 / this.plots;
            this.angle = random(0, 360);

            this.x = this.cw / 2 - this.w / 2;
            this.y = this.ch - (this.h * 10);

            this.xInit;
            this.yInit;

            this.vx = random(-5, 5);
            this.vy = random(-15, 15);
            this.gravityX = 1.05;
            this.gravityY = 1.05;

            this.xRan = random(10, 50) * 0.1;
            this.yRan = this.xRan;

            this.hue = 20;
            this.hueChange = random(-5, 5) * 0.05;
            this.saturation = 100;
            this.light = 70;
            this.lightEnd = 50;
            this.lightChange = -10;

            this.opacity = 1;
            this.altOpacity = 1;
            this.opacityChange = random(1, 10) * -0.001;
            this.opacityEnd = 0;

            this.circleWidth = random(0, 100);
            this.circleHeight = this.circleWidth;
            this.xOriginForSin = this.cw / 2;
            this.yOriginForSin = this.ch / 2;

            this.counter = random(0, 360);
            this.counter2 = 0;
            this.counterInc = random(5, 15) * 0.01;
            this.counter2Inc = 2;

            this.p1 = 2;
            this.p2 = 3;
            this.p3 = 4;
            this.p4 = 5;
            this.p5 = 6;
            this.p6 = 7;
            this.p7 = 8;
            this.p8 = 9;

            this.notBelow = true;
            this.established = false;

            this.xRate = random(3, 20) * 0.001;
            this.yRate = random(3, 10) * 0.001;

            this.sinCheck = random(1, 2) === 1;

            this.placeInCluster = (random(1, 2) === 1);
            particles[particleIndex] = this;
            this.id = particleIndex;
            particleIndex++;
        }

        Particle.prototype.draw = function () {

            if (!this.established) {
                this.established = true;
            }

            cx.beginPath();
            if (c === altCanvas) {
                cx.fillStyle = `hsla(${this.hue},${this.saturation}%,${this.light}%,${this.altOpacity})`;
            } else {
                cx.fillStyle = `hsla(${this.hue},${this.saturation}%,${this.light}%,${this.opacity})`;
            }
            if ((this.hue > 10) && (this.hue < 30)) {
                this.hue += this.hueChange;
            }
            if (this.light >= this.lightEnd) {
                this.light += this.lightChange;
            }
            if (mouseX === null) {
                if (this.sinCheck) {
                    this.x += (Math.cos(this.counter) * this.xRan) + ((0) * this.xRate);
                    this.y += ((Math.sin(this.counter) * this.yRan) - ((this.ch / 2) * this.yRate)) * 1.5;
                } else {
                    this.x += (Math.sin(this.counter) * this.xRan) + ((0) * this.xRate);
                    this.y += ((Math.cos(this.counter) * this.yRan) - ((this.ch / 2) * this.yRate)) * 1.5;
                }
            } else {
                if ((this.y < this.ch) && (this.notBelow)) {
                    if (this.sinCheck) {
                        this.x += ((Math.cos(this.counter) * this.xRan) + ((mouseX - (this.cw / 2)) * this.xRate)) * 1.5;
                        this.y += ((Math.sin(this.counter) * this.yRan) + ((mouseY - (this.ch)) * this.yRate)) * 1.5;
                    } else {
                        this.x += (Math.sin(this.counter) * this.xRan) + ((mouseX - (this.cw / 2)) * this.xRate);
                        this.y += (Math.cos(this.counter) * this.yRan) + ((mouseY - (this.ch)) * this.yRate);
                    }
                } else {
                    this.notBelow = false;
                    if (this.sinCheck) {
                        this.x += ((Math.cos(this.counter) * this.xRan) + ((mouseX - (this.cw / 2)) * this.xRate)) * 2;
                        this.y -= ((Math.sin(this.counter) * this.yRan) + ((mouseY - (this.ch)) * this.yRate)) * 2;
                    } else {
                        this.x += ((Math.sin(this.counter) * this.xRan) + ((mouseX - (this.cw / 2)) * this.xRate)) * 2;
                        this.y -= ((Math.cos(this.counter) * this.yRan) + ((mouseY - (this.ch)) * this.yRate)) * 2;
                    }
                }
            }
            cx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            cx.fill();
            if (this.r >= this.rEnd) {
                this.r -= this.rChange;
            } else {
                delete particles[this.id];
            }
            this.rChange *= 0.95;
            this.counter += this.counterInc;
            this.counter2 += this.counter2Inc;
        }

        canvasFunction = function () {

                cx.globalCompositeOperation = 'source-over';
                if (c === altCanvas) {
                    cx.fillStyle = 'rgba(5,5,0,0.05)';
                } else {
                    cx.fillStyle = 'rgba(5,5,0,0.05)';
                }
                cx.fillRect(0, 0, c.width, c.height);
                if (!particlesLoaded) {
                    //                        particlesLoaded = true;
                    for (var i = 0; i < particleNum; i++) {
                        new Particle();
                    }
                }
                cx.globalCompositeOperation = 'lighter';
                for (var i in particles) {
                    particles[i].draw();
                }
                //            raf(canvasFunction);
            }
            //        raf(canvasFunction);
        setInterval(canvasFunction, 15);
    }

    particleFactory(mainCanvas, mainContext, mainParticle, mainCanvasFunction);
    particleFactory(altCanvas, altContext, altParticle, altCanvasFunction);

    starFactory(mainStarsCanvas, mainStarsContext, mainStar, mainStarsCanvasFunction);
    starFactory(altStarsCanvas, altStarsContext, altStar, altCanvasFunction);

    $(window).resize(function () {

        pageResized = true;
        mouseX = null;
        mouseY = null;

        mainStarsCanvas.width = $('#c-stars').outerWidth();
        mainCanvas.width = $('#c').outerWidth();
        mainStarsCanvas.height = $('#c-stars').outerHeight();
        mainCanvas.height = $('#c').outerHeight();
        altStarsCanvas.width = $('#c2-stars').outerWidth();
        altCanvas.width = $('#c2').outerWidth();
        altStarsCanvas.height = $('#c2-stars').outerHeight();
        altCanvas.height = $('#c2').outerHeight();

    });

    function cursorEvents(e) {
        mouseXOld = mouseX;
        mouseYOld = mouseY;
        mouseX = e.clientX;
        mouseY = e.clientY;
    }

    window.addEventListener('mousemove', cursorEvents, false);
});