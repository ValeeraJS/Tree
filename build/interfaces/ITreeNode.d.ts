import { IVisitor } from "./IVisitor";
export interface ITreeNodeData {
    parent: ITreeNodeData | null;
    children: Array<ITreeNodeData | null>;
}
export interface ITreeNode extends ITreeNodeData {
    addChild: (node: ITreeNode) => this;
    depth: (node: ITreeNode) => number;
    findLeaves: () => ITreeNode[];
    findRoot: (node: ITreeNode) => ITreeNode;
    hasAncestor: (node: ITreeNode) => boolean;
    isLeaf: () => boolean;
    removeChild: (node: ITreeNode) => this;
    traversePostorder: (visitor: IVisitor<ITreeNode>, ...rest: any) => any;
    traversePreorder: (visitor: IVisitor<ITreeNode>, ...rest: any) => any;
}
