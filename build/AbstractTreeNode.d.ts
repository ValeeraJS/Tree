import IAbstractTreeNode from "./interfaces/IAbstractTreeNode";
import IVisitor from "./interfaces/IVisitor";
export default class AbstractTreeNode implements IAbstractTreeNode {
    parent: IAbstractTreeNode | null;
    children: Array<IAbstractTreeNode | null>;
    static addNode(node: IAbstractTreeNode, child: IAbstractTreeNode): IAbstractTreeNode;
    static depth(node: IAbstractTreeNode): number;
    static findLeaves(node: IAbstractTreeNode): IAbstractTreeNode[];
    static findRoot(node: IAbstractTreeNode): IAbstractTreeNode;
    static hasAncestor(node: IAbstractTreeNode, ancestor: IAbstractTreeNode): boolean;
    static removeNode(node: IAbstractTreeNode, child: IAbstractTreeNode): IAbstractTreeNode;
    static toArray(node: IAbstractTreeNode): IAbstractTreeNode[];
    static traverse(node: IAbstractTreeNode, visitor: IVisitor, rest?: any): IAbstractTreeNode;
    addNode(node: IAbstractTreeNode): this;
    depth(): number;
    findLeaves(): IAbstractTreeNode[];
    findRoot(): IAbstractTreeNode;
    hasAncestor(ancestor: IAbstractTreeNode): boolean;
    removeNode(child: IAbstractTreeNode): this;
    toArray(): IAbstractTreeNode[];
    traverse(visitor: IVisitor, rest?: any): this;
}
