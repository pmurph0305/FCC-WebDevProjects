// https://learn.freecodecamp.org/coding-interview-prep/data-structures/breadth-first-search/
// Instructions, write the bfs function to do a breadth-first search on an adjacency matrix graph.
// with node and root label as parameters.

function bfs(graph, root) {
  // Distance object returned
  var nodesLen = {};
  graph.forEach((element, index) => {
      nodesLen[index] = Infinity;
  })
  // distance to root is 0.
  nodesLen[root] = 0;
  let queue = [];
  // [connected nodes array, distance]
  // Distance to all first connected nodes is 1.
  queue.push([graph[root], 1]);
  while (queue.length > 0) {
      // use queue to go through the node list, don't have to do shortest distance checks.
      let nodesData = queue.shift();
      nodesData[0].forEach((element, index) => {
          // only further explore if element can be explored && has not been explored yet.
          if (element === 1 && nodesLen[index] === Infinity) {
              nodesLen[index] = nodesData[1];
              queue.push([graph[index], nodesData[1] + 1])
          }
      })
  }
  return nodesLen;
};

var exBFSGraph = [
  [0, 1, 0, 0],
  [1, 0, 1, 0],
  [0, 1, 0, 1],
  [0, 0, 1, 0]
];
console.log(bfs(exBFSGraph, 3));