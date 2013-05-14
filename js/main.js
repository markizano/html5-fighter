
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
    KEY_UP, KEY_DOWN, KEY_LEFT, KEY_RIGHT;
then = (new Date()).microtime();

KEY_UP = 38;
KEY_DOWN = 40;
KEY_LEFT = 37;
KEY_RIGHT = 39;

scripts = ['js/debug.js', 'js/player.js', 'js/canvas.js'];
while ( script = scripts.pop() ) {
    s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', script);
    document.head.appendChild(s);
}

main = (function ( FPS ) {
    var self = {
        p1: null,
        plane: null,
    };

    self.init = function ( ) {
        self.plane = new Canvas( document.getElementById('canvas') );
        self.plane.player = new Player( );
        self.debug = new Debug( );

        self.interval = setInterval(self.update, FPS);
        return self;
    };

    self.update = function () {
        var now = (new Date).microtime(), delta;
        delta = now - then;

        self.debug.text("FPS: " + delta.toFixed(5) + 's');
        if ( typeof self.plane === "undefined" ) {
            self.stop();
            console.error("Undefined plane.");
            return false;
        }

        self.plane.update( delta );
        self.plane.render();
        then = now;

        return self;
    };

    self.stop = function () {
        debug.text("FPS: 0/off");
        clearInterval(self.interval);
    };

    return self;
})( FPS = 25, then );

document.onload = function () { return main.init(); };

