
// Create the scene for the level selected by user
function loadScene(data) {
  levelName = data["level"]
  levelObjs = data["objs"]
  levelTMX = levelName + ".tmx"
  var levelEnemies = []


  console.log(levelEnemies)
  // Create a scene for this level
  Q.scene(levelName, function(stage) {
    // Lay down the background
    var bground = new Q.TileLayer({ dataAsset: levelTMX, layerIndex: 0, sheet: 'tilemap', tileW: 72, tileH: 72, type: Q.SPRITE_NONE })
    stage.insert(bground)

    // Add in a tile layer, and make it the collision layer
    stage.collisionLayer(new Q.TileLayer({ dataAsset: levelTMX, layerIndex: 0, sheet: 'tilemap', tileW: 72, tileH: 72 }));

    // Create the player and add him to the stage
    if (stage._collisionLayer.p.dataAsset == "level1.tmx") {
      var player = stage.insert(new Q.Player({x: 250, y: 90}));
    } else if (stage._collisionLayer.p.dataAsset == "level2.tmx") {
      var player = stage.insert(new Q.Player({x: 2250, y: 160}));
    } else {
      var player = stage.insert(new Q.Player({x: 600, y: 120}));
    }

    // Give the stage a moveable viewport and tell it
    // to follow the player.
    stage.add("viewport").follow(player);

    // Load objects for this level from file
    stage.loadAssets(levelObjs)
    $.getJSON( "./data/enemies.json", function(data) {
      stage.loadAssets(data[levelName])
    });
  });

  Q.stageScene(levelName)
  document.getElementById("game").focus()
}

function loadCharacterSelection() {
  // Load objects for this level from file
    $.getJSON('http://127.0.0.1:8888/data/objects.json', function (data) {
      $.each(data, function(key, value) {
        var x = document.getElementById("characterSelect")
        var option = document.createElement("option")
        option.text = key
        x.add(option)
      });
      userStories = data
    });
}

function submitCharacterSelection() {
  var x = document.forms["selectCharacterModalForm"]["characterSelect"].value;
  loadScene(userStories[x])
  document.getElementById("game").focus()
}
