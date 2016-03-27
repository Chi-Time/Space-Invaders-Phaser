// A barrier object.
Player = function (x, y, anchor, health, speed, lives)
{
    // Call for a sprite object.
    Phaser.Sprite.call(this, game, x, y, "Player");
    // Enable the physics for the sprite body.
	game.physics.enable(this, Phaser.Physics.ARCADE);
    // Set the sprite's inital anchor value.
    this.anchor.set(anchor, 0.5);
    
    // The player's total health.
    this.mHealth = health;
    // The movement speed of the player.
    this.mSpeed = speed;
    // The player's total number of lives.
    this.mLives = lives;
    // Whether or not the player is able to fire a bullet.
    this.canFire = true;
    
    // Removes a life from the player.
    this.RemoveLife = function ()
    {
        this.mLives--;
    };
    
    // Add's a life to the player.
    this.AddLife = function ()
    {
        this.mLives++;
    };
    
    // Removes the player from the game.
    this.KillPlayer = function ()
    {
        this.kill();
    };
    
    // Respawns the player at the given coordinates.
    this.RespawnPlayer = function (x, y)
    {
        this.reset(x,y);
    };
    
    // Moves the player to the left by it's speed value.
    this.MoveLeft = function ()
    {
        this.body.velocity.x = -speed;
    };
    
    // Moves the player to the right by it's speed value.
    this.MoveRight = function ()
    {
        this.body.velocity.x = speed;
    };
    
    // Stop's the player moving in any direction.
    this.Stop = function ()
    {
        this.body.velocity.x = 0;
    };
    
    // Spawn's and fires a player bullet.
    this.FireBullet = function ()
    {
        if(this.canFire)
        {
            console.log("Bullet Fired!");
        }
    };
};

// Extension of the barrier object to become a Phaser sprite. 
Player.prototype = Object.create(Phaser.Sprite.prototype);
// Create's a constructer from the object's parameters.
Player.prototype.constructor = Player;