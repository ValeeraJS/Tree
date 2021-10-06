import IAbstractBinaryTreeNode from "./interfaces/IAbstractBinaryTreeNode";
import IVisitor from "./interfaces/IVisitor";
import TreeNode from "./TreeNode";
export default abstract class AbstractBinaryTreeNode extends TreeNode implements IAbstractBinaryTreeNode {
    children: Array<IAbstractBinaryTreeNode | null>;
    parent: IAbstractBinaryTreeNode | null;
    addNode(node: IAbstractBinaryTreeNode): this;
    /**
     * 规定左孩子的对比为false，右孩子的对比为true
     * @param nodeAdded
     */
    abstract compare(nodeAdded: IAbstractBinaryTreeNode): boolean;
    get left(): IAbstractBinaryTreeNode | null;
    set left(node: IAbstractBinaryTreeNode | null);
    removeNode(node: IAbstractBinaryTreeNode): this;
    get right(): IAbstractBinaryTreeNode | null;
    set right(node: IAbstractBinaryTreeNode | null);
    traverseInOrder(visitor: IVisitor, rest: any): this;
    traversePostOrder(visitor: IVisitor, rest: any): this;
    traversePreOrder(visitor: IVisitor, rest: any): this;
}
