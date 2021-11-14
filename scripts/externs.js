var Tree = {};
var enter;
var leave;
var visit;
Tree.TreeNode = function() {};
Tree.TreeNode.mixin = function() {};
Tree.TreeNode.prototype.parent;
Tree.TreeNode.prototype.children;
Tree.TreeNode.prototype.addNode = function() {};
Tree.TreeNode.prototype.depth = function() {};
Tree.TreeNode.prototype.findLeaves = function() {};
Tree.TreeNode.prototype.findRoot = function() {};
Tree.TreeNode.prototype.hasAncestor = function() {};
Tree.TreeNode.prototype.removeNode = function() {};
Tree.TreeNode.prototype.traverse = function() {};
Tree.TreeNode.prototype.toArray = function() {};


var BinaryTreeNode = function() {};
BinaryTreeNode.prototype.compare = function() {};
BinaryTreeNode.prototype.addNode = function() {};
BinaryTreeNode.prototype.left;
BinaryTreeNode.prototype.right;
BinaryTreeNode.prototype.removeNode = function() {};
BinaryTreeNode.prototype.traverseInOrder = function() {};
BinaryTreeNode.prototype.traversePostOrder = function() {};
BinaryTreeNode.prototype.traversePreOrder = function() {};
