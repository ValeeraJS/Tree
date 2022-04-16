const Tree = {};
let enter;
let leave;
let visit;

Tree.TreeNode = function () {};
Tree.TreeNode.mixin = function () {};
Tree.TreeNode.prototype.parent;
Tree.TreeNode.prototype.children;
Tree.TreeNode.prototype.addChild = function () {};
Tree.TreeNode.prototype.depth = function () {};
Tree.TreeNode.prototype.findLeaves = function () {};
Tree.TreeNode.prototype.findRoot = function () {};
Tree.TreeNode.prototype.hasAncestor = function () {};
Tree.TreeNode.prototype.removeChild = function () {};
Tree.TreeNode.prototype.traverse = function () {};
Tree.TreeNode.prototype.toArray = function () {};

const BinaryTreeNode = function () {};

BinaryTreeNode.prototype.compare = function () {};
BinaryTreeNode.prototype.addChild = function () {};
BinaryTreeNode.prototype.left;
BinaryTreeNode.prototype.right;
BinaryTreeNode.prototype.removeChild = function () {};
BinaryTreeNode.prototype.traverseInOrder = function () {};
BinaryTreeNode.prototype.traversePostOrder = function () {};
BinaryTreeNode.prototype.traversePreOrder = function () {};
