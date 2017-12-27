/**
 * Created by HP on 2017/11/5.
 */
//小蛇对象
define(function() {
    function Snake(options) {
        this.width = options.width || 20;
        this.height = options.height || 20;
        this.body = [
            {x:3,y:1,color:"red"},
            {x:2,y:1,color:"orange"},
            {x:1,y:1,color:"orange"}
        ];
        this.map = options.map;
        this.direction = options.direction || "right";
        this.elements = [];
    }
    Snake.prototype.init = function() {
        for (var i = 0;i<this.elements.length;i++) {
            this.map.removeChild(this.elements[i]);
        }
        this.elements = [];
        var body;
        for (i = 0;i<this.body.length;i++) {
            var div = document.createElement("div");
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            body = this.body[i];
            div.style.backgroundColor = body.color;
            div.style.left = body.x*this.width + "px";
            div.style.top = body.y*this.height + "px";
            this.map.appendChild(div);
            this.elements.push(div);
        }
    };
    Snake.prototype.move = function() {
        var body;
        for(var i = this.body.length-1;i>0;i--) {
            body = this.body[i];
            body.x = this.body[i-1].x;
            body.y = this.body[i-1].y;
        }
        switch(this.direction) {
            case "left":
                this.body[0].x--;
                break;
            case "right":
                this.body[0].x++;
                break;
            case "up":
                this.body[0].y--;
                break;
            case "down":
                this.body[0].y++;
                break;
        }
    };
    return Snake;
});