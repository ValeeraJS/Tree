import { ITreeNode, ITreeNodeData } from "./interfaces/ITreeNode";
import { IVisitor } from "./interfaces/IVisitor";

const FIND_LEAVES_VISITOR: IVisitor<any> = {
	enter: (node: ITreeNodeData, result: ITreeNodeData[]) => {
		if (TreeNode.isLeaf(node)) {
			result.push(node);
		}
	},
};

const ARRAY_VISITOR: IVisitor<any> = {
	enter: (node: ITreeNodeData, result: ITreeNodeData[]) => {
		result.push(node);
	},
};

type Constructor<T = Object> = new (...a: any[]) => T;

export const mixin = <TBase extends Constructor>(Base: TBase | typeof Object = Object) => {
	return class TreeNode extends Base implements ITreeNode {
		public static mixin = mixin;

		public static addChild<T extends ITreeNodeData>(node: T, child: ITreeNodeData | null): T {
			if (TreeNode.hasAncestor(node, child)) {
				throw new Error("The node added is one of the ancestors of current one.");
			}
			node.children.push(child);
			if (child) {
				child.parent = node;
			}

			return node;
		}

		public static depth(node: ITreeNodeData): number {
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

		public static findLeaves<T extends ITreeNodeData>(node: T): T[] {
			const result: T[] = [];

			TreeNode.traversePreorder(node, FIND_LEAVES_VISITOR, result);

			return result;
		}

		public static findRoot<T extends ITreeNodeData>(node: T): ITreeNodeData {
			if (node.parent) {
				return this.findRoot(node.parent);
			}

			return node;
		}

		public static hasAncestor(node: ITreeNodeData, ancestor: ITreeNodeData | null): boolean {
			if (!node.parent) {
				return false;
			} else {
				if (node.parent === ancestor) {
					return true;
				} else {
					return TreeNode.hasAncestor(node.parent, ancestor);
				}
			}
		}

		public static isLeaf(node: ITreeNodeData): boolean {
			for (let i = 0, len = node.children.length; i < len; i++) {
				if (node.children[i]) {
					return false;
				}
			}
			return true;
		}

		public static removeChild<T extends ITreeNodeData>(node: T, child: T): T {
			if (node.children.includes(child)) {
				node.children.splice(node.children.indexOf(child), 1);
				child.parent = null;
			}

			return node;
		}

		public static toArray<T extends ITreeNodeData>(node: T): T[] {
			const result: T[] = [];

			TreeNode.traversePreorder(node, ARRAY_VISITOR, result);

			return result;
		}

		public static traversePostorder<T extends ITreeNodeData>(node: T, visitor: IVisitor<T>, ...rest: any[]): T {
			visitor.enter?.(node, rest);
			for (const item of node.children) {
				item && TreeNode.traversePostorder(item, visitor, ...rest);
			}
			visitor.visit?.(node, ...rest);
			visitor.leave?.(node, ...rest);

			return node;
		}

		public static traversePreorder<T extends ITreeNodeData>(node: T, visitor: IVisitor<T>, ...rest: any[]): T {
			visitor.enter?.(node, ...rest);
			visitor.visit?.(node, ...rest);
			for (const item of node.children) {
				item && TreeNode.traversePreorder(item, visitor, ...rest);
			}
			visitor.leave?.(node, rest);

			return node;
		}

		public parent: TreeNode | null = null;
		public children: Array<TreeNode | null> = [];

		public addChild(node: ITreeNodeData | null): this {
			return TreeNode.addChild(this, node);
		}

		public depth(): number {
			return TreeNode.depth(this);
		}

		public findLeaves(): TreeNode[] {
			return TreeNode.findLeaves(this);
		}

		public findRoot(): TreeNode {
			return TreeNode.findRoot(this) as TreeNode;
		}

		public hasAncestor(ancestor: TreeNode): boolean {
			return TreeNode.hasAncestor(this, ancestor);
		}

		public isLeaf(): boolean {
			return TreeNode.isLeaf(this);
		}

		public removeChild(child: TreeNode): this {
			return TreeNode.removeChild(this, child) as this;
		}

		public toArray(): TreeNode[] {
			return TreeNode.toArray(this);
		}

		public traversePostorder(visitor: IVisitor<TreeNode>, ...rest: any[]): this {
			return TreeNode.traversePostorder(this, visitor, rest) as this;
		}

		public traversePreorder(visitor: IVisitor<TreeNode>, ...rest: any[]): this {
			return TreeNode.traversePreorder(this, visitor, ...rest) as this;
		}
	};
};

export const TreeNode = mixin(Object);
