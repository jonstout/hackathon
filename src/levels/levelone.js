
// Create a new scene called level 1
Q.scene("levelone",function(stage) {

    var bground = new Q.TileLayer({ dataAsset: 'levelone.tmx', layerIndex: 0, sheet: 'spritesheet', tileW: 72, tileH: 72, type: Q.SPRITE_NONE })
    //var bground2 = new Q.TileLayer({ dataAsset: 'levelone.tmx', layerIndex: 1, sheet: 'items', tileW: 72, tileH: 72, type: Q.SPRITE_NONE })
    stage.insert(bground)
    //Q.insert(bground2)
  // Add in a tile layer, and make it the collision layer
  stage.collisionLayer(new Q.TileLayer({ dataAsset: 'levelone.tmx', layerIndex: 0, sheet: 'spritesheet', tileW: 72, tileH: 72 }));

  // Create the player and add him to the stage
  var player = stage.insert(new Q.Player());

  // Give the stage a moveable viewport and tell it
  // to follow the player.
  stage.add("viewport").follow(player);

  // Load enemies from file
  $.getJSON( "data/enemies.json", function( data ) {
    stage.loadAssets(data["enemies"]);
  });

  //stage.insert(new Q.Key({ x: 600, y: 100 }));

  // Finally add in the tower goal
  stage.insert(new Q.Tower({ x: 180, y: 50 }));
});
