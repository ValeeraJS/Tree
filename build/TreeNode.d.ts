import ITreeNode from "./interfaces/ITreeNode";
import AbstractTreeNode from "./AbstractTreeNode";
export default class TreeNode<T> extends AbstractTreeNode<T> implements ITreeNode<T> {
    parent: ITreeNode<T> | null;
    data: T | null;
    children: Array<ITreeNode<T> | null>;
    constructor(data: T);
}
