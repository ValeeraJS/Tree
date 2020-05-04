import IVisitor from "./IVisitor";
export default interface IAbstractTreeNode<T> {
    parent: IAbstractTreeNode<T> | null;
    children: Array<IAbstractTreeNode<T> | null>;
    addNode: (node: IAbstractTreeNode<T>) => this;
    depth: (node: IAbstractTreeNode<T>) => number;
    findLeaves: () => IAbstractTreeNode<T>[];
    findRoot: (node: IAbstractTreeNode<T>) => IAbstractTreeNode<T>;
    hasAncestor: (node: IAbstractTreeNode<T>) => boolean;
    removeNode: (node: IAbstractTreeNode<T>) => this;
    traverse: (visitor: IVisitor<T>, depth: number) => any;
}
