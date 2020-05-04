import AbstractTreeNode from "./AbstractTreeNode";
import ITreeNode from "./interfaces/ITreeNode";

export default class TreeNode<T> extends AbstractTreeNode implements ITreeNode<T> {
	public parent: ITreeNode<T> | null = null;
	public data: T | null = null;
	public children: Array<ITreeNode<T> | null> = [];

	public constructor(data: T) {
		super();
		this.data = data;
	}
}
