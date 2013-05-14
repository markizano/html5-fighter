
var Player = function ( top_label ) {

    var actions, self;

    actions = {
        IDLE: "IDLE",
        ATTACKING: "ATTACKING",
        DEFENDING: "DEFENDING",
        GUARD: "GUARD",
        MANA: "MANA",
        MOVING: "MOVING"
    };

    self = new Image( );
    self.imageReady = false;

    self.onload = function () {
        self.imageReady = true;
    };

    self.src = "assets/player.png";

    self.expand({
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
        x: 0,
        y: 0,
        width: 50,
        height: 80,

        /* Object Methods */
        alive: function ( ) {
            return this.hp > 0;
        },

        move: {
            parent: self,
            left: function ( delta ) {
                var accel_advance = 0.1;
                // Are we already moving or sitting still?
                if ( this.parent.action !== actions.IDLE || this.parent.action !== actions.MOVING ) {
                    // If not, don't process this button here.
                    return false;
                }

                // Make sure we stay within bounds of the canvas.
                if ( this.x < 0 ) {
                    return false;
                }

                delta = delta * accel_advance;
                (accel_advance < 1) && accel_advance += 0.1;
                this.x = this.x - ( delta * this.speed );
            },

            right: function ( delta ) {
                this.x = this.x + ( delta * this.speed );
            },

            up: function ( delta ) {
                this.y = this.y + ( delta * this.speed );
            },

            down: function ( delta ) {
                this.y = this.y - ( delta * this.speed );
            }
        }
    });

    return self;
};

