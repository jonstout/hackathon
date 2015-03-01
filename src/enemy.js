
// Create the Enemy class to add in some baddies
Q.Sprite.extend("Enemy",{
  init: function(p) {
    this._super(p, { sheet: 'enemy', vx: 100 });

    // Enemies use the Bounce AI to change direction
    // whenver they run into something.
    this.add('2d, aiBounce');

    // Listen for a sprite collision, if it's the player,
    // end the game unless the enemy is hit on top
    this.on("bump.left,bump.right,bump.bottom",function(collision) {
      if(collision.obj.isA("Player")) {
        Q.stage().pause()
        Q.stageScene("textbox", window.textboxScene, { label: "You were killed by an ememy." });
        collision.obj.destroy();
      }
    });

    // If the enemy gets hit on the top, destroy it
    // and give the user a "hop"
    this.on("bump.top",function(collision) {
      if(collision.obj.isA("Player")) {
        this.destroy();
        collision.obj.p.vy = -300;
      }
    });
  },

  step: function(dt) {
    var dirX = this.p.vx/Math.abs(this.p.vx);
    var ground = Q.stage().locate(this.p.x, this.p.y + this.p.h/2 + 1, Q.SPRITE_DEFAULT);
    var nextTile = Q.stage().locate(this.p.x + dirX * this.p.w/2 + dirX, this.p.y + this.p.h/2 + 1, Q.SPRITE_DEFAULT);

    //if we are on ground and there is a cliff
    if(!nextTile && ground) {
      if(this.p.vx > 0) {
        if(this.p.defaultDirection == "right") {
          this.p.flip = "x";
        }
        else {
          this.p.flip = false;
        }
      }
      else {
        if(this.p.defaultDirection == "left") {
          this.p.flip = "x";
        }
        else {
          this.p.flip = false;
        }
      }
      this.p.vx = -this.p.vx;
    }
  }
});

Q.Sprite.extend("VerticalEnemy", {
  init: function (p) {
    this._super(p, { vy: -100, rangeY: 50, gravity: 0 });
    this.add("2d");

    this.p.initialY = this.p.y;

    this.on("bump.left,bump.right,bump.bottom,bump.top", function (collision) {
      if (collision.obj.isA("Player")) {
        Q.stageScene("endGame", 1, { label: "Game Over" });
        collision.obj.destroy();
      }
    });

    this.on("bump.top", function (collision) {
      if (collision.obj.isA("Player")) {
        collision.obj.p.vy = -100;
        this.destroy();
      }
    });
  },
  step: function (dt) {
    if (this.p.y - this.p.initialY >= this.p.rangeY && this.p.vy > 0) {
      this.p.vy = -this.p.vy;
    }
    else if (-this.p.y + this.p.initialY >= this.p.rangeY && this.p.vy < 0) {
      this.p.vy = -this.p.vy;
    }
  }

});
