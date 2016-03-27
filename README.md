# Space-Invaders-Phaser
An in-depth and extensive space invaders clone made using ES5 Javascript and the Phaser framework (at time of creation, project uses current version **2.4.6 - "Baerlon"**). 

The project was created as a test of my JavaScript knowledge after about 2 years of inactivity in the language, along with being a short usability test of the Phaser framework and finally as a display project for my univeristy portfolio. Due to my extensive learning throughout, the project is designed in such a way that beginners to the Phaser framework can look through and see some of the various features and power the framework has to offer. The project was designed with clarity in mind and as such comments are extensive throughout. Followed below this introduction is an extremely short GDD detailing the game.

# Space Invaders Short GDD

This is a short Game Design Document that will seek to provide an overview and basis of the skills and techniques used within the project along with an overview of the game's design.

## Index of Contents

* [Mechanics List](#Mechanics List)
* [Implementation Ideas](#Implementation Ideas)
  *  [The Game](#The Game)
  *  [The Mechanics](#The Mechanics)
    *  [Player](#Players)
    *  [Enemy](#Enemys)
    *  [Bullet](#Bullets)
    *  [Alien](#Alien)
    *  [Groups/Rows](#Groups/Rows)
    *  [Groups/Enemies](#Groups/Enemies)
    *  [UI/Scoring](#UI/Scoring)
    *  [UI/Lives](#UI/Lives)
    *  [Overall Game](#Overall Games)
* [External Assets](#External Assets)
  *  [Asset List](#Asset List)
  *  [File Structure](#File Structure)


<a name="Mechanics List"></a>
## Mechanics List

-  Main menu with mute audio option.
-  Player get's three lives.
-  Player fires one bullet at a time nad cannot fire until bullet is dead.
-  Player can move only horizontally.
-  Upon player death wave resets.
-  Enemies move horizontally only.
-  Enemies drop down every time they reach the edge of the screen.
-  Enemies die after a certain number of hits as detailed below:

1.  **First row enemy** = *1 hit*
2.  **Second row enemy** = *1 hit*
3.  **Third row enemy** = *1 hit*
4.  **Fourth row enemy** = *2 hits*
5.  **Fifth row enemy** = *3 hits*
6.  **Alien enemy** = *1 hit*

-  Enemies fire after a certain amount of time has elapsed.
-  This time decreases every time they drop.
-  When a bullet hit's the player the player will die.
-  Upon player death, if they have lives left they will respawn with a new wave and their score will remain.
-  If they have no more lives left the game will end *(see below.)*
-  When a bullet hit's a player base the base will slowly destroy.
-  When a base has been fully destroyed the player will lose **40 points**.
-  A random alien ship will appear at random intervals.
-  This ship will move from either left -> right || right -> left depending on which random side of the screen it is spawned.
-  The game will contain a minimalist UI and scoring system.
-  The player is awarded points as the following conditions occur:

1.  **10 points** = *first row enemy kill.*
2.  **20 points** = *second row enemy kill.*
3.  **30 points** = *third row enemy kill.*
4.  **60 points** = *fourth row enemy kill.*
5.  **80 points** = *fifth row enemy kill.*
6.  **250 points** = *alien ship kill.*
7.  **500 points** = *entire wave cleared.*

-  When the player earns 2000 points they will be awarded a life.
-  Game ends when enemies reach player base or player loses all lives.
-  Upon game over, score and wave number will be shown.
-  The game can be restarted and score is reset.

<a name="Implementation Ideas"></a>
## Implementation Ideas

The following details rough ideas for the implementations of the game overall and the previously discussed mechanics.

<a name="The Game"></a>
### The Game

The game will consist of four states to seperate the overall game logic into manageble chunks. The four states will be as follows:

1.  **The boot/preload state** - *This state will be responsible for booting the game, preloading all required assets and displaying a preloader to the player.*
2.  **The menu/splash state** - *This state will be responsible for greeting the player with a splash screen and offering a very simple contextual interaction with audio settings.*
3. **The gameloop state** - *This state will be responsible for handling all in-game logic such as: **collisions**, **kills**, **etc**.*
4. **The game over state** - *This state will be responsible for displaying end game information and statistics as well as offering the option to restart the game.*

These states will be defined as seperate .js files and any logic required between them will be defined in a seperate .js file named ***GlobalDependencies.js***. Whilst it isn't required and slightly detrimental to do this, it will make organisation during development smoother and cleaner rather than remembering which state has a piece of logic for the next.

Along with these .js files there will be further .js files for the seperate enemy objects, player objects and bullet objects. These will be created in a prefab fashion extending from Phaser.Sprite to keep logic modular and contained within their relevant objects. Rather than create a series of seperate .js files, these will be defined within a single .js file titled ***Prefabs.js***.

For any and all repeatable helper functions there will be a seperate .js file titled ***Utilities.js*** which will contain various interchangeble functions such as: *RandomRange*, *Text Labels*, *Etc.*

Finally, there will be the main ***phaser.js*** library and ***phaser.min.js*** library for developing the game with. Once development has finished. The ***phaser.js*** library will be removed and only the ***phaser.min.js*** file will remain to save file space.

<a name="The Mechanics"></a>
### The Mechanics

The following section will have some rough concept ideas for how to implement the mechanics discussed above. Much of these ideas may change drastically in development as newer, more refactored and more efficient code and ideas crop up. But, this provides a starting foundation for some of the ideas and gives a basis from which to begin building and researching the project.

<a name="Player"></a>
#### Player

The player will be a seperate object that will contain a variety of variables these being: 

-  **health : number** - *The player's health value, this will only be 1 for the purposes of this game.*
-  **speed : number**  - *The player's movement speed value, this will define how fast the player can move in either direction.*
-  **lives : number** - *The player's number of lives, this will define how many times the player can die before the game ends.*

As well as containing these variables the player will also have a series of functions exclusive to it. These functions will be the following:

-  **RemoveLife** - *This function will be responsible for removing a life and checking whether or not they have any left to remove.*

-  **AddLife** - *This function will be responsible for awarding the player a life.*

-  **KillPlayer** - *This function will be responsible for removing the player from play when they have been hit.*

-  **RespawnPlayer** - *This function will be responsible for respawning the player after a certain time has elapsed.*

-  **MovePlayer** - *This function will be responsible for moving the player across the screen.*

-  **FireBullet** - *This function will be responsible for generating bullets.*

<a name="Enemy"></a>
#### Enemy

The enemy will be a seperate object that will contain a variety of variables these being:

-  **health : number** - *The enemies health value, this will define how many hits it can take before death.*
-  **scoreWorth : number** - *The enemies value of points, this will define the number of points awarded to the player upon death.*
-  **rowValue : number** - *The enemies row number, this will identify what row the enemy is made for and subsequently what type of enemy it should be.*
-  **spriteKey : string** - *The key of the enemies sprite, this will define what the enemy looks like in regard to it's row type.*
-  **canFire : boolean** - *A boolean flag, this will define whether or not the enemy is legible to fire when the fire function selects someone to fire.*

As well as containing these variables the enemy will also have a series of functions exclusive to it. These functions will be the following:

-  **Damage** - *This function will be responsible for removing the enemies health, if it falls below 0 it will call the kill function.*
-  **KillEnemy** - *This function will be responsible for removing the current enemy from the game. Once dead it will call the increase score function.*
-  **IncreaseScore** - *This function will be responsible for updating the current score with the enemy's score worth.*
-  **SetPreviousEnemyFire** - *This function will be responsible for informing the enemy that is placed before it in the row that it is now able to fire.*

The important thing to note about the enemy is the specific way in which it will be implemented. The enemy will be placed into a row group which will in turn be nested into a larger group known as the 'wave'. This will mean that we can monitor which enemy has died and inform the one that is placed before it in the row group that it can now fire through it's boolean flag ***canfire*** and once the wave is dead we can we respawn. (Group logic is detailed more within the [Groups](#Groups) section.)

<a name="Bullet"></a>
#### Bullet

The bullet will be a seperate object that will contain a variety of variables, it will be used for both the enemy and the player and so will need a simple boolean flag to determine which side it belongs to the variables are:

-  **speed : number** - *The bullet's speed value, this will determine how fast the bullet will move.*
-  **damageWorth : number** - *The amount of damage the bullet will inflict upon it's target, this will be 1.*
-  **isEnemyBullet : boolean** - *A simple boolean flag that determines whether or not the bullet is an enemy or player bullet.*

As well as containing these variables the bullet will also have a series of functions exclusive to it. These functions will be the following:

-  **CollisionWithPlayer** - *This function will be responsible for handling a collision event between it and a player, it will apply the damage amount to the player and then proceed to call the RemoveBullet function.*
-  **CollisionWithEnemy** - *This function will be responsible for handling a collision event between it and an enemy, it will apply the damage amount to the enemy and then proceed to call the RemoveBullet function.*
-  **RemoveBullet** - *This function will be responsible for removing the bullet from the game, it will be called when a collision event occurs or it leaves the bounds of the game screen.*

<a name="Alien"></a>
#### Alien

The alien ship will be a seperate object that will contain a small number of variables. These variables are as follows:

-  **scoreWorth : number** - *The aliens value of points, this will define the number of points awarded to the player upon the ship's death.*
-  **isLeft : boolean** - *The aliens current spawn direction, this will define which direction the ship moves based upon which side of the screen it has spawned on.*
-  **speed : number** - *The alien's speed, this will define how fast the alien ship moves across the screen.*

As well as these variables the alien ship will also have a number of functions exclusive to it. These functions will be the following:

-  **Movement** - *This functions will be responsible for moving the alien ship, it will take the boolean value of 'isLeft' to decide in which direction it should move.*
-  **SpawnShip** - *This function will be responsible for randomly spawning the ship at either side of the screen.*
-  **IncreaseScore** - *This function will be responsible for updating the current score with the alien's score worth.*
-  **KillAlien** - *This function will be responsible for removing the current alien from the game. Once dead it will call the increase score function.*
-  **KillAlienOutOfBounds** - *This function will be responsible for removing the current alien from the game if it leaves the screen without being shot and will not award points to the player.*

<a name="Groups/Rows"></a>
#### Groups/Rows

The rows will be a seperate object which will be responsible for handling row behaviours. These variables are:

-  **rowAmount : number** - *The amount of enemies within the row. This will define the size of the group and how many enemies are added to it.*
-  **rowID : number** - *Decides what row number this specific row is.*
-  **scoreWorth : number** - *The rows value of points, this will define the number of points awarded to the player upon the rows death.*

As well as these variables the row will also contain various functions exclusive to it. These are as follows:

-  **RemoveEnemyFromRow** - *This function is responsible for removing an enemy from the row. Upon removal it will delegate the fire ability to the next top most enemy.*
-  **AddEnemyToRow** - *This functions is responsible for adding an enemy to the row. The enemy that is added will be placed at the front of the row and will remove the ability to fire from the last enemy and give it to itself.*
-  **KillRow** - *This function is responsible for killing the row. Upon destruction it will call the increase score function.*
-  **RespawnRow** - *This function is responsible for respawning and repopulating the group with enemies upon restart.*
-  **IncreaseScore** - *This function is responsible for increasing the player's score.*


<a name="Groups/Enemies"></a>
#### Groups/Enemies

As well as seperate rows, there will be an overarching group that will control all enemies rows at once. This group will move the enemies, respawn rows and pick an enemy from a random row to fire a bullet. The variables are as follows:

-  **movementDelay : number** - *The seconds between each movement step. This will define how quickly the group moves.*
-  **isMovingLeft : boolean** - *A boolean flag that decides which direction the group moves.*
-  **descenHeight : number** - *The height at which the group descends when reaching either side.*
-  **scoreWorth : number** - *The wave's value of points, this will define the number of points awarded to the player upon the waves death.*

As well as these variables the wave will also require a series of functions exclusive to it. These are as follows:

-  **Movement** - *This function is responsible for moving the group either left or right based upon the boolean flag.*
-  **Descend** - *This function is responsible for droppping the wave down the screen when it reaches a side.*
-  **AddRow** - *This function is responsible for adding a row to the wave.*
-  **RemoveRow** - *This function is responsible for removing a row from the wave.*
-  **KillWave** - *This function is responsible for removing the current wave from the game. Upon destruction it will call the IncreaseScore function.*
-  **RespawnWave** - *This function is responsible for respawning the wave upon wave restart.*
-  **IncreaseScore** - *This function is responsible for increasing the player's score.*
-  **FireBullet** - *This function is responsible for picking a random row and firing a bullet from the front most enemy.*


<a name="UI/Scoring"></a>
#### UI/Scoring

The scoring system will be a seperate object that will contain a series of variables that will deal with the creation of UI elements. These are as follows:

-  **scoreLabel : object** - *This variable will hold the score's text object.*

As well as these variables the UI/Scoring object will also contain a number of functions for allowing use of the scoring system. These are as follows:

-  **UpdateScore** - *This function is responsible for updating the scoreLabel when the score of the game has changed.*
-  **ResetScore** - *This function is responsible for resetting the score label to 0 when the game is restarted.*

<a name="UI/Lives"></a>
#### UI/Lives

The scoring system will be a seperate object that will contain a series of variables that will deal with the creation of UI elements. These are as follows:

-  **livesLabel : object** - *This variable will hold the lives text object.*

As well as these variables the UI/Lives object will also contain a number of functions for allowing use of the scoring system. These are as follows:

-  **UpdateLives** - *This function is responsible for updating the lives label to reflect any changes that occur with the player's lives.*
-  **ResetLives** - *This function is responsible for resetting the lives label to 3 when the game is restarted.*

<a name="Overall Game"></a>
#### Overall Game

The game will need some global variables that can be passed around between the seperate objects to control the overreaching game flow and logic. These variables will be used to either contain and control the objects or to change game wide logic such as scoring, lives, respawns etc. These variables are as follows:

-  **score : number** - *The game wide score, this will define how many points the player has earned.*
-  **player : object** - *This variable will be used to control the player object defined above. This will allow for interaction with the player's variables, functions and input.*
-  **enemy : object** - *This variable will be used to control the enemy object defined above. This will allow for interaction with the player's variables, functions and input.*
-  **playerBullet : object** - *This variable will be used to control a specific bullet defined above. The bullet will be set so that it is a player bullet.*
-  **playerBulletGroup : object** - *This variable will be used to control the group of player bullets which the player can fire.*
-  **enemyBullet : object** - *This variable will be used to control a specific bullet defined above. The bullet will be set that it is an enemy bullet.*
-  **enemyBulletGroup : object** - *This variable will be used to control the group of enemy bullet's which the enemies can fire.*
-  **enemyGroup : object** - *This variable will be used to control the enemy group as a whole. This allows for interaction with it's movement, death, respawn etc.*

As well as these variables the game will also have a series of functions to delegate control and handle events throughout the game cycle. These are as follows:

-  **create** - *This function is responsible for creating any and all assets. It is called right after preload has finished.*

-  **InitGameDefaults** - *This function is responsible for setting all game values to their defaults. E.g. score, lives etc.*
-  **InitPhysics** - *This function is responsible for creating all required physics systems for the game.*
-  **InitGraphics** - *This function is responsible for creating all required sprite assets and graphics for the game.*
-  **InitObjects** - *This function is responsible for creating all required objects and groups for the game.*
-  **InitInput** - *This function is responsible for creating all required input listeners for the game.*
-  **InitEventHandlers** - *This function is responsible for creating all required event handlers such as movement delays etc.*
-  **InitAudio** - *This function is responsible for creating all required audio assets for the game.*
-  **InitUI** - *This function is responsible for creating all required UI elements and displaying them to the user.*

-  **update** - *This function is responsible for constantyl polling any and all changes for the game as they occur.*

-  **PollInput** - *This function is responsible for reading input and executing logic based upon it.*


<a name="External Assets"></a>
## External Assets

<a name="Asset List"></a>
### Asset List
The game will require various assets to function and as such it would be best to plan the file tree and locations for game assets along with a short list discussing the known assets required for the project. Shown below is short asset list:

-  Preloader bar
-  Menu/splashscreen image
-  Mute button sprite
-  Click to start button sprite
-  Player sprite
-  Player bullet sprite
-  Player base with varying destruction spritesheet
-  Game background image
-  Row 1 - 2 enemy sprite
-  Row 3 - 4 enemy sprite
-  Row 5 enemy sprite
-  Alien ship sprite
-  Click to restart button sprite
-  Bitmap font for in-game text
-  Death SFX
-  Enemy death SFX
-  Player bullet SFX
-  Enemy bullet SFX
-  Enemy movement SFX
-  Alien ship SFX
-  Background music


<a name="File Structure"></a>
### File Structure
Now that all of the so-far known assets have been listed it's best to think of the file structure of these assets and how they might be handled within the project. Shown below is a rough file tree:

<pre>
Space Invaders project
│   README.md
│   Space Invaders Short GDD.md
|   index.html
│
└───────assets - folder
        ├───audio - subfolder
        │   │   deathSFX.ogg
        │   │   enemyDeathSFX.ogg
        │   │   bulletSFX.ogg
        │   │   enemyBulletSFX.ogg
        │   │   enemyMovement.ogg
        │   │   alienShip.ogg
        │   │   BGM.ogg
        │   │   ...
        │
        ├───fonts - subfolder
        │   │   scoreText.fnt
        │   │   scoreText.png
        │   │   preloadText.fnt
        │   │   preloadText.png
        │   │   ...
        │
        ├───sprites - subfolder
        │   │   preloadBar.png
        │   │   splashscreen.png
        │   │   muteButtonOn.png
        │   │   muteButtonOff.png
        │   │   clickToStart.png
        │   │   player.png
        │   │   playerBullet.png
        │   │   baseAtlas.png
        │   │   background.png
        │   │   enemyType1_2.png
        │   │   enemyType3_4.png
        │   │   enemyType5.png
        │   │   alineShip.png
        │   │   clickToRestart.png
        │   │   ...
        │
        js - folder
        │   boot.js
        │   game.js
        │   main.js
        │   menu.js
        │   utilities.js
        │   globaldependencies.js
        │   gameover.js
        lib - folder
        │   phaser.js
        │   phaser.min.js
</pre>
