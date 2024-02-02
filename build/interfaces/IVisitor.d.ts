import { ITreeNodeData } from "./ITreeNode";
export interface IVisitor<T extends ITreeNodeData> {
    enter?: (node: T, ...rest: any[]) => any;
    visit?: (node: T, ...rest: any[]) => any;
    leave?: (node: T, ...rest: any[]) => any;
}
