// Add a barrier to a user's story
// "Barrier", {"x": 508, "y": 0, "sheet": "tower", "keys": ["dontgivea","keyyy"], "okmsg" : "You have found my weakness!", "badmsg" : "You are missing an item you need to cross this barrier."}],
function addBarrier(name, x, y, keys, okmsg, badmsg) {
    var newBarrier = ["Barrier", {"x": x, "y": y, "sheet": "tower", "keys" = keys, "okmsg": okmsg, "badmsg": badmsg}]
    tempGameObjects.length += 1
    index = (tempGameObjects.length - 1)
    tempGameObjects[index] = newBarrier
    return index
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
function submitUserStory(name, lvl) {
    

}

// Delete the barrier or item at index i in tempGameObjects
function deleteFromUserStory(i) {
    

}