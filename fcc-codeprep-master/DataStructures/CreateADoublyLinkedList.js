//https://learn.freecodecamp.org/coding-interview-prep/data-structures/create-a-doubly-linked-list
var Node = function(data, prev) {
  this.data = data;
  this.prev = prev;
  this.next = null;
};
var DoublyLinkedList = function() {
  this.head = null;
  this.tail = null;
  // Part 1: add and remove methods for a doubly linked list.
  // change code below this line
  this.add = function(element) {
    if (this.head === null) {
      let newNode = new Node(element, null);
      this.head = newNode;
    } else if (this.tail !== null) {
      let newNode = new Node(element, this.tail);
      this.tail.next = newNode;
      this.tail = newNode;
    } else {
      let newNode = new Node(element, this.head);
      this.head.next = newNode;
      this.tail = newNode;
    }
  }

  this.remove = function(element) {
    let node = this.head;
    while (node !== null) {
      if (node.data === element) {
        if (node.prev !== null) {
          node.prev.next = node.next;
        }
        if (node.next !== null) {
           node.next.prev = node.prev;
        }
        if (node === this.head) {
          this.head = node.next;
        }
        if (node === this.tail) {
          this.tail = node.prev;
        }
      }
      node = node.next;
    }
  }
  // change code above this line
  // Part 2: Reverse a doubly linked list.
  this.reverse = function() {
    if (this.head === null) {
      return null;
    }
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    while (node !== null) {
      let oldPrev = node.prev;
      node.prev = node.next;
      node.next = oldPrev;
      node = node.prev;
    }
  }
};