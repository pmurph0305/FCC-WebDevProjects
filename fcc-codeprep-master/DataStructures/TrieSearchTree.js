// https://learn.freecodecamp.org/coding-interview-prep/data-structures/create-a-trie-search-tree/
// Instructions: Create a Trie to store words, with add, isWord, and print methods.


var displayTree = (tree) => console.log(JSON.stringify(tree, null, 2));
var Node = function() {
  this.keys = new Map();
  this.end = false;
  this.setEnd = function() {
    this.end = true;
  };
  this.isEnd = function() {
    return this.end;
  };
};
var Trie = function() {
  // Part 1: change code below this line
  this.root = new Node();

  this.add = (word) => {
    let addRecursive = (node, word, index) => {
      let nextNode;
      if (!node.keys.has(word[index])) {
        nextNode = new Node();
        node.keys.set(word[index], nextNode);
      } else {
        // already has the key
        nextNode = node.keys.get(word[index]);
      }
      // reached end of word.
      if (index + 1 >= word.length) {
        nextNode.setEnd();
      } else {
        addRecursive(nextNode, word, index + 1);
      }
    }
    addRecursive(this.root, word, 0);
  }

  this.isWord = (word) => {
    let isWordRecursive = (node, word, index) => {
      if (!node.keys.has(word[index])) {
        return false;
      } else {
        // end of word.
        if (index + 1 >= word.length) {
          // make sure the end of the word is marked as an end.
          if (node.keys.get(word[index]).isEnd()) {
              return true;
          } else {
              return false;
          }
        }
        // recursively go to the next letter.
        return isWordRecursive(node.keys.get(word[index]), word, index + 1)
      }
    }
    return isWordRecursive(this.root, word, 0);
  } 

  this.print = () => {
    let printRecursive = (array, node, word) => {
      // go through all the node's keys.
      node.keys.forEach((value, key) => {
        // if it's the end of a word, push it.
        if (value.isEnd()) {
            array.push(word + key);
        }
        // but still recursively check all it's children as there can be multiple endings in a branch
        printRecursive(array, value, word + key);
      })
      // return the array of all the words.
      return array;
    }
    return printRecursive([], this.root, "");
  }
  // Part 1: change code above this line
};