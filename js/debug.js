
var Debug = function ( ) {
    var self = document.getElementById('debug');

    self.text = function ( msg ) {
        this.innerHTML = msg;
        return this;
    }

    return self;
};
