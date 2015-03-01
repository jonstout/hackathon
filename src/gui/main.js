
// Create the main menu scene
Q.scene("mainMenu", function(stage) {
  var container = stage.insert(new Q.UI.Container({
    x: Q.width/2, y: Q.height/2, fill: "rgba(150,25,25,1.0)", h: 200, w: 500
  }));

  var playButton = container.insert(new Q.UI.Button({ x: 0, y: -30, fill: "#CCCCCC", label: "Play" }))
  var createButton = container.insert(new Q.UI.Button({ x: 0, y: 30, fill: "#CCCCCC", label: "Create" }))

  playButton.on("click", function() {
    loadCharacterSelection()
    document.getElementById("selectCharacterModalButton").click()
  });

  createButton.on("click", function() {
    document.getElementById("createStoryModalButton").click()
  });
});
