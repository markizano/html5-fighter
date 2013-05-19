
var Canvas = function ( canvas ) {
    var self = document.createElement('canvas');

    self.setAttribute('id', 'canvas');
    self.innerHTML = "Your browser doesn't support the canvas tag. Try <a href='http://chrome.google.com/'>Google Chrome</a>.";

    with( self.style ) {
        backgroundImage = "url(/assets/background.png)";
        backgroundRepeat = "no-repeat";
        backgroundPosition = "bottom left";
        backgroundSize = "210%";
        width = "800px";
        height = "600px";
        self.width = 800;
        self.height = 600;
    }

    self.context = self.getContext('2d');
    self.context.translate(self.width /2, self.height /2);

    self.keysDown = [];

    self.addEventListener('keydown', self.keyDownEvent, false);
    self.addEventListener('keyup', self.keyUpEvent, false);

    self.player = {};
    self.enemies = [];
    self.objects = [];

    function keyTranslate (key) {
        switch (key) {
            case KEY_UP: return "up";
            case KEY_DOWN: return "down";
            case KEY_LEFT: return "left";
            case KEY_RIGHT: return "right";
            default: return false;
        }
    };

    self.render = function ( ) {
        self.clear();

        if ( this.player.imageReady) {
            with (this.player)
                this.context.drawImage(image, x, y, width, height);
        }

        return true;
    };

    self.update = function ( delta ) {
        var keys = [KEY_UP, KEY_DOWN, KEY_LEFT, KEY_RIGHT];
        while ( key = keys.shift() ) {
            if ( key in self.keysDown ) {
                self.move( keyTranslate(key), delta );
            }
        }

        return true;
    };

    self.move = function ( dir, delta ) {
        if ( dir === "up" ) {
            if ( self.player.y <= -( self.height /2 ) +64 ) {
                return true; // Movement ok, but we're at bounds.
            }
        } else if ( dir === "down" ) {
            if ( self.player.y >= (self.height /2) -64 ) {
                return true;
            }
        } else if ( dir === "left" ) {
            if ( self.player.x <= -( self.width /2 ) +64 ) {
                return true;
            }
        } else if ( dir === "right" ) {
            if ( self.player.x >= ( self.width /2 ) -64) {
                return true;
            }
        } else {
            return false;
        }

        return self.player.move[dir](delta);
    };

    self.keyDownEvent = function (e) {
        self.keysDown[e.keyCode] = true;
        return false;
    };

    self.keyUpEvent = function (e) {
        delete this.keysDown[e.keyCode];
        this.player.move.accel_advance = 0.1;
        return false;
    };

    self.clear = function () {
        return self.context.clearRect(-(this.width /2), -(this.height /2), this.width, this.height);
    };
    self.context.clear = function () {
        return self.context.clearRect(-(self.width /2), -(self.height /2), self.width, self.height);
    };

    return self;
};


