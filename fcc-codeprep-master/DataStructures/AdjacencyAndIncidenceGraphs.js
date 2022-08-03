// https://learn.freecodecamp.org/coding-interview-prep/data-structures/adjacency-list
// essentially a bulleted list where the left side is the node, and right side lists all other nodes its connected to.
// Directed graph would mean that the representation Node2: Node1 means Node2 is pointing to Node1,
// Where as in undirected, Node2: Node1 just shows they are connected.

// Instructions, create a undirected graph with James, Jill, Jenny, and Jeff
// where edges/relationships between:
// James and Jeff
// Jill and Jenny
// Jeff and Jenny

var undirectedAdjList = {
  James: ["Jeff"],
  Jill: ["Jenny"],
  Jenny: ["Jill", "Jeff"],
  Jeff: ["James", "Jenny"]
};


// https://learn.freecodecamp.org/coding-interview-prep/data-structures/adjacency-matrix
// graphs can have weights on their edges depending on their application.
// Instructions: Create an undirected adjacency matrix with 5 nodes
// Connections:
// 1 & 4,
// 1 & 3,
// 3 & 5,
// 4 & 5,
// all edge weights are 1.

var adjMatUndirected = [
  [0, 0, 1, 1, 0],
  [0, 0, 0, 0, 0],
  [1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1],
  [0, 0, 1, 1, 0],
 ];

// https://learn.freecodecamp.org/coding-interview-prep/data-structures/incidence-matrix
// in an incidence matrix the columns are the edges and the rows are the nodes
// a directed matrix uses -1 for an edge leaving a node
// and 1 for an edge entering a node.

// Instructions:
// Create an undirected incidence matrix with 5 nodes & 4 edges,
// Relationships:
// 1 & 2, 2 & 3, 3 & 5, 4 & 2.
var incMatUndirected = [
  [1, 0, 0, 0],
  [1, 1, 0, 1],
  [0, 1, 1, 0],
  [0, 0, 0, 1],
  [0, 0, 1, 0]
];