nyan = (function() {
    var MP3_SRC = "nyancat.mp3";
    var IMG_SRC = "nyancat.gif";

    var STEP_SIZE = 25;
    var audio, body, img, targetX, targetY, mouseX = 0, mouseY = 0;


    function createAudioElement() {
        audio = document.createElement('embed');
        audio.src = MP3_SRC;
        audio.setAttribute('hidden', 'true');
        audio.setAttribute('autostart', 'true');
        audio.setAttribute('loop', 'true');
    }

    function createImgElement() {
        img = document.createElement('img');
        img.src = IMG_SRC;
        img.style['width'] = '200px';
        img.style['z-index'] = '100';
        img.style['position'] = 'absolute';
        img.style['left'] = 0;
        img.style['top'] = 0;
    }

    function randomWalk() {
        setRandomTarget();
        setInterval(function () {
            if (atTarget()) {
                setRandomTarget()
            }
            stepTowardsTarget();
        }, 20);
    }

    function speed() {
        var bonus = 0;
        var dx = mouseX - posX();
        var dy = mouseY - posY();
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 500) {
            bonus = (500 - dist) / 10;
        }
        return STEP_SIZE + bonus;
    }

    function atTarget() {
        return posX() == targetX && posY() == targetY;
    }

    function setRandomTarget() {
        targetX = Math.floor(Math.random() * window.innerWidth);
        targetY = Math.floor(Math.random() * window.innerHeight);
    }

    function posX() {
        return parseFloat(img.style['left']);
    }

    function posY() {
        return parseFloat(img.style['top']);
    }

    function stepTowardsTarget() {
        var dx = targetX - posX();
        var dy = targetY - posY();
        var d = Math.sqrt(dx * dx + dy * dy);
        var step = speed();
        if (d <= step) {
            img.style['left'] = targetX + 'px';
            img.style['top']  = targetY + 'px';
        }
        else {
            img.style['left'] = posX() + dx * step / d + 'px';
            img.style['top']  = posY() + dy * step / d + 'px';
        }
    }

    function setMouseListener() {
        window.addEventListener('mousemove', function () {
            mouseX = window.event.clientX;
            mouseY = window.event.clientY;
        });
    }

    return function() {
        createAudioElement()
        createImgElement()
        body = document.getElementsByTagName('body')[0];
        body.appendChild(audio);
        body.appendChild(img);
        setMouseListener();
        randomWalk();
    };

})();

window.addEventListener('load', nyan);
