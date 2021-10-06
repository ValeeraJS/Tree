import AbstractTreeNode from "./AbstractTreeNode";
import ITreeNode from "./interfaces/ITreeNode";
export default class TreeNode extends AbstractTreeNode implements ITreeNode {
    parent: ITreeNode | null;
    children: Array<ITreeNode | null>;
}
