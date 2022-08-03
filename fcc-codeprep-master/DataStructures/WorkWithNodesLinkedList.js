// https://learn.freecodecamp.org/coding-interview-prep/data-structures/work-with-nodes-in-a-linked-list

// Create a Cat and Dog node and manually add them to 
// the linked list.

var Node = function(element){
  this.element = element; 
  this.next = null; 
};
var Kitten = new Node("Kitten");
var Puppy = new Node("Puppy");

Kitten.next = Puppy;
// only add code below this line
var Cat = new Node("Cat");
Puppy.next = Cat;
var Dog = new Node("Dog");
Cat.next = Dog;
// test your code
console.log(Kitten.next);