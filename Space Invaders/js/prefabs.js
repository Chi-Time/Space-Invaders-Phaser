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

// The enemy object.
Enemy = function (xPos, yPos, anchorX, anchorY, health, scoreWorth, rowValue, spriteKey)
{
    // Call for the sprite object.
    Phaser.Sprite.call(this, game, xPos, yPos, spriteKey);
    // Enable arcade physics for the sprite.
    game.physics.enable(this, Phaser.Physics.ARCADE);
    // Set the sprite's anchor.
    this.anchor.set(anchorX, anchorY);
    
    // Assign the enemy's variables. \\
    
    // The enemy's health value.
    this.health = health;
    // The enemy's score worth upon death.
    this.scoreWorth = scoreWorth;
    // The row to which this enemy belongs.
    this.rowValue = rowValue;
    // Can the enemy fire a bullet?
    this.canFire = false;
    
    // Applies damage to enemy object.
    this.Damage = function (damageDealt)
    {
        this.health -= damageDealt;
        if(this.health <= 0)
        {
            console.log("Enemy has died.");
        }
    };
    
    // Kill's the enemy object.
    this.KillEnemy = function ()
    {
        this.kill();
    };
    
    // Increase's the player's score.
    this.IncreaseScore = function ()
    {
        
    };
    
    // Set's the enemy below this to be allowed to fire.
    this.SetPreviousEnemyToFire = function ()
    {
        
    };
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

// The alien object.
Alien = function (xPos, yPos, anchorX, anchorY, scoreWorth, speed)
{
    // Call for a sprite object.
    Phaser.Sprite.call(this, game, xPos, yPos, "Player");
    // Enable the object's arcade physics.
    game.physics.enable(this, Phaser.Physics.ARCADE);
    // Set the object's anchor.
    this.anchor.set(anchorX, anchorY);
    
    //--Assign the alien's variables--\\
    
    // The alien's score worth upon death.
    this.scoreWorth = scoreWorth;
    // The movement speed of the alien.
    this.speed = speed;
    // Is the alien on the left of the screen?
    this.isLeft = false;
    
    // Move's the alien ship.
    this.Move = function ()
    {
        if(this.isLeft)
        {
            this.body.velocity.x = speed;
        }
        else
        {
            this.body.velocity.x = -speed;
        }
    };
    
    // Spawn's the alien at a random side of the screen.
    this.SpawnShip = function ()
    {
        var randDir = RandomRange(0, 4);
        
        if(randDir == 0)
        {
            this.isLeft = true;
            this.reset(0,60);
            this.Move()
        }
        else if( randDir == 1)
        {
            this.isLeft = false;
            this.reset(800,60);
            this.Move()
        }
    };
    
    // Increase's the player's score.
    this.IncreaseScore = function ()
    {
        
    };
    
    // Kill's the alien object.
    this.KillAlien = function ()
    {
        
    };
    
    // Kill's the alien object when it has left the screen.
    this.KillAlienOutOfBounds = function ()
    {
        
    };
};

// Extend the alien object.
Alien.prototype = Object.create(Phaser.Sprite.prototype);
// The alien's default constructor.
Alien.prototype.constructor = Enemy;

// The bullet object.
Bullet = function (xPos, yPos, anchor, speed, damageWorth, isEnemyBullet)
{
    // Call for a sprite object.
    Phaser.Sprite.call(this, game, xPos, yPos, "Player");
    // Enable the physics for the sprite body.
	game.physics.enable(this, Phaser.Physics.ARCADE);
    // Set the sprite's inital anchor value.
    this.anchor.set(anchor, 0.5);
    
    //--Assign the bullet's variables--\\
    
    this.speed = speed;
    this.damageWorth = damageWorth;
    this.isEnemyBullet = isEnemyBullet;
};

// Extension of the bullet object to become a Phaser sprite. 
Bullet.prototype = Object.create(Phaser.Sprite.prototype);
// The bullet's default constructor.
Bullet.prototype.constructor = Bullet;