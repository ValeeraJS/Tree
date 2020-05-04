import TreeNode from "./TreeNode";
import IAbstractBinaryTreeNode from "./interfaces/IAbstractBinaryTreeNode";
import IVisitor from "./interfaces/IVisitor";

let tmpNode: null | IAbstractBinaryTreeNode<any>;

export default abstract class AbstractBinaryTreeNode<T> extends TreeNode<T> implements IAbstractBinaryTreeNode<T> {
    public children: Array<IAbstractBinaryTreeNode<T> | null> = [null, null];
    public parent: IAbstractBinaryTreeNode<T> | null = null;

    /**
     * 规定左孩子的对比为false，右孩子的对比为true
     * @param nodeAdded 
     */
    public abstract compare(nodeAdded: IAbstractBinaryTreeNode<T>): boolean;

    public addNode(node: IAbstractBinaryTreeNode<T>): this {
        if (this.compare(node)) {
            if (this.children[1]) {
                (this.children[1] as IAbstractBinaryTreeNode<T>).addNode(node);
            } else {
                if (this.hasAncestor(node)) {
                    throw new Error("The node added is one of the ancestors of current one.");
                }
                this.children[1] = node;
                node.parent = this;
            }
        } else {
            if (this.children[0]) {
                (this.children[0] as IAbstractBinaryTreeNode<T>).addNode(node);
            } else {
                if (this.hasAncestor(node)) {
                    throw new Error("The node added is one of the ancestors of current one.");
                }
                this.children[0] = node;
                node.parent = this;
            }
        }
        return this;
    }

    public get left(): IAbstractBinaryTreeNode<T> | null {
        return this.children[0];
    }

    public set left(node: IAbstractBinaryTreeNode<T> | null) {
        tmpNode = this.children[0];
        if (tmpNode) {
            this.removeNode(tmpNode);
        }
        this.children[0] = node;

        if(node) {
            node.parent = this;
        }
    }

    public removeNode(node: IAbstractBinaryTreeNode<T>): this {
        if (this.children.includes(node)) {
            this.children[this.children.indexOf(node)] = null;
            node.parent = null;
        }
        return this;
    }

    public get right(): IAbstractBinaryTreeNode<T> | null {
        return this.children[1];
    }
    
    public set right(node: IAbstractBinaryTreeNode<T> | null) {
        tmpNode = this.children[1];
        if (tmpNode) {
            this.removeNode(tmpNode);
        }
        this.children[1] = node;

        if(node) {
            node.parent = this;
        }
    }

    public traverseInOrder(visitor: IVisitor<T>, rest: any): this {
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
    
    public traversePostOrder(visitor: IVisitor<T>, rest: any): this {
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
    
    public traversePreOrder(visitor: IVisitor<T>, rest: any): this {
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