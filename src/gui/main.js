
// Create the main menu scene
Q.scene("mainMenu", function (stage) {

    stage.insert(new Q.Decal({ x: 1000, y: 200, sheet: "title" }));
  stage.insert(new Q.Decal({x:Q.width / 2, y: Q.height / 2 + 50, sheet: "background"}));
  var container = stage.insert(new Q.UI.Container({
    x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,.4)", h: 200, w: 500
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
