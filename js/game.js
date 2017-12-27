/**
 * Created by HP on 2017/11/5.
 */
//游戏对象
define(function() {
    var that;
    function Game(options) {
        this.snake = options.snake;
        this.food = options.food;
        this.map = options.map;
        that = this;
    }
    Game.prototype.init = function () {
        this.food.init();
        this.snake.init();
        //设置小蛇跑动
        this.snakeRun();
        //设置键盘操作
        this.changeDirection();
    };
    Game.prototype.snakeRun = function () {
        var timer = null;
        timer = setInterval(function () {
            var snake = that.snake;
            var food = that.food;
            var lastX = snake.body[snake.body.length-1].x;
            var lastY = snake.body[snake.body.length-1].y;
            snake.move();
            if(snake.body[0].x == food.x && snake.body[0].y == food.y) {
                snake.body.push({x:lastX,y:lastY,color:"orange"});
                food.init();
            }
            var maxX = that.map.offsetWidth/food.width-1;
            var maxY = that.map.offsetHeight/food.height-1;
            if(snake.body[0].x<0||snake.body[0].x>maxX||snake.body[0].y<0||snake.body[0].y>maxY) {
                clearInterval(timer);
                alert("撞墙游戏结束");
                return;
            }
            for(var i = 1;i<snake.body.length;i++) {
                if(snake.body[0].x == snake.body[i].x && snake.body[0].y == snake.body[i].y) {
                    clearInterval(timer);
                    alert("吃到自己游戏结束");
                    return;
                }
            }
            //在游戏结束后不会画出移动到地图外的小蛇，也不会画出吃到自己的小蛇
            snake.init();
        },200)
    };
    Game.prototype.changeDirection = function () {
        document.onkeydown = function (e) {
            e = e || window.event;
            var snakeDir = that.snake.direction;
            switch(true) {
                case e.keyCode ==37 && snakeDir !=="right":
                    that.snake.direction = "left";
                    break;
                case e.keyCode ==38 && snakeDir !=="down":
                    that.snake.direction = "up";
                    break;
                case e.keyCode ==39 && snakeDir !=="left":
                    that.snake.direction = "right";
                    break;
                case e.keyCode ==40 && snakeDir !=="up":
                    that.snake.direction = "down";
                    break;
            }
        }
    };
    //将game构造函数暴漏给全局作用域
    return Game;
});