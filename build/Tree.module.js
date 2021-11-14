const FIND_LEAVES_VISITOR = {
    enter: (node, result) => {
        if (!node.children.length) {
            result.push(node);
        }
    }
};
const ARRAY_VISITOR = {
    enter: (node, result) => {
        result.push(node);
    }
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const mixin = (Base = Object) => {
    var _a;
    return _a = class TreeNode extends Base {
            constructor() {
                super(...arguments);
                this.parent = null;
                this.children = [];
            }
            static addNode(node, child) {
                if (TreeNode.hasAncestor(node, child)) {
                    throw new Error("The node added is one of the ancestors of current one.");
                }
                node.children.push(child);
                child.parent = node;
                return node;
            }
            static depth(node) {
                if (!node.children.length) {
                    return 1;
                }
                else {
                    const childrenDepth = [];
                    for (const item of node.children) {
                        item && childrenDepth.push(this.depth(item));
                    }
                    let max = 0;
                    for (const item of childrenDepth) {
                        max = Math.max(max, item);
                    }
                    return 1 + max;
                }
            }
            static findLeaves(node) {
                const result = [];
                TreeNode.traverse(node, FIND_LEAVES_VISITOR, result);
                return result;
            }
            static findRoot(node) {
                if (node.parent) {
                    return this.findRoot(node.parent);
                }
                return node;
            }
            static hasAncestor(node, ancestor) {
                if (!node.parent) {
                    return false;
                }
                else {
                    if (node.parent === ancestor) {
                        return true;
                    }
                    else {
                        return TreeNode.hasAncestor(node.parent, ancestor);
                    }
                }
            }
            static removeNode(node, child) {
                if (node.children.includes(child)) {
                    node.children.splice(node.children.indexOf(child), 1);
                    child.parent = null;
                }
                return node;
            }
            static toArray(node) {
                const result = [];
                TreeNode.traverse(node, ARRAY_VISITOR, result);
                return result;
            }
            static traverse(node, visitor, rest) {
                visitor.enter && visitor.enter(node, rest);
                visitor.visit && visitor.visit(node, rest);
                for (const item of node.children) {
                    item && TreeNode.traverse(item, visitor, rest);
                }
                visitor.leave && visitor.leave(node, rest);
                return node;
            }
            addNode(node) {
                return TreeNode.addNode(this, node);
            }
            depth() {
                return TreeNode.depth(this);
            }
            findLeaves() {
                return TreeNode.findLeaves(this);
            }
            findRoot() {
                return TreeNode.findRoot(this);
            }
            hasAncestor(ancestor) {
                return TreeNode.hasAncestor(this, ancestor);
            }
            removeNode(child) {
                return TreeNode.removeNode(this, child);
            }
            toArray() {
                return TreeNode.toArray(this);
            }
            traverse(visitor, rest) {
                return TreeNode.traverse(this, visitor, rest);
            }
        },
        _a.mixin = mixin,
        _a;
};
var TreeNode = mixin(Object);

let tmpNode;
class AbstractBinaryTreeNode extends TreeNode {
    constructor() {
        super(...arguments);
        this.children = [null, null];
        this.parent = null;
    }
    addNode(node) {
        if (this.compare(node)) {
            if (this.children[1]) {
                this.children[1].addNode(node);
            }
            else {
                if (this.hasAncestor(node)) {
                    throw new Error("The node added is one of the ancestors of current one.");
                }
                this.children[1] = node;
                node.parent = this;
            }
        }
        else {
            if (this.children[0]) {
                this.children[0].addNode(node);
            }
            else {
                if (this.hasAncestor(node)) {
                    throw new Error("The node added is one of the ancestors of current one.");
                }
                this.children[0] = node;
                node.parent = this;
            }
        }
        return this;
    }
    get left() {
        return this.children[0];
    }
    set left(node) {
        tmpNode = this.children[0];
        if (tmpNode) {
            this.removeNode(tmpNode);
        }
        this.children[0] = node;
        if (node) {
            node.parent = this;
        }
    }
    removeNode(node) {
        if (this.children.includes(node)) {
            this.children[this.children.indexOf(node)] = null;
            node.parent = null;
        }
        return this;
    }
    get right() {
        return this.children[1];
    }
    set right(node) {
        tmpNode = this.children[1];
        if (tmpNode) {
            this.removeNode(tmpNode);
        }
        this.children[1] = node;
        if (node) {
            node.parent = this;
        }
    }
    traverseInOrder(visitor, rest) {
        tmpNode = this.children[0];
        visitor.enter && visitor.enter(this, rest);
        if (tmpNode) {
            tmpNode.traverseInOrder(visitor, rest);
        }
        visitor.visit && visitor.visit(this, rest);
        tmpNode = this.children[1];
        if (tmpNode) {
            tmpNode.traverseInOrder(visitor, rest);
        }
        visitor.leave && visitor.leave(this, rest);
        return this;
    }
    traversePostOrder(visitor, rest) {
        tmpNode = this.children[0];
        visitor.enter && visitor.enter(this, rest);
        if (tmpNode) {
            tmpNode.traversePostOrder(visitor, rest);
        }
        tmpNode = this.children[1];
        if (tmpNode) {
            tmpNode.traversePostOrder(visitor, rest);
        }
        visitor.visit && visitor.visit(this, rest);
        visitor.leave && visitor.leave(this, rest);
        return this;
    }
    traversePreOrder(visitor, rest) {
        tmpNode = this.children[0];
        visitor.enter && visitor.enter(this, rest);
        visitor.visit && visitor.visit(this, rest);
        if (tmpNode) {
            tmpNode.traversePreOrder(visitor, rest);
        }
        tmpNode = this.children[1];
        if (tmpNode) {
            tmpNode.traversePreOrder(visitor, rest);
        }
        visitor.leave && visitor.leave(this, rest);
        return this;
    }
}

export { AbstractBinaryTreeNode as BinaryTreeNode, TreeNode };
