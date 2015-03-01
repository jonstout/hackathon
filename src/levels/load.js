// Create the scene for the level selected by user
function loadScene(data) {
  levelName = data["level"]
  levelObjs = data["objs"]
  levelTMX = 'levelone.tmx'
  if (levelName == "level2") {
    levelTMX = 'leveltwo.tmx'
  } else if (levelName == "level3") {
    levelTMX = 'levelthree.tmx'
  }

  // Create a scene for this level
  Q.scene(levelName,function(stage) {

    // Lay down the background
    var bground = new Q.TileLayer({ dataAsset: levelTMX, layerIndex: 0, sheet: 'spritesheet', tileW: 72, tileH: 72, type: Q.SPRITE_NONE })
    stage.insert(bground)

    // Add in a tile layer, and make it the collision layer
    stage.collisionLayer(new Q.TileLayer({ dataAsset: levelTMX, layerIndex: 0, sheet: 'spritesheet', tileW: 72, tileH: 72 }));

    // Create the player and add him to the stage
    var player = stage.insert(new Q.Player());

    // Give the stage a moveable viewport and tell it
    // to follow the player.
    stage.add("viewport").follow(player);

    // Load objects for this level from file
    stage.loadAssets(levelObjs)

    // Finally add in the tower goal
    stage.insert(new Q.Tower({ x: 180, y: 50 }));

  });
}