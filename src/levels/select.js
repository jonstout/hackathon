function loadCharacterSelection() {
  // Load objects for this level from file
  $.getJSON( "./data/objects.json", function(data) {
    $.each(data, function(key, value) {
      var x = document.getElementById("characterSelect")
      var option = document.createElement("option")
      option.text = key
      x.add(option)
    });
  });
}

function submitCharacterSelection() {
  var x = document.forms["selectCharacterModalForm"]["character"].value;
  console.log(x)
}
