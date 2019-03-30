window.onload = function () {

    TweenMax.set($('#my-canvas'), {
        userSelect: 'none',
        pointerEvents: 'none'
    });

    TweenMax.set($('#header'), {
        display: 'none'
    });

    TweenMax.set($('#header'), {
        y: 50
    });
    
    TweenMax.to($('#header'), 1, {
        opacity: 1,
        y: 0,
        delay: 0.5
    }, 0);
    
    const random = function(min, max) {
        return Math.ceil(Math.random() * (max - min) + min);
    }

    var canvas = document.getElementById('my-canvas'),
        c = canvas.getContext('2d'),
        particles = {},
        particleIndex = 0,
        particleNum = 1;
    
    $(window).resize(function initial() {

    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);

    canvas.width = $('#my-canvas').outerWidth();
    canvas.height = $('#my-canvas').outerHeight();
        return initial;
    }());

    var reloadTime = 2000;

    function Particle() {
        this.width = random(1, 20);
        this.height = random(1, 20);
        this.radius = random(1, 1);
        this.x = random(0, canvas.width);
        this.y = random(0, canvas.height);
        this.vxRate = 0.5;
        this.vyRate = 0.5;
        this.lifeRate = 50;
        this.vx = Math.random() * (10 * this.vxRate) - (5 * this.vxRate);
        this.vy = Math.random() * (10 * this.vyRate) - (5 * this.vyRate);
        this.gravity = 0.05;
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
        this.counter = 0;
    }

    Particle.prototype.draw = function () {
        if ((this.alpha <= 0.5) && (this.counter == 0)) {
          this.alpha += this.alphaChange; 
          this.hitHalf = true;
          // this.counter++;
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
//        if (Math.random() < 0.1) {
//            this.vx = Math.random() * 50 - 25;
//            this.vy = Math.random() * 50 - 25;
//        }
        this.life++;
        if (this.life >= this.maxLife) {
            delete particles[this.id];
        }

        c.beginPath();
        // if (Math.random() < 0.5) {
        //     c.fillStyle = this.color;
        // } else {
        //     c.fillStyle = this.whiteColor;
        // }
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.width, this.height);
        // c.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        // c.fill();
    }

    setInterval(function () {
        c.globalCompositeOperation = 'source-over';
        // c.fillStyle = 'rgba(0,0,0,0.1)';
        // c.fillRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < particleNum; i++) {
            new Particle();
        }

         c.globalCompositeOperation = 'lighter';


        for (var i in particles) {
            particles[i].draw();
        }
    }, 30);

}