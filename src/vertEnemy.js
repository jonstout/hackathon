Q.Sprite.extend("verticalEnemy", {
	init: function(p) {
        this._super(p, {vy: -100, rangeY: 50, gravity: 0 });
        this.add("2d");
        
        this.p.initialY = this.p.y;
        
		 this.on("bump.left,bump.right,bump.bottom,bump.top",function(collision) {
        if(collision.obj.isA("Player")) { 
          Q.stageScene("endGame",1, { label: "Game Over" }); 
          collision.obj.destroy();
        }
        });
			
    this.on("bump.top",function(collision) {
        if(collision.obj.isA("Player")) { 
          collision.obj.p.vy = -100;
          this.destroy();
          }
          });
		},
		step: function(dt) {                
		    if(this.p.y - this.p.initialY >= this.p.rangeY && this.p.vy > 0) {
        this.p.vy = -this.p.vy;
		} 
		else if(-this.p.y + this.p.initialY >= this.p.rangeY && this.p.vy < 0) {
			this.p.vy = -this.p.vy;
		} 
	}
    
});