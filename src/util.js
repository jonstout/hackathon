
// Sprites can be simple, the Tower sprite just sets a custom sprite sheet
Q.Sprite.extend("Tower", {
  init: function(p) {
    this._super(p, { sheet: 'tower' });
  }
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
