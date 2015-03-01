
// Create the main menu scene
Q.scene("createMenu", function(stage) {
  var container = stage.insert(new Q.UI.Container({
    x: Q.width/2, y: Q.height/2, fill: "rgba(150,25,25,1.0)", h: 200, w: 500
  }));

  var playButton = container.insert(new Q.UI.Button({ x: 0, y: -30, fill: "#CCCCCC", label: "Play" }))
  var exitButton = container.insert(new Q.UI.Button({ x: 0, y: 30, fill: "#CCCCCC", label: "Cancel" }))

  playButton.on("click", function() {
    document.getElementsByTagName('button')[0].click();
    // Q.stageScene("level1");
  });

  exitButton.on("click", function() {
    Q.clearStage(window.mainMenuScene)
    Q.stageScene("mainMenu");
  });
});
