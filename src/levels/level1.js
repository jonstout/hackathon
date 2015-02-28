
// Create a new scene called level 1
Q.scene("level1",function(stage) {

  var bground = new Q.TileLayer({ dataAsset: 'level1.tmx', layerIndex: 0, sheet: 'tilemap', tileW: 70, tileH: 70, type: Q.SPRITE_NONE })
  stage.insert(bground)
  // Add in a tile layer, and make it the collision layer
  stage.collisionLayer(new Q.TileLayer({ dataAsset: 'level1.tmx', layerIndex: 0, sheet: 'tilemap', tileW: 70, tileH: 70 }));

  // Create the player and add him to the stage
  var player = stage.insert(new Q.Player());

  // Give the stage a moveable viewport and tell it
  // to follow the player.
  stage.add("viewport").follow(player);

  // Load enemies from file
  $.getJSON( "data/enemies.json", function( data ) {
    stage.loadAssets(data["enemies"]);
  });

  // Finally add in the tower goal
  stage.insert(new Q.Tower({ x: 180, y: 50 }));
});
