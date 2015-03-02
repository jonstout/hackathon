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
        Q.stageScene("textbox", window.textboxScene, { label: "You have found a " + this.p.objName + "!"});
        this.destroy()
      }
    });
  }
});

// Create the Enemy class to add in some baddies
Q.Sprite.extend("Barrier",{
    init: function(p) {
	this._super(p, { sheet: 'tower',
			 keys: ["a-key"],
			 badmsg: "I'm sorry to see you cry.",
			 okmsg: "You're the best dude."
		       })
	
	// Listen for a sprite collision, if it's the player,
	// end the game unless the enemy is hit on top
	this.on("hit.sprite",function(collision) {
	    if(collision.obj.isA("Player")) {
		// If Player is missing any keys show badmsg and return.
		console.log("Checking for player keys.")
		for (i = 0; i < this.p.keys.length; i++) {
		    index = collision.obj.p.keys.indexOf(this.p.keys[i])
		    if (index == -1) {
			Q.stage().pause()
			Q.stageScene("textbox", window.textboxScene, { label: this.p.badmsg })
			return
		    }
		}
		console.log("Player has all keys.")
		// Player has all keys. Remove from player inventory.
		for (i = 0; i < this.p.keys.length; i++) {
		    Q.stage().pause()
		    Q.stageScene("textbox", window.textboxScene, { label: this.p.okmsg })
		    collision.obj.p.keys.splice(this.p.keys[i], 1)
		    this.destroy()
		}
	    }
	})
    }
})

Q.Sprite.extend("Goal", {
    init: function(p) {
        this._super(p, { sheet: "opendoor" });

    }
});

Q.Sprite.extend("Hazard", {
    init: function (p) {
        this._super(p, { sheet: "water" });

    }
});

Q.Sprite.extend("hudkey", {
    init: function (p) {
        this._super(p, { sheet: "hudkeyRed" });

    }
});
