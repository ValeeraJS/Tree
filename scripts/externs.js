var Tree = {};
var enter;
var leave;
var visit;
var AbstractTreeNode = function() {};
AbstractTreeNode.prototype.parent;
AbstractTreeNode.prototype.children;
AbstractTreeNode.prototype.addNode = function() {};
AbstractTreeNode.prototype.depth = function() {};
AbstractTreeNode.prototype.findLeaves = function() {};
AbstractTreeNode.prototype.findRoot = function() {};
AbstractTreeNode.prototype.hasAncestor = function() {};
AbstractTreeNode.prototype.removeNode = function() {};
AbstractTreeNode.prototype.traverse = function() {};
AbstractTreeNode.prototype.toArray = function() {};

var AbstractBinaryTreeNode = function() {};
AbstractBinaryTreeNode.prototype.compare = function() {};
AbstractBinaryTreeNode.prototype.addNode = function() {};
AbstractBinaryTreeNode.prototype.left;
AbstractBinaryTreeNode.prototype.right;
AbstractBinaryTreeNode.prototype.removeNode = function() {};
AbstractBinaryTreeNode.prototype.traverseInOrder = function() {};
AbstractBinaryTreeNode.prototype.traversePostOrder = function() {};
AbstractBinaryTreeNode.prototype.traversePreOrder = function() {};

var TreeNode = function() {};
TreeNode.prototype.parent;
TreeNode.prototype.data;
TreeNode.prototype.children;
