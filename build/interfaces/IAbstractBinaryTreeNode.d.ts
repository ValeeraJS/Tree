import ITreeNode from "./ITreeNode";
import IVisitor from "./IVisitor";
export default interface IAbstractBinaryTreeNode extends ITreeNode {
    children: Array<IAbstractBinaryTreeNode | null>;
    left: IAbstractBinaryTreeNode | null;
    parent: IAbstractBinaryTreeNode | null;
    right: IAbstractBinaryTreeNode | null;
    addNode: (node: IAbstractBinaryTreeNode) => this;
    traverseInOrder: (visitor: IVisitor, rest: any) => this;
    traversePostOrder: (visitor: IVisitor, rest: any) => this;
    traversePreOrder: (visitor: IVisitor, rest: any) => this;
}
