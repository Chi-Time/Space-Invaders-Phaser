MenuState = function (game)
{
    
};

MenuState.prototype =
{
    create : function ()
    {
        // Create a listener event for a mouse click or touch and executes the function when the event occurs.
        game.input.onDown.add(this.start);
    },
    
    start : function ()
    {
        game.state.start ("Game");
    },
}