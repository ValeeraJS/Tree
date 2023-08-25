import { ITreeNode } from "./ITreeNode";
import { IVisitor } from "./IVisitor";

export interface IBinaryTreeNode<T> extends ITreeNode<T> {
	children: Array<IBinaryTreeNode<T> | null>;
	left: IBinaryTreeNode<T> | null;
	parent: IBinaryTreeNode<T> | null;
	right: IBinaryTreeNode<T> | null;

	traverseInOrder: (visitor: IVisitor<T>, rest: any) => this;
	traversePostOrder: (visitor: IVisitor<T>, rest: any) => this;
	traversePreOrder: (visitor: IVisitor<T>, rest: any) => this;
}
