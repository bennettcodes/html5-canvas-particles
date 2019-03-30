$(window).bind('load', function () {
    const raf = function (entry) {
        window.requestAnimationFrame(entry);
    };
    const random = function (min, max) {
        max = max + 1;
        return Math.floor(Math.random() * (max - min) + min);
    }
    var app = {
        init: function () {
            this.cacheDOM();
            this.style();
        },
        cacheDOM: function () {
            this.container = $('#container');
            this.images = $('img');

            this.mouseX = null;
            this.mouseY = null;
        },
        style: function () {
            this.images.imagesLoaded(function () {
                $(window).resize(function initial() {
                    TweenMax.set(app.container, {
                        opacity: 1
                    });
                    return initial;
                }());
            });
        },
        cursorEvents: function (e) {
            app.mouseX = e.clientX;
            app.mouseY = e.clientY;
        }
    }

    app.init();

    var cContainer = $('#c-container'),
        c = document.getElementById('c'),
        cx = c.getContext('2d'),
        particleIndex = 0,
        particles = {},
        particleNum = 1,
        particlesLoaded = false,
        Particle,
        Line,
        canvas;

    c.width = $('#c').outerWidth();
    c.height = $('#c').outerHeight();

    //INITIAL CANVAS DRAW
    cx.fillStyle = 'rgba(0,0,0,1)';
    cx.fillRect(0, 0, c.width, c.height);

    function curveFactory(thisCanvas, thisContext, thisLineName, thisCanvasFunction) {

        var particleIndex = 0,
            particles = {},
            particleNum = 10,
            particlesLoaded = false;

        thisParticleName = function () {
            this.randomX = random(0 - thisCanvas.width, thisCanvas.width * 3);
            this.w = 0;
            this.xBefore = this.randomX * 0.5;
            this.xAfter = this.randomX * 0.5;
            this.p0x = this.randomX * 0.5;
            this.p0y = (thisCanvas.height * -0.1);
            this.p1x = this.xBefore;
            this.p1y = thisCanvas.height * 0.1;
            this.p2x = this.randomX * 0.5;
            this.p2y = thisCanvas.height * 0.2;
            this.p3x = this.xAfter;
            this.p3y = thisCanvas.height * 0.3;
            this.p4x = this.randomX * 0.5;
            this.p4y = thisCanvas.height * 0.4;
            this.p5x = this.xBefore;
            this.p5y = thisCanvas.height * 0.5;
            this.p6x = this.randomX * 0.5;
            this.p6y = thisCanvas.height * 0.6;
            this.p7x = this.xAfter;
            this.p7y = thisCanvas.height * 0.7;
            this.p8x = this.randomX * 0.5;
            this.p8y = thisCanvas.height * 0.8;
            this.p9x = this.xBefore;
            this.p9y = thisCanvas.height * 0.9;
            this.p10x = this.randomX * 0.5;
            this.p10y = thisCanvas.height * 1;
            this.p11x = this.xAfter;
            this.p11y = thisCanvas.height * 1.1;
            this.p12x = this.randomX * 0.5;
            this.p12y = thisCanvas.height * 1.08;
            this.xMiddle = this.randomX * 0.5;
            this.xMiddleIncrementInitial = -10;
            this.xMiddleIncrement = this.xMiddleIncrementInitial;
            this.yMiddle = thisCanvas.height * 0.5;
            this.yMiddleIncrement;
            this.curveSpeedBeforeInitial = -10;
            this.curveSpeedBefore = this.curveSpeedBeforeInitial;
            this.curveSpeedAfterInitial = 10;
            this.curveSpeedAfter = this.curveSpeedAfterInitial;
            this.curveSpeedReducer = 0.9;
            this.hue = random(0, 360);
            this.opacity = 1;
            this.opacityIncrement = random(1, 5) * 0.01;
            this.xIntensity;
            this.yIntensity;
            this.xEnd = this.randomX * 0.5;
            this.yEnd = thisCanvas.height * 0.55;
            this.initialTriggered = false;
            particleIndex++;
            particles[particleIndex] = this;
            this.id = particleIndex;
        }

        thisParticleName.prototype.draw = function () {
            if (app.mouseX === null || app.mouseY === null) {
                this.xIntensity = 0.4;
                this.yIntensity = 0.15;
            } else {
                this.xIntensity = 0.75;
                this.yIntensity = 0.75;
            }
            thisContext.beginPath();
            thisContext.strokeStyle = `hsla(${this.hue},100%,50%,${this.opacity})`;
            this.opacity -= this.opacityIncrement;
            thisContext.lineWidth = this.w;
            thisContext.moveTo(this.p0x, this.p0y);
            thisContext.quadraticCurveTo(this.p1x - ((app.mouseX - thisCanvas.width / 2) * this.xIntensity), this.p1y - ((app.mouseY - thisCanvas.height / 2) * this.yIntensity), this.p2x, this.p2y);
            thisContext.quadraticCurveTo(this.p3x + ((app.mouseX - thisCanvas.width / 2) * this.xIntensity), this.p3y + ((app.mouseY - thisCanvas.height / 2) * this.yIntensity), this.p4x, this.p4y);
            thisContext.quadraticCurveTo(this.p5x - ((app.mouseX - thisCanvas.width / 2) * this.xIntensity), this.p5y - ((app.mouseY - thisCanvas.height / 2) * this.yIntensity), this.p6x, this.p6y);
            thisContext.quadraticCurveTo(this.p7x + ((app.mouseX - thisCanvas.width / 2) * this.xIntensity), this.p7y + ((app.mouseY - thisCanvas.height / 2) * this.yIntensity), this.p8x, this.p8y);
            thisContext.quadraticCurveTo(this.p9x - ((app.mouseX - thisCanvas.width / 2) * this.xIntensity), this.p9y - ((app.mouseY - thisCanvas.height / 2) * this.yIntensity), this.p10x, this.p10y);
            thisContext.quadraticCurveTo(this.p11x + ((app.mouseX - thisCanvas.width / 2) * this.xIntensity), this.p11y + ((app.mouseY - thisCanvas.height / 2) * this.yIntensity), this.p12x, this.p12y);
            thisContext.stroke();
            if ((this.opacity <= 0)) {
                delete particles[this.id];
            }
        }

        thisCanvasFunction = function () {
            thisContext.globalCompositeOperation = 'source-over';
            thisContext.fillStyle = 'rgba(0,0,0,1)';
            thisContext.fillRect(0, 0, thisCanvas.width, thisCanvas.height);
            if (!particlesLoaded) {
                //particlesLoaded = true;
                for (var i = 0; i < particleNum; i++) {
                    new thisParticleName();
                }
            }
            thisContext.globalCompositeOperation = 'lighter';
            for (var i in particles) {
                particles[i].draw();
            }

            $(window).resize(function () {

                thisCanvas.width = $('#c').outerWidth();
                thisCanvas.height = $('#c').outerHeight();
                this.randomX = random(0, thisCanvas.width * 2);
                this.w = 0;
                this.xBefore = this.randomX * 0.5;
                this.xAfter = this.randomX * 0.5;
                this.p0x = this.randomX * 0.5;
                this.p0y = (thisCanvas.height * -0.25);
                this.p1x = this.xBefore;
                this.p1y = thisCanvas.height * 0.125;
                this.p2x = this.randomX * 0.5;
                this.p2y = thisCanvas.height * 0.25;
                this.p3x = this.xAfter;
                this.p3y = thisCanvas.height * 0.375;
                this.p4x = this.randomX * 0.5;
                this.p4y = thisCanvas.height * 0.5;
                this.p5x = this.xBefore;
                this.p5y = thisCanvas.height * 0.625;
                this.p6x = this.randomX * 0.5;
                this.p6y = thisCanvas.height * 0.75;
                this.p7x = this.xAfter;
                this.p7y = thisCanvas.height * 0.875;
                this.p8x = this.randomX * 0.5;
                this.p8y = thisCanvas.height * 1.25;
            });
            window.requestAnimationFrame(thisCanvasFunction);
        }
        window.requestAnimationFrame(thisCanvasFunction);
    }
    window.addEventListener('mousemove', app.cursorEvents, false);

    curveFactory(c, cx, Line, canvas);
});