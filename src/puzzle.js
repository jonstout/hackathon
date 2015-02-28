// Items should be named by specifing the objName parameter.
// by default the objName parameter is 'tower'.
Q.Sprite.extend("Item", {
  init: function(p) {
    this._super(p, { sheet: "tower", objName: "tower" });

    this.on("hit.sprite", function(collision) {
      if (collision.obj.isA("Player")) {
        // Put the item in Player.keys.
        collision.obj.p.keys.push(this.p.objName)
        Q.stage().pause()
        Q.stageScene("textbox", window.textboxScene, { label: "You have found an item!" });
        this.destroy()
      }
    });
  }
});

// Create the Enemy class to add in some baddies
Q.Sprite.extend("Barrier",{
  init: function(p) {
    this._super(p, { sheet: 'tower', keys: ["a-key"] });

    // Listen for a sprite collision, if it's the player,
    // end the game unless the enemy is hit on top
    this.on("hit.sprite",function(collision) {
      if(collision.obj.isA("Player")) {
        Q.stage().pause()
        console.log(collision.obj.p.keys)
        console.log(this.p.keys)

        // Check if Player has all the items needed to pass Barrier
        hasAll = true
        keyIndexes = this.p.keys

        for (i = 0; i < keyIndexes.length; i++) {
          var keyIndex = collision.obj.p.keys.indexOf(keyIndexes[i])
          if (keyIndex == -1) {
            Q.stageScene("textbox", window.textboxScene, { label: "You are missing an item you need to cross this barrier." })
            hasAll = false
            break
          } else {
            keyIndexes[i] = keyIndex
          }
        }

        if (hasAll) {
          for (i = 0; i < keyIndexes.length; i++) {
            collision.obj.p.keys.splice(keyIndexes[i], 1) // Remove key from Player.keys
          }
            Q.stageScene("textbox", window.textboxScene, { label: "You have found my weakness." })
            this.destroy()
        }
      }
    });
  }
});
