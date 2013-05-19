
var Player = function ( top_label ) {

    var actions, self;

    function calcTraverse(delta, accel_advance, speed) {
        var traverse = 0;
        if ( main.use.delta )
            traverse += delta
        if ( main.use.accel ) {
            traverse += accel_advance * speed;
        } else {
            traverse += speed;
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
        speed: 2,       // Fastest speed we will achieve.
        accel: 0.05,   // 0-1; How quick will the character reach its max speed.
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
            accel_advance: 0,
            left: function ( delta ) {
                if ( self.action !== actions.IDLE && self.action !== actions.MOVING ) {
                    return false;
                }

                self.x -= calcTraverse(delta, this.accel_advance, self.speed);
                (this.accel_advance < 1) && ( this.accel_advance += self.accel );

                return true;
            },

            right: function ( delta ) {
                if ( self.action !== actions.IDLE && self.action !== actions.MOVING ) {
                    return false;
                }


                self.x += calcTraverse(delta, this.accel_advance, self.speed);
                (this.accel_advance < 1) && ( this.accel_advance += self.accel );

                return true;
            },

            up: function ( delta ) {
                if ( self.action !== actions.IDLE && self.action !== actions.MOVING ) {
                    return false;
                }

                self.y -= calcTraverse(delta, this.accel_advance, self.speed);
                (this.accel_advance < 1) && ( this.accel_advance += self.accel );

                return true;
            },

            down: function ( delta ) {
                if ( self.action !== actions.IDLE && self.action !== actions.MOVING ) {
                    return false;
                }

                self.y += calcTraverse(delta, this.accel_advance, self.speed);
                (this.accel_advance < 1) && ( this.accel_advance += self.accel );

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

