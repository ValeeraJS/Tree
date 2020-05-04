import IVisitor from "./IVisitor";
export default interface IAbstractTreeNode {
    parent: IAbstractTreeNode | null;
    children: Array<IAbstractTreeNode | null>;
    addNode: (node: IAbstractTreeNode) => this;
    depth: (node: IAbstractTreeNode) => number;
    findLeaves: () => IAbstractTreeNode[];
    findRoot: (node: IAbstractTreeNode) => IAbstractTreeNode;
    hasAncestor: (node: IAbstractTreeNode) => boolean;
    removeNode: (node: IAbstractTreeNode) => this;
    traverse: (visitor: IVisitor, depth: number) => any;
}
