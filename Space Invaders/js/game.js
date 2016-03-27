var barrierGroup;
var testObject;
var barrierFallSpeed = 40;

GameState = function (game)
{
    
};

GameState.prototype =
{
    create : function ()
    {
        
        testObject = new mainObject(game, 4, 0);
        var notPlayer = new mainObject (game, 8, 0);
        
        game.add.existing(testObject);
        
        testObject.damage(3);
        
        testObject.heal(5);
        
        notPlayer.notHeal = function (health)
        {
            console.log(health);
        }
        
        notPlayer.notHeal(4);
        
        testObject.notHeal(8);
        
    },
    
    start : function ()
    {
        
    },
};




// A barrier object.
mainObject = function (game, position, anchor) 
{
    // Call for a sprite object.
	//Phaser.Sprite.call(this, game, position * game.width / 5, -20, "Player");
    Phaser.Sprite.call(this, game, position, 4, "Player");
    // Enable the physics for the sprite body.
	game.physics.enable(this, Phaser.Physics.ARCADE);
    // Set the sprite's inital anchor value.
    this.anchor.set(anchor, 0.5);
    
    this.damage = function (damageDealt)
    {
        console.log(damageDealt);
    }
};

// Extension of the barrier object to become a Phaser sprite. 
mainObject.prototype = Object.create(Phaser.Sprite.prototype);

// Create's a constructer from the object's parameters.
mainObject.prototype.constructor = mainObject;
 
// Constant update of the barrier instance.
mainObject.prototype.update = function () 
{
    // Drop the barrier down the screen by it's fall speed.
	this.body.velocity.y = barrierFallSpeed;
};

mainObject.prototype.heal = function (healthGiven)
{
    console.log(healthGiven);
};