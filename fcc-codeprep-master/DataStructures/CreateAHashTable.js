// https://learn.freecodecamp.org/coding-interview-prep/data-structures/create-a-hash-table
// Instructions:
// Create basic functionality of a hash table.
// Naive hashing function already created.
// Store items based on hash value in this.collection
// Create methods: add, remove, and lookup.
// add: accepts a key value pair, adds it to the hash table
// remove: accepts a key, removes a key value pair from the hash table.
// lookup: accepts a key, returns value if present, null otherwise.

var called = 0;
var hash = (string) => {
  called++;
  var hash = 0;
  for (var i = 0; i < string.length; i++) { hash += string.charCodeAt(i); }
  return hash;
};

var HashTable = function() {
  this.collection = {};
  // change code below this line
  this.add = (key, value) => {
    let hashed = hash(key);
    let o = {};
    o[key] = value;
    if (this.collection[hashed] != null) {
      this.collection[hashed] = Object.assign(this.collection[hashed], o);
    } else {
      this.collection[hashed] = o;
    }
  }

  this.remove = (key) => {
    let hashed = hash(key);
    delete this.collection[hashed][key];
  }

  this.lookup = (key) => {
    let hashed = hash(key);
    if (this.collection[hashed][key]) {
      return this.collection[hashed][key];
    } else {
      return null;
    }
  }
  // change code above this line
};
