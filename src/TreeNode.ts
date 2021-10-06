import AbstractTreeNode from "./AbstractTreeNode";
import ITreeNode from "./interfaces/ITreeNode";

export default class TreeNode extends AbstractTreeNode implements ITreeNode {
	public parent: ITreeNode | null = null;
	public children: Array<ITreeNode | null> = [];

}
