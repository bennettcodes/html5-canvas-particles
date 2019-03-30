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
    var bodyHTML = $('body, html'),
        container = $('#container'),
        sceneContainer = $('#scene-container'),
        c = document.getElementById('c'),
        cx = c.getContext('2d'),
        cbg = {
            rgb: '255,255,255',
            a: 1
        },
        camY = 0,
        test = $('#test'),
        Particle,
        Cube,
        canvasFlipped = false,
        particles = {},
        cubes = {},
        particleNum = 1,
        cubeNum = 1,
        particleIndex = 0,
        cubeIndex = 0,
        mouseX = null,
        mouseXTriggered = false,
        mouseY = null,
        hueChange = 0,
        counter = 0,
        particlesRendered = false,
        planeRendered = false,
        cubesRendered = false;

    TweenMax.set(bodyHTML, {
        backgroundColor: 'white'
    });

    TweenMax.set(container, {
        opacity: 1,
        backgroundColor: 'white'
    });

    TweenMax.set(sceneContainer, {
        opacity: 1,
        backgroundColor: 'white'
    });

    c.width = $('#c').outerWidth();
    c.height = $('#c').outerHeight();

    var w = c.width,
        h = c.height;

    window.addEventListener('mousemove', mouseCoord, false);

    function mouseCoord(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!mouseXTriggered) {
            mouseXTriggered = true;
            camPosX = w / 2;
            camPosY = h / 2;

            camera.position.x = camPosX + newCamPosX;
            camera.position.y = camPosY + newCamPosY;
            camera.position.z = camPosZ + newCamPosZ;
            camera.rotation.x = camRotX + newCamRotX;
            camera.rotation.y = camRotY + newCamRotY;
            camera.rotation.z = camRotZ + newCamRotZ;
        }
    }

    test.html('hey');

    cx.fillStyle = `rgba(${cbg.rgb},${cbg.a})`;
    cx.fillRect(0, 0, w, h);

    var camPosX,
        newCamPosX = 0,
        camPosY,
        newCamPosY = 0,
        camPosZ = 1000,
        newCamPosZ = 0,
        camRotX = 0,
        newCamRotX = 0,
        camRotY = 0,
        newCamRotY = 0,
        camRotZ = 0,
        newCamRotZ = 0,
        renderer,
        camera,
        scene,
        plane,
        light,
        lightAmb;

    renderer = new THREE.WebGLRenderer();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

    renderer.setSize(window.innerWidth, window.innerHeight);

    var material = new THREE.MeshBasicMaterial({
        color: 0x70bac7,
        shading: THREE.FlatShading,
        vertexColors: THREE.VertexColors
    });

    camPosX = mouseX != null ? w / 2 : 0;
    camPosY = mouseY != null ? h / 2 : 0;

    camera.position.x = camPosX + newCamPosX;
    camera.position.y = camPosY + newCamPosY;
    camera.position.z = camPosZ + newCamPosZ;
    camera.rotation.x = camRotX + newCamRotX;
    camera.rotation.y = camRotY + newCamRotY;
    camera.rotation.z = camRotZ + newCamRotZ;

    light = new THREE.PointLight(0xEEEEEE);
    lightAmb = new THREE.AmbientLight(0x777777);
    light.position.set(500, 0, 800);

    sceneContainer.empty();
    sceneContainer.html(renderer.domElement);

    renderer.setClearColor(0x000000);

    Cube = function () {
        this.props;
        this.cubeWidthInit = 100;
        this.cubeWidth = 0;
        this.newCubeWidth = this.cubeWidthInit * 0.1;
        this.cubeHeightInit = this.cubeWidthInit;
        this.cubeHeight = 0;
        this.newCubeHeight = this.cubeHeightInit * 0.1;
        this.cubeLengthInit = 400;
        this.cubeLength = this.cubeLengthInit;
        this.newCubeLength = 0;
        this.cubeMult = -1.5;
        this.cubeSizeMult = 0.9;
        this.color = {
            rgb: '0,0,0',
            a: 1
        };
        this.hue = 0;
        this.hue2 = random(0, 360);
        this.sat = 100;
        this.light = 50;
        this.lightChange = -3;
        this.opacity = 1;
        this.opacityChange = -0.01;
        this.parameters = 1;
        this.parametersX = 50;
        this.parametersY = 100;
        this.paramOffset = 0.0;
        this.material = new THREE.MeshLambertMaterial({
            color: `hsla(${this.hue + hueChange},${this.sat}%,${this.light}%,${this.opacity})`
        });
        this.cubePosX = mouseX != null ? random(mouseX - (w * this.paramOffset), mouseX + (w * this.paramOffset)) : random(this.parametersX * -1, this.parametersX);
        this.cubePosY = mouseY != null ? random(mouseY - (h * this.paramOffset), mouseY + (h * this.paramOffset)) : random(this.parametersY * -1, this.parametersY);
        this.life = 0;
        this.maxLife = 100;
        cubes[cubeIndex] = this;
        this.id = cubeIndex;
        cubeIndex++;
    }

    Cube.prototype.draw = function () {
        this.material = new THREE.MeshLambertMaterial({
            color: `hsla(${this.hue + hueChange},${this.sat}%,${Math.floor(this.light)}%,${this.opacity})`
        });

        this.props = new THREE.Mesh(new THREE.CubeGeometry(this.cubeWidth, this.cubeHeight, this.cubeLength), this.material);
        this.cubeLength += this.newCubeLength;
        this.newCubeLength += this.cubeMult;
        this.props.position.x = this.cubePosX;
        this.props.position.y = this.cubePosY;
        this.props.rotation.x = 0.7;

        this.cubeWidth += this.newCubeWidth;
        this.cubeHeight += this.newCubeHeight;
        this.newCubeWidth *= this.cubeSizeMult;
        this.newCubeHeight *= this.cubeSizeMult;
        if (this.cubeWidth > this.cubeWidthInit) {
            this.newCubeWidth = -0.01;
            this.newCubeHeight = -0.01;
            this.cubeSizeMult = 1.025;
            this.cubeWidth = this.cubeWidthInit;
        }
        if (this.cubeWidth < 0.1 || this.cubeLength < 1) {
            scene.remove(this.props);
            delete cubes[this.id];
        }

    }

    function render() {
        renderer.clear();
        counter++;
        if (hueChange > 360) {
            hueChange = 0;
        }
        hueChange += 5;

        if (!canvasFlipped) {
            canvasFlipped = true;
            TweenMax.set($('canvas'), {
                scaleY: -1
            });
        }

        scene = new THREE.Scene();

        switch (true) {
            //        MOBILE REDIR
        case (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) && (!(/iPad/i.test(navigator.userAgent))):
        if (counter % 5 === 0) {
            //                cubesRendered = true;
            for (var i = 0; i < cubeNum; i++) {
                new Cube();
            }
        }
            //            location.replace("../mobile/index.php#");
            break;
            //        TABLET REDIR
        case (!(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent))) && (/iPad/i.test(navigator.userAgent)):
        if (counter % 5 === 0) {
            //                cubesRendered = true;
            for (var i = 0; i < cubeNum; i++) {
                new Cube();
            }
        }
            //            location.replace("../tablet");
            break;
            //        DESKTOP REDIR
        default:
        if (!cubesRendered) {
            //                cubesRendered = true;
            for (var i = 0; i < cubeNum; i++) {
                new Cube();
            }
        }
            //            location.replace("../index.php#");
            break;
        }

        for (var i in cubes) {
            cubes[i].draw();
        }

        for (var i in cubes) {
            scene.add(cubes[i].props);
        }

        scene.add(light);
        scene.add(lightAmb);
        renderer.render(scene, camera);

        raf(render);
    }

    raf(render);
});