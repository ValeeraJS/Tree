import AbstractTreeNode from "./AbstractTreeNode";
import ITreeNode from "./interfaces/ITreeNode";
export default class TreeNode<T> extends AbstractTreeNode implements ITreeNode<T> {
    parent: ITreeNode<T> | null;
    data: T | null;
    children: Array<ITreeNode<T> | null>;
    constructor(data: T);
}
