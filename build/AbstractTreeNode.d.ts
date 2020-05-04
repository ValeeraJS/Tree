import IAbstractTreeNode from "./interfaces/IAbstractTreeNode";
import IVisitor from "./interfaces/IVisitor";
export default class AbstractTreeNode implements IAbstractTreeNode {
    parent: IAbstractTreeNode | null;
    children: Array<IAbstractTreeNode | null>;
    addNode(node: IAbstractTreeNode): this;
    depth(node?: IAbstractTreeNode): number;
    findLeaves(): IAbstractTreeNode[];
    findRoot(node?: IAbstractTreeNode): IAbstractTreeNode;
    hasAncestor(node: IAbstractTreeNode): boolean;
    removeNode(node: IAbstractTreeNode): this;
    traverse(visitor: IVisitor, rest?: any): this;
    toArray(): IAbstractTreeNode[];
}
