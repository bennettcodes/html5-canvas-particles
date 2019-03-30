// shim layer with setTimeout fallback
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

const sarafiZoomPrevention = function () {
    document.addEventListener("touchstart", function () {}, true);
    document.documentElement.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, false);
    var lastTouchEnd = 0;
    document.documentElement.addEventListener('touchend', function (event) {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

sarafiZoomPrevention();

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
        a: 0.01
    },

    heartOutlineContainer = $('#heart-outline-container'),
    heartOutline = $('#heart-outline'),

    bar = $('.bar'),
    barTop = $('#top'),
    barBottom = $('#bottom'),
    barLeft = $('#left'),
    barRight = $('#right'),

    fps = 60,
    now,
    then = Date.now(),
    interval = 1000 / fps,
    delta,

    render,

    Particle,
    particles = {},
    particleNum = 10,
    particleIndex = 0,
    mouseX = null,
    mouseY = null,
    hueMin = 350,
    hueMax = 400,
    hue = hueMin,
    hueInc = 0.5,
    rMult = 1,
    w,
    h,
    rInc,
    diagonalDistance = (Math.sqrt((window.innerWidth * window.innerWidth) + (window.innerHeight * window.innerHeight))),
    startingOpacity = 0,
    opacityDirection = -1,
    particlesRendered = false;

heartOutline.imagesLoaded(function () {

    $(window).resize(function init() {

        diagonalDistance = (Math.sqrt((window.innerWidth * window.innerWidth) + (window.innerHeight * window.innerHeight)));

        TweenMax.set(container, {
            opacity: 1,
            '-webkit-filter': `blur(${diagonalDistance * 0.01}px)`
        });

        TweenMax.set(c, {
            '-webkit-filter': `hue-rotate(${hue}deg)`
        });
        TweenMax.set(heartOutlineContainer, {
            width: diagonalDistance * 0.35
        });

        rInc = heartOutlineContainer.width() * 0.001;
        TweenMax.set(heartOutlineContainer, {
            y: window.innerHeight / 2 - heartOutlineContainer.height() / 2,
            x: window.innerWidth / 2 - heartOutlineContainer.width() / 2
        });

        TweenMax.set(barTop, {
            width: window.innerWidth,
            height: window.innerHeight
        });

        TweenMax.set(barTop, {
            top: barTop.height() * -1 + heartOutline.width() * 0.005,
            left: heartOutlineContainer.offset().left * -1
        });

        TweenMax.set(barBottom, {
            width: window.innerWidth,
            height: window.innerHeight
        });

        TweenMax.set(barBottom, {
            bottom: barBottom.height() * -1 + heartOutline.width() * 0.005,
            left: heartOutlineContainer.offset().left * -1
        });

        TweenMax.set(barLeft, {
            width: window.innerWidth,
            height: window.innerHeight
        });

        TweenMax.set(barLeft, {
            left: barLeft.width() * -1 + heartOutline.width() * 0.005,
            top: heartOutlineContainer.offset().top * -1
        });

        TweenMax.set(barRight, {
            width: window.innerWidth,
            height: window.innerHeight
        });

        TweenMax.set(barRight, {
            right: barRight.width() * -1 + heartOutline.width() * 0.005,
            top: heartOutlineContainer.offset().top * -1
        });

        c.width = $('#c').outerWidth();
        c.height = $('#c').outerHeight();

        w = c.width,
            h = c.height;

        cx.fillStyle = `rgba(${cbg.rgb},${cbg.a})`;
        cx.fillRect(0, 0, w, h);

        return init;
    }())
})


function drawCanvas() {

    Particle = function () {
        this.r = random(heartOutlineContainer.width() * 0.01, heartOutlineContainer.width() * 0.05) * rMult;
        this.rInc = this.r * 0.05;
        this.x = random(heartOutlineContainer.offset().left - this.r, heartOutlineContainer.offset().left + heartOutlineContainer.width() - this.r);
        this.y = random(heartOutlineContainer.offset().top - this.r, heartOutlineContainer.offset().top + heartOutlineContainer.height() - this.r);
        this.hue = random(280, 320);
        this.saturation = 100;
        this.light = random(30, 100);
        this.opacity = startingOpacity;
        this.opacityDirection = opacityDirection;
        this.opacityInc = random(1, 10) * 0.001 * this.opacityDirection;

        particles[particleIndex] = this;
        this.id = particleIndex;
        particleIndex++;
    }

    Particle.prototype.draw = function () {

        this.r += this.rInc;
        this.rInc *= 0.99;

        this.opacity -= this.opacityInc;

        if (this.opacity > 1) {
            this.opacityInc *= -1;
        }

        if (this.opacity < 0.01) {
            delete particles[this.id];
        }

        cx.beginPath();
        cx.fillStyle = `hsla(${this.hue},${this.saturation}%,${this.light}%,${this.opacity})`;
        cx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        cx.fill();
    }

    function render() {

        request = requestAnimFrame(render);

        now = Date.now();
        delta = now - then;

        if (delta > interval) {

            then = now - (delta % interval);
            $(window).resize(function () {
                c.width = $('#c').outerWidth();
                c.height = $('#c').outerHeight();
                w = c.width;
                h = c.height;
            });
            cx.globalCompositeOperation = 'source-over';
            cx.fillStyle = `rgba(${cbg.rgb},${cbg.a})`;
            cx.fillRect(0, 0, w, h);
            if (!particlesRendered) {
                //            particlesRendered = true;
                for (var i = 0; i < particleNum; i++) {
                    new Particle();
                }
            }

            //        cx.globalCompositeOperation = 'lighter';

            for (var i in particles) {
                particles[i].draw();
            }

            hue += hueInc;

            TweenMax.set(c, {
                '-webkit-filter': `hue-rotate(${Math.floor(hue)}deg)`
            });
        }
    }

    render();

}

drawCanvas();

window.addEventListener('mousemove', mouseCoord, false);

function mouseCoord(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
}