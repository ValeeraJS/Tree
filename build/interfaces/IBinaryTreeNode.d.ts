import { ITreeNode } from "./ITreeNode";
import { IVisitor } from "./IVisitor";
export interface IBinaryTreeNode extends ITreeNode {
    children: Array<IBinaryTreeNode | null>;
    left: IBinaryTreeNode | null;
    parent: IBinaryTreeNode | null;
    right: IBinaryTreeNode | null;
    traverseInOrder: (visitor: IVisitor, rest: any) => this;
    traversePostOrder: (visitor: IVisitor, rest: any) => this;
    traversePreOrder: (visitor: IVisitor, rest: any) => this;
}
