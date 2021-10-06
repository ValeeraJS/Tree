import IAbstractTreeNode from "./IAbstractTreeNode";

export default interface ITreeNode extends IAbstractTreeNode {
	children: Array<ITreeNode | null>;
	parent: ITreeNode | null;
}
