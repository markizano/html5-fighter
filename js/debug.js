
var Debug = function ( ) {
    var self = document.getElementById('debug');
    self.debug = {};

    self.text = function ( msg ) {
        this.innerHTML = msg;
        return this;
    };

    self.stats = function ( ) {
        this.style.height = ( self.debug.length * 12 ) + "px";
        this.innerHTML = "";
        for ( var key in self.debug ) {
            if ( !typeof key === "string" ) continue;
            this.innerHTML += key + ": " + self.debug[key];
        }

        return this;
    }

    return self;
};
