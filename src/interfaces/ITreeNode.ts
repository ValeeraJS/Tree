import { IVisitor } from "./IVisitor";

export interface ITreeNodeData {
	parent: ITreeNodeData | ITreeNode | null;
	children: Array<ITreeNodeData | ITreeNode | null>;
}

export interface ITreeNode extends ITreeNodeData {
	addChild: (node: ITreeNodeData | ITreeNode) => this;
	depth: (node: ITreeNodeData | ITreeNode) => number;
	findLeaves: () => Array<ITreeNodeData | ITreeNode>;
	findRoot: (node: ITreeNodeData | ITreeNode) => ITreeNodeData | ITreeNode;
	hasAncestor: (node: ITreeNodeData | ITreeNode) => boolean;
	removeChild: (node: ITreeNodeData | ITreeNode) => this;
	traverse: (visitor: IVisitor, depth: number) => any;
}
