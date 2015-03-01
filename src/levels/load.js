
// Create the scene for the level selected by user
function loadScene(data) {
  levelName = data["level"]
  levelObjs = data["objs"]
  levelTMX = levelName + ".tmx"
  var levelEnemies = []
  var xcoord, ycoord, count, startx, starty, nextLevel, playerNum;


  // Create a scene for this level
  Q.scene(levelName, function(stage) {
    // Lay down the background
    var bground = new Q.TileLayer({ dataAsset: levelTMX, layerIndex: 0, sheet: 'tilemap', tileW: 72, tileH: 72, type: Q.SPRITE_NONE })
    stage.insert(bground)

    // Add in a tile layer, and make it the collision layer
    stage.collisionLayer(new Q.TileLayer({ dataAsset: levelTMX, layerIndex: 0, sheet: 'tilemap', tileW: 72, tileH: 72 }));
    //stage.insert(new Q.Hazard({ x: 35, y: 826 }));
      // Create the player and add him to the stage

    switch (levelName) {
        case "level1":
            xcoord = 35;
            ycoord = 827;
            count = 33;
            startx = 320;
            starty = 520;
            nextLevel = "level2";
            playerNum = "player1";
            break;
        case "level2":
            xcoord = 1547;
            ycoord = 900;
            count = 22;
            startx = 190;
            starty = 200;
            nextLevel = "level3";
            playerNum = "player2";
            break;
    }

    var player = stage.insert(new Q.Player({ x: startx, y: starty, sheet: playerNum }));

    // Give the stage a moveable viewport and tell it
    // to follow the player.
    stage.add("viewport").follow(player);

    // Load objects for this level from file
    stage.loadAssets(levelObjs)
    $.getJSON( "./data/enemies.json", function(data) {
      stage.loadAssets(data[levelName])
    });

      //To insert the correct amount of hazards at the bottom of the map

    for (i = 0; i < count; i++) {
        stage.insert(new Q.Hazard({ x: xcoord + (i * 72) , y: ycoord }));
    }

    stage.insert(new Q.Decal({ x: 200, y: 100 }));

  });

  Q.scene('endGame', function (stage) {
      var container = stage.insert(new Q.UI.Container({
          x: Q.width / 2, y: Q.height / 2, fill: "rgba(0,0,0,0.5)"
      }));

      var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC", label: "Play Again" }))
      var label = container.insert(new Q.UI.Text({ x: 10, y: -10 - button.p.h, label: stage.options.label }));
      // When the button is clicked, clear all the stages
      // and restart the game.
      button.on("click", function () {
          Q.clearStages();
          Q.stageScene(levelName);
      });

      // Expand the container to visibily fit it's contents
      container.fit(20);
  });

  Q.scene('victory', function (stage) {
      var container = stage.insert(new Q.UI.Container({
          x: Q.width / 2, y: Q.height / 2, fill: "rgba(0,0,0,0.5)"
      }));

      var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC", label: "Menu" }))
      var label = container.insert(new Q.UI.Text({ x: 10, y: -10 - button.p.h, label: stage.options.label }));
      // When the button is clicked, clear all the stages
      // and restart the game.
      button.on("click", function () {
          Q.clearStages();
          Q.stageScene("mainMenu");
      });

      // Expand the container to visibily fit it's contents
      container.fit(20);
  });

  Q.scene("gameInv", function (stage) {
      var statsContainer = stage.insert(new Q.UI.Container({
          fill: "gray",
          x: 65,
          y: 50,
          border: 1,
          shadow: 3,
          shadowColor: "rgba(0,0,0,0.3)",
          w: 70,
          h: 40
      })
      );
  });

  Q.stageScene(levelName);
  Q.stageScene("gameInv", 2);
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
