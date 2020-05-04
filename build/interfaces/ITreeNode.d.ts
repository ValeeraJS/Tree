import IAbstractTreeNode from "./IAbstractTreeNode";
export default interface ITreeNode<T> extends IAbstractTreeNode {
    children: Array<ITreeNode<T> | null>;
    data: T | null;
    parent: ITreeNode<T> | null;
}
