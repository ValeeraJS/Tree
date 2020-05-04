import IAbstractTreeNode from "./interfaces/IAbstractTreeNode";
import IVisitor from "./interfaces/IVisitor";
export default class AbstractTreeNode<T> implements IAbstractTreeNode<T> {
    parent: IAbstractTreeNode<T> | null;
    children: Array<IAbstractTreeNode<T> | null>;
    addNode(node: IAbstractTreeNode<T>): this;
    depth(node?: IAbstractTreeNode<T>): number;
    findLeaves(): IAbstractTreeNode<T>[];
    findRoot(node?: IAbstractTreeNode<T>): IAbstractTreeNode<T>;
    hasAncestor(node: IAbstractTreeNode<T>): boolean;
    removeNode(node: IAbstractTreeNode<T>): this;
    traverse(visitor: IVisitor<T>, rest?: any): this;
    toArray(): IAbstractTreeNode<T>[];
}
