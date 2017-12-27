/**
 * Created by HP on 2017/11/5.
 */
define(["food","snake","game"],function(Food,Snake,Game) {
    var map = document.getElementById("map");
    var game = new Game({
        map:map,
        snake:new Snake({map:map}),
        food:new Food({map:map})
    });
    game.init();
});