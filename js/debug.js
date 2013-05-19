
var Debug = function ( ) {
    var self = document.getElementById('debug');
    self.debug = {};

    self.text = function ( msg ) {
        this.innerHTML = msg;
        return this;
    };

    self.stats = function ( ) {
        var html = [];
        this.innerHTML = "";
        for ( var key in self.debug ) {
            if ( typeof self.debug[key] === "function" ) continue;
            html.push(key + ": " + self.debug[key]);
        }

        this.style.height = ( html.length * 16 ) + "px";
        this.innerHTML = html.join("<br />\n");
        return this;
    }

    return self;
};
