window.onload = function () {

    TweenMax.set($('#my-canvas'), {
        userSelect: 'none',
        pointerEvents: 'none'
    });

    TweenMax.set($('#header'), {
        y: 50
    });

    TweenMax.to($('#header'), 1, {
        opacity: 1,
        y: 0,
        delay: 0.5
    }, 0);

    const random = function (min, max) {
        return Math.ceil(Math.random() * (max - min) + min);
    }

    var canvas = document.getElementById('my-canvas');
    var c = canvas.getContext('2d');
    var particles = {};
    var particleIndex = 0;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        var particleNum = 10;
    } else {
        var particleNum = 20;
    }

    $(window).resize(function initial() {

        c.fillStyle = 'black';
        c.fillRect(0, 0, canvas.width, canvas.height);

        canvas.width = $('#my-canvas').outerWidth();
        canvas.height = $('#my-canvas').outerHeight();
        return initial;
    }());

    var reloadTime = 2000;

    function Particle() {
        this.radius = random(1, 50);
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.vxRate = 2;
        this.vyRate = 2;
        this.lifeRate = 50;
        this.vx = Math.random() * (10 * this.vxRate) - (5 * this.vxRate);
        this.vy = Math.random() * (10 * this.vyRate) - (5 * this.vyRate);
        this.gravity = 0.6;
        particleIndex++;
        particles[particleIndex] = this;
        this.id = particleIndex;
        this.life = 0;
        this.hue = parseInt(Math.random() * 360, 10);
        this.maxLife = 70;
        this.alpha = random(0.5, 0.9);
        this.alphaChange = 0.925;
    }

    Particle.prototype.draw = function () {
        this.alpha *= this.alphaChange;
        this.color = 'hsla(' + this.hue + ',100%,50%,' + this.alpha + ')';
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.life++;
        if (this.life >= this.maxLife) {
            delete particles[this.id];
        }

        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.fill();
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

}