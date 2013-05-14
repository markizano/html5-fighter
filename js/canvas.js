
var Canvas = function ( canvas ) {
    var self = canvas;
    if ( typeof self !== typeof Object || self.hasOwnProperty('getContext') ) {
        self = document.getElementsByTagName('canvas')[0]; // Get the first <canvas> by default.
    }

    self.context = self.getContext('2d');
    self.context.translate(self.width /2, self.height /2);

    self.keysDown = [];
    self.background = new Image();
    with ( self.background ) {
        imageReady = false;
        width = self.width;
        height = self.height;
        onload = function () {
            this.imageReady = true;
        };
        src = "assets/background.png";
    }


    self.addEventListener('keydown', self.keyDownEvent, false);
    self.addEventListener('keyup', self.keyUpEvent, false);

    self.player = {};
    self.enemies = [];
    self.objects = [];

    self.render = function ( ) {
        var player;

        this.background.imageReady && this.context.drawImage(this.background, 0, 0);
        self.player.imageReady && self.context.drawImage(self.player, self.player.x, self.player.y);

        return {
            background: this.background.imageReady,
            players: self.players,
            objects: self.objects
        };
    };

    self.keyTranslate = function (key) {
        switch (key) {
            case KEY_UP: return "up";
            case KEY_DOWN: return "down";
            case KEY_LEFT: return "left";
            case KEY_RIGHT: return "right";
            default: return false;
        }
    };

    self.update = function ( ) {
        var keys = [KEY_UP, KEY_DOWN, KEY_LEFT, KEY_RIGHT];
        while ( key = keys.shift() ) {
            if ( key in self.keysDown ) {
                self.p1.move[self.keyTranslate(key)]();
            }
        }

        return true;
    };

    self.keyDownEvent = function (e) {
        self.keysDown[e.keyCode] = true;
    };

    self.keyUpEvent = function (e) {
        delete this.keysDown[e.keyCode];
    };

    return self;
};


