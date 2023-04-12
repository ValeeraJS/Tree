import { ITreeNode, ITreeNodeData } from "./ITreeNode";

export interface IVisitor {
	enter?: (node: ITreeNode | ITreeNodeData, rest: any) => any;
	visit?: (node: ITreeNode | ITreeNodeData, rest: any) => any;
	leave?: (node: ITreeNode | ITreeNodeData, rest: any) => any;
}
