import IVisitor from "./IVisitor";

export interface ITreeNodeData {
	// eslint-disable-next-line no-use-before-define
	parent: ITreeNodeData | ITreeNode | null;
	// eslint-disable-next-line no-use-before-define
	children: Array<ITreeNodeData | ITreeNode | null>;
}

export default interface ITreeNode extends ITreeNodeData {
	addChild: (node: ITreeNodeData | ITreeNode) => this;
	depth: (node: ITreeNodeData | ITreeNode) => number;
	findLeaves: () => Array<ITreeNodeData | ITreeNode>;
	findRoot: (node: ITreeNodeData | ITreeNode) => ITreeNodeData | ITreeNode;
	hasAncestor: (node: ITreeNodeData | ITreeNode) => boolean;
	removeChild: (node: ITreeNodeData | ITreeNode) => this;
	traverse: (visitor: IVisitor, depth: number) => any;
}
