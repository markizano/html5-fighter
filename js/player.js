
var Player = function ( top_label ) {

    var actions, self;

    function calcTraverse(delta, accel_advance, speed) {
        var traverse = 0;
        if ( main.use.delta )
            traverse += delta
        if ( main.use.accel ) {
            traverse += accel_advance * speed;
        } else {
            traverse += this.speed;
        }
        return traverse;
    }

    actions = {
        IDLE: "IDLE",
        ATTACKING: "ATTACKING",
        DEFENDING: "DEFENDING",
        GUARD: "GUARD",
        MANA: "MANA",
        MOVING: "MOVING"
    };

    self = {
        /* In-Game Variables */
        label: top_label,      // The text rendered at the top of the screen above the character's life bar.
        action: "IDLE", // Indicates current action.
        strength: 1,    // How powerful are hits against opponents
        defense: 1,     // How well do we protect ourselves when taking hits.
        speed: 1,       // Quickly, are the movements.
        accel: 0,       // 0-1; Placeholder for the amount of accelleration we have.
        hp: 100,        // Base life amount.
        mp: 10,         // Magic/alternate attack gage.
        fatigue: 0,     // 0-100$% scale of fatigue.
        critical: 1,    // 0-100% chance at critical hits.

        /* Visual/Graphical Variables */
        x: -330,
        y: 45,
        width: 46,
        height: 79,
        image: new Image( ),
        imageReady: false,

        /* Object Methods */
        alive: function ( ) {
            return this.hp > 0;
        },

        move: {
            parent: self,
            accel_advance: 0.1,
            left: function ( delta ) {
                // Are we already moving or sitting still?
                if ( this.parent.action !== actions.IDLE || this.parent.action !== actions.MOVING ) {
                    // If not, don't process this button here.
                    return false;
                }

                this.x -= calcTraverse(delta, this.accel_advance, this.parent.speed);
                (this.accel_advance < 1) && this.accel_advance += 0.1;

                return true;
            },

            right: function ( delta ) {
                // Are we already moving or sitting still?
                if ( this.parent.action !== actions.IDLE || this.parent.action !== actions.MOVING ) {
                    // If not, don't process this button here.
                    return false;
                }


                this.x += calcTraverse(delta, this.accel_advance, this.parent.speed);
                (this.accel_advance < 1) && this.accel_advance += 0.1;

                return true;
            },

            up: function ( delta ) {
                // Are we already moving or sitting still?
                if ( this.parent.action !== actions.IDLE || this.parent.action !== actions.MOVING ) {
                    // If not, don't process this button here.
                    return false;
                }

                this.y -= calcTraverse(delta, this.accel_advance, this.parent.speed);
                (this.accel_advance < 1) && this.accel_advance += 0.1;
                return true;
            },

            down: function ( delta ) {
                // Are we already moving or sitting still?
                if ( this.parent.action !== actions.IDLE || this.parent.action !== actions.MOVING ) {
                    // If not, don't process this button here.
                    return false;
                }

                this.y += calcTraverse(delta, this.accel_advance, this.parent.speed);
                (this.accel_advance < 1) && this.accel_advance += 0.1;
                return true;
            }
        }
    };

    self.image.onload = function () {
        self.imageReady = true;
    };
    self.image.src = "assets/player.png";

    return self;
};

