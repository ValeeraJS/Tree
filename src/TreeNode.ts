import ITreeNode from "./interfaces/ITreeNode";
import AbstractTreeNode from "./AbstractTreeNode";

export default class TreeNode<T> extends AbstractTreeNode<T> implements ITreeNode<T> {
    public parent: ITreeNode<T> | null = null;
    public data: T | null = null;
    public children: Array<ITreeNode<T> | null> = [];

    public constructor(data: T) {
        super();
        this.data = data;
    }
}