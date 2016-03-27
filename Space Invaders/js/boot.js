// Define our boot state.
BootState = function (game)
{
    
};


// Extend our boot state.
BootState.prototype =
{
    // Preloads all required assets before the game starts.
    preload : function ()
    {
        // Create a loadling label to display to the user informing that loading is occuring.
		var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});
        game.load.image("Enemy", "assets/sprites/Food_Spr.png");
        game.load.image("Player", "assets/sprites/Snake Head_Spr.png");
    },
    
    // Called directly after preload has finished loading.
    create : function ()
    {
        // Display the menu.
        game.state.start ("Menu");
    }
}