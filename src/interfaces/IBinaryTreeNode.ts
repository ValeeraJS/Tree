import { ITreeNode } from "./ITreeNode";
import { IVisitor } from "./IVisitor";

export interface IBinaryTreeNode extends ITreeNode {
	children: Array<IBinaryTreeNode | null>;
	left: IBinaryTreeNode | null;
	parent: IBinaryTreeNode | null;
	right: IBinaryTreeNode | null;

	traverseInorder: (visitor: IVisitor<IBinaryTreeNode>, ...rest: any) => this;
}
