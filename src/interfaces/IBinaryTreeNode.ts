import ITreeNode from "./ITreeNode";
import IVisitor from "./IVisitor";

export default interface IBinaryTreeNode extends ITreeNode {
	children: Array<IBinaryTreeNode | null>;
	left: IBinaryTreeNode | null;
	parent: IBinaryTreeNode | null;
	right: IBinaryTreeNode | null;

	addNode: (node: IBinaryTreeNode) => this;
	traverseInOrder: (visitor: IVisitor, rest: any) => this;
	traversePostOrder: (visitor: IVisitor, rest: any) => this;
	traversePreOrder: (visitor: IVisitor, rest: any) => this;
}