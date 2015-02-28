
// Create a new scene called level 1
Q.scene("level1",function(stage) {

  // Add in a tile layer, and make it the collision layer
  stage.collisionLayer(new Q.TileLayer({
    dataAsset: 'level.json',
    sheet:     'tiles' }));

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

  // Display a text box over game content.
  Q.scene("textbox", function(stage) {

    var container = stage.insert(new Q.UI.Container({
      x: Q.width/2, y: Q.height/4, fill: "rgba(50,150,200,1.0)", h: 200, w: 500
    }));

    var button = container.insert(new Q.UI.Button({ x: 180, y: 60, fill: "#CCCCCC", label: "unpause" }))
    container.insert(new Q.UI.Text({x: -120, y: -80, fill: "#CCCCCC", size: 14, label: stage.options.label}))

    // TODO - Add key press event to kill textbox.
    button.on("click", function() {
      Q.clearStage(1)
      Q.stage().unpause()
    });
  });
