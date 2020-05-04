import IAbstractTreeNode from "./interfaces/IAbstractTreeNode";
import IVisitor from "./interfaces/IVisitor";

const FIND_LEAVES_VISITOR: IVisitor = {
	enter: (node: IAbstractTreeNode, result: IAbstractTreeNode[]) => {
		if (!node.children.length) {
			result.push(node);
		}
	}
};

const ARRAY_VISITOR: IVisitor = {
	enter: (node: IAbstractTreeNode, result: IAbstractTreeNode[]) => {
		result.push(node);
	}
};

export default class AbstractTreeNode implements IAbstractTreeNode {
	public parent: IAbstractTreeNode | null = null;
	public children: Array<IAbstractTreeNode | null> = [];

	public addNode(node: IAbstractTreeNode): this {
		if (this.hasAncestor(node)) {
			throw new Error("The node added is one of the ancestors of current one.");
		}
		this.children.push(node);
		node.parent = this;

		return this;
	}

	public depth(node: IAbstractTreeNode = this): number {
		if (!node.children.length) {
			return 1;
		} else {
			const childrenDepth: number[] = [];

			for (const item of node.children) {
				item && childrenDepth.push(this.depth(item));
			}

			let max = 0;

			for (const item of childrenDepth) {
				max = Math.max(max, item);
			}

			return 1 + max;
		}
	}

	public findLeaves(): IAbstractTreeNode[] {
		const result: IAbstractTreeNode[] = [];

		this.traverse(FIND_LEAVES_VISITOR, result);

		return result;
	}

	public findRoot(node: IAbstractTreeNode = this): IAbstractTreeNode {
		if (node.parent) {
			return this.findRoot(node.parent);
		}

		return node;
	}

	public hasAncestor(node: IAbstractTreeNode): boolean {
		if (!this.parent) {
			return false;
		} else {
			if (this.parent === node) {
				return true;
			} else {
				return this.parent.hasAncestor(node);
			}
		}
	}

	public removeNode(node: IAbstractTreeNode): this {
		if (this.children.includes(node)) {
			this.children.splice(this.children.indexOf(node), 1);
			node.parent = null;
		}

		return this;
	}

	public traverse(visitor: IVisitor, rest?: any): this {
		visitor.enter && visitor.enter(this, rest);
		visitor.visit && visitor.visit(this, rest);
		for (const item of this.children) {
			item && item.traverse(visitor, rest);
		}
		visitor.leave && visitor.leave(this, rest);

		return this;
	}

	public toArray(): IAbstractTreeNode[] {
		const result: IAbstractTreeNode[] = [];

		this.traverse(ARRAY_VISITOR, result);

		return result;
	}
}
