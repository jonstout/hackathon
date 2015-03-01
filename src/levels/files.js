// Add a barrier to a user's story
// Example barrier:
// "Barrier", {"x": 508, "y": 0, "sheet": "tower", "keys": ["dontgivea","keyyy"], "okmsg" : "You have found my weakness!", "badmsg" : "You are missing an item you need to cross this barrier."}],
function addBarrier(name, x, y, keys, okmsg, badmsg) {
    var newBarrier = ["Barrier", {"x": x, "y": y, "sheet": "tower", "keys" : keys, "okmsg": okmsg, "badmsg": badmsg}]
    tempGameObjects.length += 1
    index = (tempGameObjects.length - 1)
    tempGameObjects[index] = newBarrier
    return index
}

// Add an item to a user's story
// Example item:
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
// Reset tempGameObjects for next user story
function submitUserStory(name, lvl) {
    $.getJSON('http://127.0.0.1:8888/data/objects.json', function (data) {
      userStories = data
    });

    gameObject = { "level" : lvl, "objs" : []}
    objsLength = 0

    for (i=0;i<tempGameObjects.length;i++) {
        if (tempGameObjects[i].length > 0) {
            gameObject.objs.length += 1
            gameObject.objs[objsLength] = tempGameObjects[i]
            objsLength += 1
        }
    }

    newObjectFileContents = JSON.stringify('"' + name + '" : ' + gameObject + "}")
    oldObjectFileContents = JSON.stringify(userStories)
    newObjectFileContents = oldObjectFileContents.substring(0, oldObjectFileContents.length - 1) + newObjectFileContents

    var data = new FormData();
    data.append("jsonText", newObjectFileContents);
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', 'http://127.0.0.1:8888/data/objects.json', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        // do something to response
        console.log(this.responseText);
    };
    xhr.send("hello");

    console.log("Data: " + data)
}

// Delete the barrier or item at index in tempGameObjects
function deleteFromUserStory(index) {
    tempGameObjects[index] = []
}


