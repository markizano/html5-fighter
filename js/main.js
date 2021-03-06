
/* Fubar the original objects before using them. */

Date.prototype.microtime = function microtime () {
  return this.getTime() / 1000;
};

Object.prototype.expand = function (data) {
    for (var key in data) {
        this[key] = data[key];
    }
    return this;
}

/* Include our scripts from the server. */

var scripts, script, s, then, main,
    KEY_UP, KEY_DOWN, KEY_LEFT, KEY_RIGHT,
    FPS;
then = (new Date()).microtime();

KEY_UP = 38;
KEY_DOWN = 40;
KEY_LEFT = 37;
KEY_RIGHT = 39;
FPS = 10;

scripts = ['js/debug.js', 'js/player.js', 'js/canvas.js'];
while ( script = scripts.pop() ) {
    s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', script);
    document.head.appendChild(s);
}

main = (function ( FPS ) {
    var self = {
        plane: null,
        is_test: false,
        use: {
            delta: true,
            accel: true
        }
    };

    self.start = function ( ) {
        var c;
        self.plane = new Canvas( );
        self.plane.player = new Player( );
        self.debug = new Debug( );

        window.addEventListener('keydown', self.plane.keyDownEvent, false);
        window.addEventListener('keyup', self.plane.keyUpEvent, false);

        self.interval = setInterval(self.update, FPS);
        if ( ( c = document.getElementById('canvas') ) == null ) {
            document.getElementById('content').appendChild(self.plane);
        }

        self.plane.focus();
        return self;
    };

    self.update = function () {
        var now = (new Date).microtime(), delta;
        delta = now - then;

        //self.debug.text("FPS: " + delta.toFixed(5) + 's');
        self.debug.stats();

        if ( typeof self.plane === "undefined" ) {
            self.stop();
            console.error("Undefined plane.");
            return false;
        }

        if ( !self.plane.update( delta ) ) {
            self.stop();
            console.error("Update fail.");
            return false;
        }

        if ( !self.plane.render() ) {
            self.stop();
            console.error("Render fail.");
            return false;
        }

        if ( self.plane.player.imageReady && self.is_test ) {
            setTimeout(self.stop, FPS);
        }

        then = now;
        return self;
    };

    self.stop = function () {
        this.debug.text("FPS: 0/off");
        clearInterval(self.interval);
        window.removeEventListener('keydown', self.plane.keyDownEvent, false);
        window.removeEventListener('keyup', self.plane.keyUpEvent, false);
        return true;
    };

    self.test = function () {
        self.is_test = true;
        self.start();
        //setInterval(self.stop, 1000);
    };

    return self;
})( FPS, then );

