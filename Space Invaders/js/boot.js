// Define our boot state.
BootState = function (game)
{
    
};


// Extend our boot state to contain extra function.
BootState.prototype =
{
    preload : function ()
    {
        game.load.image("Enemy", "assets/sprites/Food_Spr.png");
        game.load.image("Player", "assets/sprites/Snake Head_Spr.png");
    },
    
    create : function ()
    {
        game.state.start ("Menu");
    }
}