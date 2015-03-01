Q.Sprite.extend("Player", {
  // the init constructor is called on creation
  init: function(p) {
    // You can call the parent's constructor with this._super(..)
    this._super(p, {
      sheet: "player1",  // Setting a sprite sheet sets sprite width and height
      x: 2250,           // You can also set additional properties that can
      y: 90,            // be overridden on object creation
      keys: [],          // Think of these like dungeon keys from zelda
      jumpSpeed: -400
    });

    // Add in pre-made components to get up and running quickly
    this.add('2d, platformerControls');

    // Write event handlers to respond hook into behaviors.
    // hit.sprite is called everytime the player collides with a sprite
    this.on("hit.sprite",function(collision) {
      // Check the collision, if it's the Tower, you win!
      if(collision.obj.isA("Goal")) {
        // Stage the endGame scene above the current stage
        Q.stageScene("endGame", window.textboxScene, { label: "You Won!" });
        // Remove the player to prevent them from moving
        this.destroy();
      }
    });
  }
});
