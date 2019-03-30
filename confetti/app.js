window.onload = function () {

    var container = $('#container'),
        overlay = $('#overlay'),
        header = $('#header');

    TweenMax.set($('#my-canvas'), {
        userSelect: 'none',
        pointerEvents: 'none'
    });

    TweenMax.set(container, {
        perspective: 800,
        perspectiveOrigin: 'center',
        userSelect: 'none'
    });

    TweenMax.set(header, {
        scaleX: 2,
        scaleY: 0
    });

    TweenMax.to(header, 1, {
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        delay: 0.75,
        ease: Elastic.easeOut,
        onComplete: function () {
            TweenMax.set(header, {
                pointerEvents: 'auto'
            });
        }
    }, 0);

    const random = function (min, max) {
        return Math.ceil(Math.random() * (max - min) + min);
    }

    var canvas = document.getElementById('my-canvas'),
        c = canvas.getContext('2d'),
        particles = {},
        particleIndex = 0,
        particleNum = 10;

    $(window).resize(function initial() {

        c.fillStyle = 'black';
        c.fillRect(0, 0, canvas.width, canvas.height);

        canvas.width = $('#my-canvas').outerWidth();
        canvas.height = $('#my-canvas').outerHeight();
        return initial;
    }());

    var reloadTime = 2000;

    function Particle() {
        this.width = random(10, 30);
        this.height = this.width;
        this.radius = random(10, 15);
        this.x = random(0, canvas.width);
        this.y = random(0, canvas.height);
        this.vxRate = 0.5;
        this.vyRate = 0.5;
        this.lifeRate = 50;
        this.vx = Math.random() * (10 * this.vxRate) - (5 * this.vxRate);
        this.vy = Math.random() * (10 * this.vyRate) - (5 * this.vyRate);
        this.gravity = 0.025;
        particleIndex++;
        particles[particleIndex] = this;
        this.id = particleIndex;
        this.life = 0;
        this.hue = random(0, 360);
        this.r = random(0, 255);
        this.g = random(0, 255);
        this.b = random(0, 255);
        this.maxLife = 100;
        this.alpha = 0;
        this.alphaChange = 0.01;
        this.hitHalf = false;
        this.shapeDecider = random(0, 10);
        this.counter = 0;
    }

    Particle.prototype.draw = function () {
        if ((this.alpha <= 0.5) && (this.counter == 0)) {
            this.alpha += this.alphaChange;
            this.hitHalf = true;
        }
        if (this.alpha >= 0.5) {
            this.counter++;
            this.alpha -= this.alphaChange;
        }
        if (this.counter != 0) {
            this.alpha -= this.alphaChange;
        }
        this.color = 'hsla(' + this.hue + ',100%,50%,' + this.alpha + ')';
        this.whiteColor = 'hsla(' + this.hue + ',100%,100%,' + this.alpha + ')';
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.life++;
        if (this.life >= this.maxLife) {
            delete particles[this.id];
        }

        if (this.shapeDecider < 5) {
            c.fillStyle = this.color;
            c.fillRect(this.x, this.y, this.width, this.height);
        } else {
            c.beginPath();
            c.fillStyle = this.color;
            c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            c.fill();
        }
    }

    setInterval(function () {
        c.globalCompositeOperation = 'source-over';
        c.fillStyle = 'rgba(0,0,0,1)';
        c.fillRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < particleNum; i++) {
            new Particle();
        }

        c.globalCompositeOperation = 'lighter';


        for (var i in particles) {
            particles[i].draw();
        }
    }, 30);

    if ($(window).width() < 1023) {
        header.on('touchstart', function () {
            TweenMax.to($(this), 0.75, {
                backgroundColor: 'white',
                color: 'black',
                ease: Expo.easeOut
            }, 0);
            TweenMax.to($(this), 1, {
                scale: 1.1,
                ease: Elastic.easeOut
            }, 0);
        });

        header.on('touchend', function () {
            TweenMax.to($(this), 0.5, {
                scale: 1,
                backgroundColor: 'black',
                color: 'white',
                ease: Expo.easeOut
            }, 0);
        });
    } else {
        header.on('mouseover', function () {
            TweenMax.to($(this), 0.75, {
                backgroundColor: 'white',
                color: 'black',
                ease: Expo.easeOut
            }, 0);
            TweenMax.to($(this), 1, {
                scale: 1.3,
                ease: Elastic.easeOut
            }, 0);
        });

        header.on('mouseout', function () {
            TweenMax.to($(this), 0.5, {
                scale: 1,
                backgroundColor: 'black',
                color: 'white',
                ease: Expo.easeOut
            }, 0);
        });
    }

}