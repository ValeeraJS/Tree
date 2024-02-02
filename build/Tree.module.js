const FIND_LEAVES_VISITOR = {
    enter: (node, result) => {
        if (TreeNode.isLeaf(node)) {
            result.push(node);
        }
    },
};
const ARRAY_VISITOR = {
    enter: (node, result) => {
        result.push(node);
    },
};
const mixin = (Base = Object) => {
    return class TreeNode extends Base {
        static mixin = mixin;
        static addChild(node, child) {
            if (TreeNode.hasAncestor(node, child)) {
                throw new Error("The node added is one of the ancestors of current one.");
            }
            node.children.push(child);
            if (child) {
                child.parent = node;
            }
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
            TreeNode.traversePreorder(node, FIND_LEAVES_VISITOR, result);
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
        static isLeaf(node) {
            for (let i = 0, len = node.children.length; i < len; i++) {
                if (node.children[i]) {
                    return false;
                }
            }
            return true;
        }
        static removeChild(node, child) {
            if (node.children.includes(child)) {
                node.children.splice(node.children.indexOf(child), 1);
                child.parent = null;
            }
            return node;
        }
        static toArray(node) {
            const result = [];
            TreeNode.traversePreorder(node, ARRAY_VISITOR, result);
            return result;
        }
        static traversePostorder(node, visitor, ...rest) {
            visitor.enter?.(node, rest);
            for (const item of node.children) {
                item && TreeNode.traversePostorder(item, visitor, ...rest);
            }
            visitor.visit?.(node, ...rest);
            visitor.leave?.(node, ...rest);
            return node;
        }
        static traversePreorder(node, visitor, ...rest) {
            visitor.enter?.(node, ...rest);
            visitor.visit?.(node, ...rest);
            for (const item of node.children) {
                item && TreeNode.traversePreorder(item, visitor, ...rest);
            }
            visitor.leave?.(node, rest);
            return node;
        }
        parent = null;
        children = [];
        addChild(node) {
            return TreeNode.addChild(this, node);
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
        isLeaf() {
            return TreeNode.isLeaf(this);
        }
        removeChild(child) {
            return TreeNode.removeChild(this, child);
        }
        toArray() {
            return TreeNode.toArray(this);
        }
        traversePostorder(visitor, ...rest) {
            return TreeNode.traversePostorder(this, visitor, rest);
        }
        traversePreorder(visitor, ...rest) {
            return TreeNode.traversePreorder(this, visitor, ...rest);
        }
    };
};
const TreeNode = mixin(Object);

let tmpNode;
class AbstractBinaryTreeNode extends TreeNode {
    children = [null, null];
    parent = null;
    comparer;
    constructor(comparer) {
        super();
        this.comparer = comparer;
    }
    removeChild(node) {
        if (this.children.includes(node)) {
            this.children[this.children.indexOf(node)] = null;
            node.parent = null;
        }
        return this;
    }
    traverseInorder(visitor, ...rest) {
        tmpNode = this.children[0];
        visitor.enter?.(this, rest);
        if (tmpNode) {
            tmpNode.traverseInorder(visitor, ...rest);
        }
        visitor.visit?.(this, rest);
        tmpNode = this.children[1];
        if (tmpNode) {
            tmpNode.traverseInorder(visitor, ...rest);
        }
        visitor.leave?.(this, rest);
        return this;
    }
    addChild(node) {
        if (this.compare(node)) {
            if (this.children[1]) {
                this.children[1].addChild(node);
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
                this.children[0].addChild(node);
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
    /**
     * 规定左孩子的对比为false，右孩子的对比为true
     * @param nodeAdded
     */
    compare(nodeAdded) {
        return this.comparer(this, nodeAdded);
    }
    get left() {
        return this.children[0];
    }
    set left(node) {
        tmpNode = this.children[0];
        if (tmpNode) {
            this.removeChild(tmpNode);
        }
        this.children[0] = node;
        if (node) {
            node.parent = this;
        }
    }
    get right() {
        return this.children[1];
    }
    set right(node) {
        tmpNode = this.children[1];
        if (tmpNode) {
            this.removeChild(tmpNode);
        }
        this.children[1] = node;
        if (node) {
            node.parent = this;
        }
    }
}

export { AbstractBinaryTreeNode, TreeNode, mixin };
