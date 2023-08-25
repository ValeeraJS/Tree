import { ITreeNode, ITreeNodeData } from "./ITreeNode";
export interface IVisitor<T> {
    enter?: (node: ITreeNode<T> | ITreeNodeData<T>, rest: any) => any;
    visit?: (node: ITreeNode<T> | ITreeNodeData<T>, rest: any) => any;
    leave?: (node: ITreeNode<T> | ITreeNodeData<T>, rest: any) => any;
}
