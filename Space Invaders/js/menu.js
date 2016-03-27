// Define the menu state.
MenuState = function (game)
{
    
};

// Extend the menu state.
MenuState.prototype =
{
    create : function ()
    {
        var menuLabel = game.add.text(80, 150, 'Click to start', {font: '20px Courier', fill: '#ffffff'});
        // Create a listener event for a mouse click or touch and executes the function when the event occurs.
        game.input.onDown.add(this.start);
    },
    
    start : function ()
    {
        // Start the main game state.
        game.state.start ("Game");
    },
}