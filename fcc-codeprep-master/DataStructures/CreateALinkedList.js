// https://learn.freecodecamp.org/coding-interview-prep/data-structures/create-a-linked-list-class


function LinkedList() { 
  var length = 0; 
  var head = null; 

  var Node = function(element){
    this.element = element; 
    this.next = null; 
  }; 

  this.head = function(){
    return head;
  };

  this.size = function(){
    return length;
  };

  // Part 1: Add an element to the linked list.
  this.add = function(element){
    // Only change code below this line
    if (head === null) {
      head = new Node(element);
      length = 1;
    } else {
        let node = head;
        while(node.next !== null) {
            node = node.next;
        }
        node.next = new Node(element);
        length += 1;
    }
    // Only change code above this line
  };

  // Part 2: Remove an element from a linked list
  this.remove = function(element){
    // Only change code below this line
    if (head.element === element) {
      head = head.next;
      length -= 1;
      return;
    } else {
      let node = head;
      while (node !== null) {
        if (node.next.element == element) {
          node.next = node.next.next;
          length -= 1;
          return;
        }
        node = node.next;
      }
    }
    // Only change code above this line
  };

  // Part 3:
  // indexOf takes an element, and returns the index in the linked list / -1.
  // elementAt takes an index, and returns the element / undefined.
  this.indexOf = function(element) {
    let i = 0;
    let node = head;
    while (node !== null) {
      if (node.element === element) {
        return i;
      }
      i += 1;
      node = node.next;
    }
    return -1;
  }

  this.elementAt = function(index) {
    let current = 0;
    let node = head;
    while (current < index) {
      node = node.next;
      current += 1;
    }
    return node.element;
  }

  // Part 4:
  // removeAt takes an index, removes the element at the index and returns it / null.
  this.removeAt = function(index) {
    if (index < 0) {
      return null;
    }
    let node = head;
    let prev;
    let current = 0;
    while (current < index) {
      if (node !== null && node.next !== null) {
        prev = node;
        node = node.next;
        current += 1;
      } else {
        return null;
      }
    }
    length -= 1;
    prev.next = node.next;
    return node.element;
  }


  // Part 5:
  // addAt(index, element) adds the element at the index of the linked list.
  // return false if unable to add element. (Doesn't say to return anything if successfully added)
  this.addAt = function(index, element) {
    if (index < 0) {
      return false;
    }
    let node = head;
    let prev = head;
    let current = 0;
    while (current < index && node.next !== null) {
      prev = node;
      node = node.next;
      current += 1;
    }
    if (current === index) {
      let newNode = new Node(element);
      prev.next = newNode;
      newNode.next = node;
      length += 1;
    } else {
      return false;
    }
  }

}


