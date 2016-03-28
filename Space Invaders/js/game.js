var leftBoundary;
var rightBoundary;
var topBoundary;
var bottomBoundary;
// Define the game state.
GameState = function (game)
{
    
};

// Extend the game state.
GameState.prototype =
{
    create : function ()
    {
        this.initGameDefaults();
        this.initPhysics();
        this.initGraphics();
        this.initObjects();
        this.initInput();
        this.initEventHandlers();
        this.initAudio();
        this.initUI();
        
        // Enable checking of advancedTiming for debug.
        this.game.time.advancedTiming = true;
        
        //dog = game.add.sprite(200,0);
        
        alien.SpawnShip();
    },
    
    // Initialise the game's default values.
    initGameDefaults : function ()
    {
        // Set the initial game score.
        score = 0;
        // Set the initial lives count.
        lives = 3;
    },
    
    //DEBUG FUNCTION - test's whether a player can be respawned through the use of Phaser.reset().\\
    addCharacter : function ()
    {
        player.RespawnPlayer(16, 16);
    },
    //DEBUG FUNCTION - test's whether a player can be killed through the use of Phaser.kill().\\
    removeCharacter : function ()
    {
        player.KillPlayer();
    },
    
    // Initialise the game's physics system.
    initPhysics : function ()
    {
        // Start the physics system for use in the whole game.
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        
    },
    
    enableBody : function (bodyToEnable)
    {
        game.physics.arcade.enable(bodyToEnable);
    },
    
    // Initiliase the graphics for the game.
    initGraphics : function ()
    {
        
    },
    
    // Create the game objects.
    initObjects : function ()
    {
        leftBoundary = game.add.sprite(0, 0);
        rightBoundary = game.add.sprite(790, 0);
        topBoundary = game.add.sprite(0, 0);
        bottomBoundary = game.add.sprite(0, 588);
        
        player = new Player(400, 550, 0.5, 3, playerSpeed, LIVES);
        game.add.existing(player);
        
        alien = new Alien(6,6,0.5,0.5,50,100);
        game.add.existing(alien);
        alien.visible = false;
        
        this.enableBody(leftBoundary);
        this.enableBody(rightBoundary);
        this.enableBody(topBoundary);
        this.enableBody(bottomBoundary);
        leftBoundary.body.setSize(10,600, 0, 0);
        rightBoundary.body.setSize(10,600, 0, 0);
        topBoundary.body.setSize(800,10, 0, 0);
        bottomBoundary.body.setSize(800,10, 0, 0);
    },
    
    hideAlien : function ()
    {
        console.log("SPAWNED");
        alien.SpawnShip();
    },
    
    alienDeath : function ()
    {
        alien.KillAlien();
        console.log("DEAD: " + score);
    },
    
    // Initiliase the input listeners and controls.
    initInput : function ()
    {
        // Create the keyboard controls.
        cursors = game.input.keyboard.createCursorKeys();
    },
    
    // Initialise the game's event handlers.
    initEventHandlers : function ()
    {
        //game.time.events.loop(4000, this.removeCharacter);
        //game.time.events.add(1000, this.hideAlien);
        //game.time.events.add(10000, this.alienDeath);
        //game.time.events.loop(2000, this.alienDeath);
        //game.time.events.loop(8000, this.addCharacter);
    },
    
    // Initiliase the game's audio.
    initAudio : function ()
    {
        
    },
    
    // Initialise the game's user interface.
    initUI : function ()
    {
        // Create a text object to display our fps.
        fpsText = game.add.text(35, 575, this.game.time.fps, {font: '18px Courier', fill: '#ffffff'});
    },
    
    // Check for constant changes. (Called after start.)
    update : function ()
    {
        //game.physics.arcade.overlap(alien, leftBoundary, alien.KillAlien, null, this);
        //game.physics.arcade.overlap(alien, leftBoundary, alien.KillAlien, null, this);
        //game.physics.arcade.overlap(alien, leftBoundary, alien.KillAlien, null, this);
        //game.physics.arcade.overlap(alien, leftBoundary, alien.KillAlien, null, this);
        // Constantly update our text to display the current game's fps.
        fpsText.text = "FPS: " + this.game.time.fps;
        // Poll for input events.
        this.pollInput();
        
        
    },
    
    // Check's for user input events and react based upon it.
    pollInput : function ()
    {
        // Has the user pressed left?
        if(cursors.left.isDown)
        {
            // Move the player left.
            player.MoveLeft();
        }
        // Has the user pressed right?
        else if(cursors.right.isDown)
        {
            // Move the player right.
            player.MoveRight();
        }
        // Has no input event occurred?
        else 
        {
            // Stop the player's movement.
            player.Stop();
        }
        // Has the spacebar been pressed?
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {
            // Fire the player's bullet.
            player.FireBullet();
            // Flip the canFire flag.
            player.canFire = false;
        }
        // Has the spacebar been released?
        else 
        {
            // Flip the canFire flag.
            player.canFire = true;
        }
    },
    
    pollAlienPosition : function ()
    {
        
    },
    
    render : function ()
    {
        // Render the ships body for debug purposes.
        this.game.debug.body(leftBoundary);
        this.game.debug.body(rightBoundary);
        this.game.debug.body(topBoundary);
        this.game.debug.body(bottomBoundary);
    }
};