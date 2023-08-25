import { IVisitor } from "./IVisitor";

export interface ITreeNodeData<T> {
	parent: ITreeNodeData<T> | ITreeNode<T> | null;
	children: Array<ITreeNodeData<T> | ITreeNode<T> | null>;
}

export interface ITreeNode<T> extends ITreeNodeData<T> {
	addChild: (node: ITreeNodeData<T> | ITreeNode<T>) => this;
	depth: (node: ITreeNodeData<T> | ITreeNode<T>) => number;
	findLeaves: () => Array<ITreeNodeData<T> | ITreeNode<T>>;
	findRoot: (node: ITreeNodeData<T> | ITreeNode<T>) => ITreeNodeData<T> | ITreeNode<T>;
	hasAncestor: (node: ITreeNodeData<T> | ITreeNode<T>) => boolean;
	removeChild: (node: ITreeNodeData<T> | ITreeNode<T>) => this;
	traverse: (visitor: IVisitor<T>, depth: number) => any;
}
