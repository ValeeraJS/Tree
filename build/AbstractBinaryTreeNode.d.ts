import IAbstractBinaryTreeNode from "./interfaces/IAbstractBinaryTreeNode";
import IVisitor from "./interfaces/IVisitor";
import TreeNode from "./TreeNode";
export default abstract class AbstractBinaryTreeNode<T> extends TreeNode<T> implements IAbstractBinaryTreeNode<T> {
    children: Array<IAbstractBinaryTreeNode<T> | null>;
    parent: IAbstractBinaryTreeNode<T> | null;
    addNode(node: IAbstractBinaryTreeNode<T>): this;
    /**
     * 规定左孩子的对比为false，右孩子的对比为true
     * @param nodeAdded
     */
    abstract compare(nodeAdded: IAbstractBinaryTreeNode<T>): boolean;
    get left(): IAbstractBinaryTreeNode<T> | null;
    set left(node: IAbstractBinaryTreeNode<T> | null);
    removeNode(node: IAbstractBinaryTreeNode<T>): this;
    get right(): IAbstractBinaryTreeNode<T> | null;
    set right(node: IAbstractBinaryTreeNode<T> | null);
    traverseInOrder(visitor: IVisitor, rest: any): this;
    traversePostOrder(visitor: IVisitor, rest: any): this;
    traversePreOrder(visitor: IVisitor, rest: any): this;
}
