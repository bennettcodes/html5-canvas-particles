$(window).bind('load', function () {

    // shim layer with setTimeout fallback
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    const raf = function (entry) {
        window.requestAnimFrame(entry);
    };
    const caf = function (entry) {
        window.cancelAnimationFrame(entry);
    };
    const random = function (min, max) {
        max = max + 1;
        return Math.floor(Math.random() * (max - min) + min);
    }
    const min = function (arr) {
        return Math.min.apply(Math, arr);
    }
    const max = function (arr) {
        return Math.max.apply(Math, arr);
    }
    const cl = function (entry) {
        console.log(entry);
    }
    var container = $('#container'),
        c = document.getElementById('c'),
        cx = c.getContext('2d'),
        cbg = {
            rgb: '0,0,0',
            a: 0.1
        },
        Particle,
        Star,
        particles = {},
        stars = {},
        starNum = 300,
        particleNum = 50,
        particleIndex = 0,
        starsIndex = 0,
        mouseX = null,
        mouseY = null,
        hue = 0,
        travelSpeedInit = 5,
        travelSpeedPeak = 7,
        travelSpeed = travelSpeedInit,
        travelSpeedChange = 0.025,
        travelVelocityInit = 5,
        travelVelocityPeak = 1.125,
        travelVelocity = travelVelocityInit,
        travelVelocityChange = 0.00075,
        opacity = 1,
        starsRendered = false,
        particlesRendered = false;

    TweenMax.set(container, {
        opacity: 1
    });

    c.width = $('#c').outerWidth();
    c.height = $('#c').outerHeight();

    var w = c.width,
        h = c.height;

    cx.fillStyle = `rgba(${cbg.rgb},${cbg.a})`;
    cx.fillRect(0, 0, w, h);


    function drawCanvas() {

        Particle = function () {
            this.w = random(10, 20);
            this.h = this.w;
            this.r = this.w;
            this.rIncrement = random(1, 2) * -0.05;
            this.rMult = 1.05;
            this.xInit = random(0,1280);
            this.x = w / 2 - this.r / 2;
            this.yInit = random(0, h - (this.r * 2));
            this.y = h / 2 - this.r / 2;
            this.xDirection = random(1, 2);
            this.yDirection = random(1, 2);

            this.mouseX = mouseX || w * 0.5;
            this.mouseY = mouseY || h * 0.65;

            this.travelSpeed = travelSpeed;
            this.travelVelocity = travelVelocity;

            this.hue = hue;
            this.randomHue = random(0, 60);
            this.saturation = 100;
            this.light = random(50, 54);
            this.opacity = opacity;
            this.opacityRate = random(1, 10) * -0.0205;
            this.opacityMin = 0;
            this.opacityMax = 1;
            this.counter = 0;
            this.counterInc = 0.05;
            this.tick = 0;
            this.isCos = 1;
            this.coin = random(1,2);
            
            
            
            particles[particleIndex] = this;
            this.id = particleIndex;
            particleIndex++;
        }

        Particle.prototype.draw = function () {
            mouseX ? this.mouseX = mouseX : null;
            mouseY ? this.mouseY = mouseY : null;
            this.travelSpeed = travelSpeed;
            this.hue = hue + this.randomHue;
            this.tick++;

            cx.beginPath();
            cx.fillStyle = `hsla(${this.hue},${this.saturation}%,${this.light}%,${this.opacity})`;
            cx.arc(this.x + this.r / 2, this.y + this.r / 2, this.r, 0, Math.PI * 2);
            cx.fill();

            this.counter += this.counterInc;
            this.counterInc *= 1.01;

            this.opacity += this.opacityRate;

//            this.r += this.rIncrement;
            this.rIncrement *= this.rMult;

            if (this.r <= 0) {
                delete particles[this.id];
            }

            if (this.coin === 1) {
                if (this.isCos === 1) {
                    this.x += ((this.xInit) * this.travelSpeed * 0.01) * (Math.cos(this.counter) * 0.125)
                } else {
                    this.x += this.travelSpeed;
                    this.travelSpeed *= this.travelVelocity;
                }
            } else if (this.coin === 2) {
                if (this.isCos === 1) {
                    this.x -= ((this.xInit) * this.travelSpeed * 0.01) * (Math.cos(this.counter) * 0.125)
                } else {
                    this.x -= this.travelSpeed;
                    this.travelSpeed *= this.travelVelocity;
                }
            } else {
                delete particles[this.id];
            }

            this.travelSpeed += (h / 2 - h * 0.65) * 0.0005

            if (this.yInit > h / 2) {
                this.y += this.travelSpeed;
                this.travelSpeed *= this.travelVelocity;
            } else if (this.yInit < h / 2) {
                this.y -= this.travelSpeed;
                this.travelSpeed *= this.travelVelocity;
            } else {
                delete particles[this.id];
            }

            if (this.opacity > this.opacityMax) {
                this.opacityRate *= -1;
                this.opacity = this.opacityMax;
            }
            if (this.opacity < this.opacityMin || (this.x < 0 - this.r || this.x > w + this.r) || (this.y < 0 - this.r || this.y > h + this.r)) {
                delete particles[this.id];
            }
        }

        Star = function () {
            this.w = random(1, 3);
            this.h = this.w;
            this.r = this.w / 2;
            this.xInit = random(0, w - (this.r * 2));
            this.x = this.xInit;
            this.yInit = random(0, h - this.r * 2);
            this.y = this.yInit;
            
            this.travelSpeed = 0.25;

            this.hue = hue;
            this.randomHue = random(0, 60);
            this.saturation = 100;
            this.light = random(50, 54);
            this.opacity = random(1,100) * 0.001;
            this.opacityRate = random(1, 10) * 0.001;
            this.opacityMin = 0;
            this.opacityMax = 1;
            
            stars[starsIndex] = this;
            this.id = starsIndex;
            starsIndex++;
        }

        Star.prototype.draw = function () {
            
            this.hue = hue + this.randomHue;

            cx.beginPath();
            cx.fillStyle = `hsla(${this.hue},${this.saturation}%,${this.light}%,${this.opacity})`;
            cx.arc(this.x,this.y,this.r,0,Math.PI * 2);
            cx.fill();
            
//            this.opacity+=this.opacityRate;
            
//            if (this.x > w / 2) {
//                this.x+=(this.x - w / 2) * this.travelSpeed * 0.01;
//            } else if (this.x < w / 2) {
//                this.x-=(w / 2 - this.x) * this.travelSpeed * 0.01;
//            } else {
//                delete particles[this.id];
//            }
//            
//            if (this.y > h / 2) {
//                this.y+=(this.y - h / 2) * this.travelSpeed * 0.01;
//            } else if (this.y < h / 2) {
//                this.y-=(h / 2 - this.y) * this.travelSpeed * 0.01;
//            } else {
//                delete particles[this.id];
//            }
            
//            if (this.opacity>this.opacityMax) {
//                this.opacityRate*=-1;
//                this.opacity = this.opacityMax;
//            }
//            if (this.opacity < this.opacityMin || (this.x < 0 || this.x > w) || (this.y < 0 || this.y > h)) {
//                delete particles[this.id];
//            }
        }

        function render() {
            $(window).resize(function () {
                c.width = $('#c').outerWidth();
                c.height = $('#c').outerHeight();
                w = c.width;
                h = c.height;
            });
            cx.globalCompositeOperation = 'source-over';
            cx.fillStyle = `rgba(${cbg.rgb},${cbg.a})`;
            cx.fillRect(0, 0, w, h);
            if (!starsRendered) {
                starsRendered = true;
                for (var i = 0; i < starNum; i++) {
                    new Star();
                }
            }
            if (!particlesRendered) {
//                particlesRendered = true;
                for (var i = 0; i < particleNum; i++) {
                    new Particle();
                }
            }

            cx.globalCompositeOperation = 'lighter';

            for (var i in particles) {
                particles[i].draw();
            }

            for (var i in stars) {
                stars[i].draw();
            }

            hue++;
            if (hue > 360) {
                hue = 0;
            }

            raf(render);
        }

        raf(render);

    }

    drawCanvas();

    window.addEventListener('mousemove', mouseCoord, false);

    function mouseCoord(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }
});