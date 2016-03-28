// The player object.
Player = function (xPos, yPos, anchor, health, speed, lives)
{
    // Call for a sprite object.
    Phaser.Sprite.call(this, game, xPos, yPos, "Player");
    // Enable the physics for the sprite body.
	game.physics.enable(this, Phaser.Physics.ARCADE);
    // Set the sprite's inital anchor value.
    this.anchor.set(anchor, 0.5);
    
    // The player's total health.
    this.health = health;
    // The movement speed of the player.
    this.speed = speed;
    // The player's total number of lives.
    this.lives = lives;
    // The number of bullets the player has currently fired.
    this.bulletCount = 0;
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
    this.RespawnPlayer = function (xPos, yPos)
    {
        this.reset(xPos, yPos);
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
            if(this.bulletCount < 3)
            {
                this.bulletCount++;
                console.log("Bullet Fired! " + this.bulletCount);
            }
        }
    };
};

// Extension of the player object to become a Phaser sprite. 
Player.prototype = Object.create(Phaser.Sprite.prototype);
// The player's default constructor.
Player.prototype.constructor = Player;

// The bullet object.
Bullet = function (xPos, yPos, anchor, speed, damageWorth, isEnemyBullet)
{
    // Call for a sprite object.
    Phaser.Sprite.call(this, game, xPos, yPos, "Player");
    // Enable the physics for the sprite body.
	game.physics.enable(this, Phaser.Physics.ARCADE);
    // Set the sprite's inital anchor value.
    this.anchor.set(anchor, 0.5);
    
    this.speed = speed;
    this.damageWorth = damageWorth;
    this.isEnemyBullet = isEnemyBullet;
};

// Extension of the bullet object to become a Phaser sprite. 
Bullet.prototype = Object.create(Phaser.Sprite.prototype);
// The bullet's default constructor.
Bullet.prototype.constructor = Bullet;