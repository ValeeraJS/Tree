import { IBinaryTreeNode } from "./interfaces/IBinaryTreeNode";
import { IVisitor } from "./interfaces/IVisitor";
import { TreeNode } from "./TreeNode";

let tmpNode: null | IBinaryTreeNode;

export type IComparer = (currentNode: IBinaryTreeNode, child: IBinaryTreeNode) => boolean;

export abstract class AbstractBinaryTreeNode extends TreeNode implements IBinaryTreeNode {
	public children: Array<AbstractBinaryTreeNode | null> = [null, null];
	public parent: AbstractBinaryTreeNode | null = null;
	private comparer: IComparer;

	public constructor(comparer: IComparer) {
		super();

		this.comparer = comparer;
	}

	public removeChild(node: AbstractBinaryTreeNode): this {
		if (this.children.includes(node)) {
			this.children[this.children.indexOf(node)] = null;
			node.parent = null;
		}

		return this;
	}

	public traverseInorder(visitor: IVisitor<AbstractBinaryTreeNode>, ...rest: any[]): this {
		tmpNode = this.children[0];
		visitor.enter?.(this, rest);
		if (tmpNode) {
			tmpNode.traverseInorder(visitor, ...rest);
		}
		visitor.visit?.(this, rest);
		tmpNode = this.children[1];
		if (tmpNode) {
			tmpNode.traverseInorder(visitor, ...rest);
		}
		visitor.leave?.(this, rest);

		return this;
	}

	public addChild(node: AbstractBinaryTreeNode): this {
		if (this.compare(node)) {
			if (this.children[1]) {
				this.children[1].addChild(node);
			} else {
				if (this.hasAncestor(node)) {
					throw new Error("The node added is one of the ancestors of current one.");
				}
				this.children[1] = node;
				node.parent = this;
			}
		} else {
			if (this.children[0]) {
				this.children[0].addChild(node);
			} else {
				if (this.hasAncestor(node)) {
					throw new Error("The node added is one of the ancestors of current one.");
				}
				this.children[0] = node;
				node.parent = this;
			}
		}

		return this;
	}

	/**
	 * 规定左孩子的对比为false，右孩子的对比为true
	 * @param nodeAdded
	 */
	public compare(nodeAdded: AbstractBinaryTreeNode): boolean {
		return this.comparer(this, nodeAdded);
	}

	public get left(): AbstractBinaryTreeNode | null {
		return this.children[0];
	}

	public set left(node: AbstractBinaryTreeNode | null) {
		tmpNode = this.children[0];
		if (tmpNode) {
			this.removeChild(tmpNode as AbstractBinaryTreeNode);
		}
		this.children[0] = node;

		if (node) {
			node.parent = this;
		}
	}

	public get right(): AbstractBinaryTreeNode | null {
		return this.children[1];
	}

	public set right(node: AbstractBinaryTreeNode | null) {
		tmpNode = this.children[1];
		if (tmpNode) {
			this.removeChild(tmpNode as AbstractBinaryTreeNode);
		}
		this.children[1] = node;

		if (node) {
			node.parent = this;
		}
	}
}
