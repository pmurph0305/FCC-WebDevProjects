// https://learn.freecodecamp.org/coding-interview-prep/data-structures/depth-first-search
// Instuctions: 
// Implement a depth-first search on an undirected adjacency matrix graph
// the dfs function takes a graph, and a node label (integer) as parameters.
// should return an array of all nodes reachable from the root.

function dfs(graph, root) {
  // visited Nodes is an array of 0s.
  let visitedNodes = []
  // root is visited.
  visitedNodes.push(root);
  let stack = [];
  stack.push(graph[root]);
  while (stack.length > 0) {
    let node = stack.pop();
    node.forEach((child, index) => {
      // only add linked children that haven't already been visited.
      if (child === 1 && !visitedNodes.includes(index)) {
        visitedNodes.push(index);
        stack.push(graph[index]);
      }
    })
  }
  return visitedNodes;
}

var exDFSGraph = [
  [0, 1, 0, 0],
  [1, 0, 1, 0],
  [0, 1, 0, 1],
  [0, 0, 1, 0]
];
console.log(dfs(exDFSGraph, 3));