// https://learn.freecodecamp.org/coding-interview-prep/data-structures/create-a-map-data-structure

// Instructions: Lets practice creating our own map.
// JS objects provide more efficient map structure than anything we could write,
// but it is just for a learning exercise.
// And, what if we want to define custom operations?

// add accepts a key, value to add to the map.
// remove accepts a key and removes the key, value pair.
// get accepts a key and returns the value
// has accepts a key, and returns true if it exists, false if not.
// values returns an array of all the values in the map (as strings in an array)
// size returns the number of items in the map
// clear empties the map.

var Map = function() {
  this.collection = {};
  // change code below this line
    this.add = (key, value) => {
        this.collection[key] = value;
    }

    this.remove = (key, value) => {
        delete this.collection[key];
    }

    this.get = (key) => {
        return this.collection[key];
    }

    this.has = (key) => {
        return Object.keys(this.collection).includes(key);
    }

    this.values = () => {
        let vals = Object.entries(this.collection).map(element => element[1].toString());
        return vals;
    }

    this.clear = () => {
        this.collection = {};
    }

    this.size = () => {
        return Object.keys(this.collection).length;
    }
  // change code above this line
};