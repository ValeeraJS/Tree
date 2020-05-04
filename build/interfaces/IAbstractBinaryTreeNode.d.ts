import ITreeNode from "./ITreeNode";
import IVisitor from "./IVisitor";
export default interface IAbstractBinaryTreeNode<T> extends ITreeNode<T> {
    children: Array<IAbstractBinaryTreeNode<T> | null>;
    data: T | null;
    left: IAbstractBinaryTreeNode<T> | null;
    parent: IAbstractBinaryTreeNode<T> | null;
    right: IAbstractBinaryTreeNode<T> | null;
    addNode: (node: IAbstractBinaryTreeNode<T>) => this;
    traverseInOrder: (visitor: IVisitor, rest: any) => this;
    traversePostOrder: (visitor: IVisitor, rest: any) => this;
    traversePreOrder: (visitor: IVisitor, rest: any) => this;
}
