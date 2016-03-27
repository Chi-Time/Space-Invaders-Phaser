// Create a Phaser game instance.
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

// Add the required game states.
game.state.add ("Boot", BootState);
game.state.add ("Menu", MenuState);
game.state.add ("Game", GameState);

// Start the boot state.
game.state.start ("Boot");
