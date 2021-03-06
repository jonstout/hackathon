
function delItemFromList(id) {
  var element = document.getElementById(id);
  element.parentNode.removeChild(element);

  tempGameObjects[index] = []
}

function addBarrierToList() {
  name = document.getElementById("barrierName").value
  x = document.getElementById("barrierX").value
  y = document.getElementById("barrierY").value
  keys = document.getElementById("barrierItems").value
  okmsg = document.getElementById("barrierMsgOk").value
  badmsg = document.getElementById("barrierMsgFail").value

  id = addBarrier(name, x, y, keys.split(","), okmsg, badmsg)
  console.log(name)

  obj = document.getElementById("gameObjects")
  li = document.createElement("li")
  li.id = id.toString()
  li.innerHTML = '<button type="button" class="btn btn-default" onclick="delItemFromList(' + li.id + ')">x</button> - ' + name
  li.className = "list-group-item"
  obj.appendChild(li);
}

// Add a barrier to a user's story
// "Barrier", {"x": 508, "y": 0, "sheet": "tower", "keys": ["dontgivea","keyyy"], "okmsg" : "You have found my weakness!", "badmsg" : "You are missing an item you need to cross this barrier."}],
function addBarrier(name, x, y, keys, okmsg, badmsg) {
    var newBarrier = ["Barrier", {"x": x, "y": y, "sheet": "tower", "keys": keys, "okmsg": okmsg, "badmsg": badmsg}]
    tempGameObjects.length += 1
    index = (tempGameObjects.length - 1)
    tempGameObjects[index] = newBarrier
    return index
}

function addItemToList() {
  name = document.getElementById("itemName").value
  x = document.getElementById("itemX").value
  y = document.getElementById("itemY").value

  id = addItem(name, x, y)
  console.log(name)

  obj = document.getElementById("gameObjects")
  li = document.createElement("li")
  li.id = id.toString()
  li.innerHTML = '<button type="button" class="btn btn-default" onclick="delItemFromList(' + li.id + ')">x</button> - ' + name
  li.className = "list-group-item"
  obj.appendChild(li);
}

// Add an item to a user's story
// ["Item", {"x": 700, "y": 0, "sheet": "tower", "objName": "dontgivea"}]
function addItem(name, x, y) {
    var newItem = ["Item", {"x": x, "y": y, "sheet": "tower", "objName": name}]
    tempGameObjects.length += 1
    index = (tempGameObjects.length - 1)
    tempGameObjects[index] = newItem
    return index
}

// Submit all barriers and items from a user's story (as stored in tempGameObjects) to a new
// objects.json entry that can be staged as its own level
// Reset tempGameObjects
function submitUserStory() {
  name = document.getElementById("characterName").value
  lvl = document.getElementById("levelSelect").value

  $.getJSON('http://127.0.0.1:8888/data/objects.json', function (data) {
    userStories = data

    gameObject = { "level" : lvl, "objs" : []}
    for (i = 0; i < tempGameObjects.length; i++) {
      gameObject.objs[i] = tempGameObjects[i]
    }
    userStories[name] = gameObject

    var xhr = new XMLHttpRequest();
    xhr.open('PUT', 'http://127.0.0.1:8888/data/objects.json', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
      // do something to response
    };
    xhr.send(JSON.stringify(userStories))
  });


}

// Delete the barrier or item at index i in tempGameObjects
function deleteFromUserStory(i) {


}
