// Note: Each section was done seperately, other than adding the add function to each section past part 2 for testing purposes.

// Part 1: https://learn.freecodecamp.org/coding-interview-prep/data-structures/find-the-minimum-and-maximum-value-in-a-binary-search-tree/
// Instructions: Write functions to find the min and max value
// of a binary search tree.

// Part 2: https://learn.freecodecamp.org/coding-interview-prep/data-structures/add-a-new-element-to-a-binary-search-tree
// Instructions: Write a function to add an integer to the BST.
// return null if duplicate value, undefined if successful.

// Part 3: https://learn.freecodecamp.org/coding-interview-prep/data-structures/check-if-an-element-is-present-in-a-binary-search-tree
// Instructions: Write a function to check if an element is present in the BST.
// return true if present, false if not.

// Part 4: https://learn.freecodecamp.org/coding-interview-prep/data-structures/find-the-minimum-and-maximum-height-of-a-binary-search-tree
// Instructions: Write a findMinHeight and findMaxHeight and isBalanced function for a BST.
// Note: tests on FCC are broken, and isBalanced only passes if it always returns true.

// Part 5: https://learn.freecodecamp.org/coding-interview-prep/data-structures/use-depth-first-search-in-a-binary-search-tree
// Instructions: Write Depth First Search functions for a in-order, pre-order, and post-order search

// Part 6: https://learn.freecodecamp.org/coding-interview-prep/data-structures/use-breadth-first-search-in-a-binary-search-tree
// Instructions: Write Breadth first search functions for inorder and reverseorder searches.

// Part 7: https://learn.freecodecamp.org/coding-interview-prep/data-structures/delete-a-leaf-node-in-a-binary-search-tree
// Instructions: Write a remove function that takes a value, and deletes the node if it is a leaf, return null if it is not a leaf.
// Description also says to keep track of parent, and # of children the target node has.

// Part 8: https://learn.freecodecamp.org/coding-interview-prep/data-structures/delete-a-node-with-one-child-in-a-binary-search-tree
// Instructions: Add to remove function ability to delete a node with 1 child.

// Part 9: https://learn.freecodecamp.org/coding-interview-prep/data-structures/delete-a-node-with-two-children-in-a-binary-search-tree
// Instructions: Add to remove function ability to delete a node with 2 children.

// Part 10: https://learn.freecodecamp.org/coding-interview-prep/data-structures/invert-a-binary-tree/
// Instructions: Invert a binary tree. (Aka reverse a binary tree).

var displayTree = (tree) => console.log(JSON.stringify(tree, null, 2));
function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}
function BinarySearchTree() {
  this.root = null;
    
  // Part 1: change code below this line
  // findMin should return the minimum value found in the BST
  this.findMin = () => {
    if (this.root === null) {
        return null;
    }
    let node = this.root;
    while (node.left !== null) {
        node = node.left;
    }
    return node.value;
  }
  // findMax should return the maximum value found in the BST
  this.findMax = () => {
    if (this.root === null) {
        return null;
    }
    let node = this.root;
    while (node.right !== null) {
        node = node.right;
    }
    return node.value;
  }
  // Part 1: change code above this line

  // Part 2: change code below this line
  // add should accept an integer, and add it to the tree.
  // if the value already exists return null, if successful return undefined.
  // this.add = (value) => {
  //     if (this.root === null) {
  //         this.root = new Node(value);
  //         return undefined;
  //     }
  //     let prevNode = this.root;
  //     let node = this.root;
  //     while (node !== null) {
  //         if (node.value === value) {
  //             return null;
  //         }
  //         prevNode = node;
  //         if (node.value > value) {
  //             node = node.left;
  //         } else if (node.value < value) {
  //             node = node.right;
  //         }
  //     }
  //     if (prevNode.value > value) {
  //         prevNode.left = new Node(value);
  //         return undefined;
  //     } else if (prevNode.value < value) {
  //         prevNode.right = new Node(value);
  //         return undefined;
  //     }
  // }

  // recursive
  this.add = (value) => {
    let addRecursive = (node, direction) => {
      if (node[direction] === null) {
          node[direction] = new Node(value);
          return undefined;
      } else if (node[direction].value === value) {
          return null;
      } else if (node[direction].value > value) {
          return addRecursive(node[direction], 'left');
      } else {
          return addRecursive(node[direction], 'right');
      }
    }
    return addRecursive(this, 'root');
  }
  // Part 2: change code above this line

  // Part 3: change code below this line
  // this.isPresent = (value) => {
  //     let node = this.root;
  //     while(node !== null) {
  //         if (node.value === value) {
  //             return true;
  //         } else if (node.value > value) {
  //             if (node.left === null) {
  //                 return false;
  //             } else {
  //                 node = node.left;
  //             }
  //         } else if (node.value < value) {
  //             if (node.right === null) {
  //                 return false;
  //             } else {
  //                 node = node.right;
  //             }
  //         }
  //     }
  //     return false;
  // }

  // using a recursive function
  this.isPresent = (value) => {
    const isPresentRecursive = (node, direction) => {
      if (node[direction] === null) {
          return false;
      } else if (node[direction].value === value) {
          return true;
      } else if (node[direction].value < value) {
          return isPresentRecursive(node[direction], 'right');
      } else if (node[direction].value > value) {
          return isPresentRecursive(node[direction], 'left');
      }
    }
    return isPresentRecursive(this, 'root');
  }
  // Part 3: change code above this line

  // Part 4: change code below this line
  this.findMinHeight = () => {
    if (this.root === null) {
        return -1;
    }
    let height = 0;
    let nodes = [];
    nodes.push(this.root);
    while(nodes.length !== 0) {
        let newNodes = []
        for(let i = 0; i < nodes.length; i++) {
            if (nodes[i].left === null || nodes[i].right === null) {
                return height;
            } else {
                newNodes.push(nodes[i].left);
                newNodes.push(nodes[i].right);
            }
        }
        nodes = newNodes;
        height += 1;
    }
    return height;
  }

  this.findMaxHeight = () => {
    if (this.root === null) {
        return -1;
    }
    let height = -1;
    let nodes = [];
    nodes.push(this.root);
    while(nodes.length !== 0) {
        let newNodes = [];
        for(let i = 0; i < nodes.length; i++) {
            if(nodes[i].right !== null) {
                newNodes.push(nodes[i].right);
            }
            if(nodes[i].left !== null) {
                newNodes.push(nodes[i].left);
            }
        }
        nodes = newNodes;
        height += 1;
    }
    return height;
  }

  this.isBalanced = () => {
    if ((this.findMaxHeight() - this.findMinHeight()) > 1) {
        return false;
    } else {
        return true;
    }
  }
  // Part 4: change code above this line

  // Part 5: change code below this line
  this.inorder = () => {
    let inOrderRecursive = (values, node) => {
        // begin search at left most node.
        if (node.left !== null) {
            // explore further subtree
            values = inOrderRecursive(values, node.left);
            // then add the node to the array (before exploring the right subtree)
            values.push(node.value);
        } else {
            // Add the leaf to the array, and return the array.
            values.push(node.value);
            return values;
        }
        // end at right most node.
        if (node.right !== null) {
            // explore further
            values = inOrderRecursive(values, node.right);
        }
        // retunr the ordered values.
        return values;
    }
    if (this.root === null) {
        return null;
    } else {
        return inOrderRecursive([], this.root);
    }
  }

  this.preorder = () => {
    let preOrderRecursive = (values, node) => {
        // explore the root before the leaves.
        values.push(node.value);
        // explore left.
        if (node.left !== null) {
            values = preOrderRecursive(values, node.left);
        }
        // explore right
        if (node.right !== null) {
            values = preOrderRecursive(values, node.right);
        }
        return values;
    }
    if (this.root === null) {
        return null;
    } else {
        return preOrderRecursive([], this.root);
    }
  }

  this.postorder = () => {
    let postOrderRecursive = (values, node) => {
        // explore the leaves before the root.
        // explore left.
        if (node.left !== null) {
            values = postOrderRecursive(values, node.left);
        }
        // explore right.
        if (node.right !== null) {
            values = postOrderRecursive(values, node.right);
        }
        // explore the root after the leaves.
        values.push(node.value);
        return values;
    }
    if (this.root === null) {
        return null;
    } else {
        return postOrderRecursive([], this.root);
    }
  }
  // Part 5: change code above this line

  // Part 6: change code below this line
  this.levelOrder = () => {
    return levelOrderCommon(false);
  }

  this.reverseLevelOrder = () => {
    return levelOrderCommon(true);
  }

  let levelOrderCommon = (shouldReverse) => {
      if (this.root === null) {
        return null;
    }
    let values = [];
    let nodeQueue = [];
    nodeQueue.push(this.root);

    while(nodeQueue.length > 0) {
        let node = nodeQueue.shift();
        values.push(node.value);
        if (shouldReverse) {
            if (node.right !== null) {
                nodeQueue.push(node.right);
            }
            if (node.left !== null) {
                nodeQueue.push(node.left);
            }
        }
        else {
            if (node.left !== null) {
                nodeQueue.push(node.left);
            }
            if (node.right !== null) {
                nodeQueue.push(node.right);
            }
        }
    }
    return values;
  }
  // Part 6: change code above this line

  // Part 7/8/9: change code below this line
  this.remove = (value) => {
    const findParentAndNodeRecursive = (node, direction) => {
      if (node[direction] === null) {
        return [null, null, null];
      } else if (node[direction].value === value) {
        return [node, node[direction], direction];
      } else if (node[direction].value < value) {
        return findParentAndNodeRecursive(node[direction], 'right');
      } else if (node[direction].value > value) {
        return findParentAndNodeRecursive(node[direction], 'left');
      }
    }
    let [parent, removeNode, direction] = findParentAndNodeRecursive(this, 'root');

    const getNumChildren = (node) => {
      let children = 0;
      if (node.left !== null) {
        children += 1;
      }
      if (node.right !== null) {
        children += 1;
      }
      return children;
    }

    if (removeNode !== null) {
      let numChildren = getNumChildren(removeNode);
      // case 1: target has no children, change code below this line
      if (numChildren === 0) {
        parent[direction] = null;
      } 
      // Part 8:
      // case 2: target has one child, change the code below this line.
      else if (numChildren === 1) {
        if (removeNode.left !== null) {
            parent[direction] = removeNode.left;
        } else {
            parent[direction] = removeNode.right;
        }
      }
      // Part 9:
      // case 3: target has two children 
      else {
        // find smallest value in the right subtree of the target node.
        const findSmallestNodeAndParentInTree = (rightSubTree) => {
          // recursively look for the left-most node in the tree.
          const recursiveLeft = (node, parent) => {
            // no more left nodes, it's the smallest in the tree.
            if (node.left === null) {
              return [node, parent];
            } else {
              return recursiveLeft(node.left, node);
            }
          }
          // if there's no left branch of the rightSubTree node, it's the smallest.
          if (rightSubTree.left === null) {
            return [rightSubTree, null];
          } else {
            // otherwise we need to recursively find the smallest in the branch.
            return recursiveLeft(rightSubTree.left, rightSubTree);
          }
        }
        // find the smallest node and it's parent in the right subtree of the target node.
        let [smallestNode, smallestNodeParent] = findSmallestNodeAndParentInTree(removeNode.right);
        if (smallestNodeParent !== null) {
          // if we returned a parent, we don't want to leave a dangling branch.
          // but also want to remove the smallest node from it's current spot.
          smallestNodeParent.left = smallestNode.right;
          removeNode.value = smallestNode.value;
          console.log('has parent');
        } else {
          // otherwise there is just a single leaf as a child, so just set the value, and drop the right branch.
           removeNode.value = smallestNode.value;
           removeNode.right = null;
        }
      }
    } else {
        return null;
    }
  }
  // Part 7/8/9: change code above this line
  // Part 10: change code below this line
  this.invert = () => {
    if (this.root!==null) {
      let invertRecursive = (node) => {
        let left = node.left;
        node.left = node.right;
        node.right = left;
        if (node.left !== null) {
            invertRecursive(node.left);
        }
        if (node.right !== null) {
            invertRecursive(node.right);
        }
      }
      invertRecursive(this.root);
    } else {
        return null;
    }
  }
  // Part 10: change code above this line
}

let bst = new BinarySearchTree();
bst.add(4);
bst.add(2);
bst.add(1);
bst.add(5);
bst.add(6);
console.log(bst.remove(2));
displayTree(bst);