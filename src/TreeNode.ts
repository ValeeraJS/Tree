import { ITreeNode, ITreeNodeData } from "./interfaces/ITreeNode";
import { IVisitor } from "./interfaces/IVisitor";

const FIND_LEAVES_VISITOR: IVisitor = {
	enter: (node: ITreeNodeData, result: ITreeNodeData[]) => {
		if (!node.children.length) {
			result.push(node);
		}
	}
};

const ARRAY_VISITOR: IVisitor = {
	enter: (node: ITreeNodeData, result: ITreeNodeData[]) => {
		result.push(node);
	}
};

type Constructor<T = Object> = new (...a: any[]) => T;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const mixin = <TBase extends Constructor>(Base: TBase = Object as any) => {
	return class TreeNode extends Base implements ITreeNode {
		public static mixin = mixin;

		public static addChild(node: ITreeNodeData, child: ITreeNodeData): ITreeNodeData {
			if (TreeNode.hasAncestor(node, child)) {
				throw new Error("The node added is one of the ancestors of current one.");
			}
			node.children.push(child);
			child.parent = node;

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

		public static findLeaves(node: ITreeNodeData): ITreeNodeData[] {
			const result: ITreeNodeData[] = [];

			TreeNode.traverse(node, FIND_LEAVES_VISITOR, result);

			return result;
		}

		public static findRoot(node: ITreeNodeData): ITreeNodeData {
			if (node.parent) {
				return this.findRoot(node.parent);
			}

			return node;
		}

		public static hasAncestor(node: ITreeNodeData, ancestor: ITreeNodeData): boolean {
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

		public static removeChild(node: ITreeNodeData, child: ITreeNodeData): ITreeNodeData {
			if (node.children.includes(child)) {
				node.children.splice(node.children.indexOf(child), 1);
				child.parent = null;
			}

			return node;
		}

		public static toArray(node: ITreeNodeData): ITreeNodeData[] {
			const result: ITreeNodeData[] = [];

			TreeNode.traverse(node, ARRAY_VISITOR, result);

			return result;
		}

		public static traverse(node: ITreeNodeData, visitor: IVisitor, rest?: any): ITreeNodeData {
			visitor.enter?.(node, rest);
			visitor.visit?.(node, rest);
			for (const item of node.children) {
				item && TreeNode.traverse(item, visitor, rest);
			}
			visitor.leave?.(node, rest);

			return node;
		}

		public parent: ITreeNode | null = null;
		public children: Array<ITreeNode | null> = [];

		public addChild(node: ITreeNodeData): this {
			return TreeNode.addChild(this, node) as this;
		}

		public depth(): number {
			return TreeNode.depth(this);
		}

		public findLeaves(): ITreeNodeData[] {
			return TreeNode.findLeaves(this);
		}

		public findRoot(): ITreeNodeData {
			return TreeNode.findRoot(this);
		}

		public hasAncestor(ancestor: ITreeNodeData): boolean {
			return TreeNode.hasAncestor(this, ancestor);
		}

		public removeChild(child: ITreeNodeData): this {
			return TreeNode.removeChild(this, child) as this;
		}

		public toArray(): ITreeNodeData[] {
			return TreeNode.toArray(this);
		}

		public traverse(visitor: IVisitor, rest?: any): this {
			return TreeNode.traverse(this, visitor, rest) as this;
		}
	};
};

export const TreeNode = mixin(Object);
