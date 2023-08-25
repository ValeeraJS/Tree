import { ITreeNode, ITreeNodeData } from "./interfaces/ITreeNode";
import { IVisitor } from "./interfaces/IVisitor";

const FIND_LEAVES_VISITOR: IVisitor<any> = {
	enter: (node: ITreeNodeData<any>, result: ITreeNodeData<any>[]) => {
		if (!node.children.length) {
			result.push(node);
		}
	}
};

const ARRAY_VISITOR: IVisitor<any> = {
	enter: (node: ITreeNodeData<any>, result: ITreeNodeData<any>[]) => {
		result.push(node);
	}
};

type Constructor<T = Object> = new (...a: any[]) => T;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const mixin = <TBase extends Constructor>(Base?: TBase) => {
	return class TreeNode<T> extends (Base || Object) implements ITreeNode<T> {
		public static mixin = mixin;

		public static addChild<T>(node: ITreeNodeData<T>, child: ITreeNodeData<T>): ITreeNodeData<T> {
			if (TreeNode.hasAncestor(node, child)) {
				throw new Error("The node added is one of the ancestors of current one.");
			}
			node.children.push(child);
			child.parent = node;

			return node;
		}

		public static depth<T>(node: ITreeNodeData<T>): number {
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

		public static findLeaves<T>(node: ITreeNodeData<T>): ITreeNodeData<T>[] {
			const result: ITreeNodeData<T>[] = [];

			TreeNode.traverse(node, FIND_LEAVES_VISITOR, result);

			return result;
		}

		public static findRoot<T>(node: ITreeNodeData<T>): ITreeNodeData<T> {
			if (node.parent) {
				return this.findRoot(node.parent);
			}

			return node;
		}

		public static hasAncestor<T>(node: ITreeNodeData<T>, ancestor: ITreeNodeData<T>): boolean {
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

		public static removeChild<T>(node: ITreeNodeData<T>, child: ITreeNodeData<T>): ITreeNodeData<T> {
			if (node.children.includes(child)) {
				node.children.splice(node.children.indexOf(child), 1);
				child.parent = null;
			}

			return node;
		}

		public static toArray<T>(node: ITreeNodeData<T>): ITreeNodeData<T>[] {
			const result: ITreeNodeData<T>[] = [];

			TreeNode.traverse(node, ARRAY_VISITOR, result);

			return result;
		}

		public static traverse<T>(node: ITreeNodeData<T>, visitor: IVisitor<T>, rest?: any): ITreeNodeData<T> {
			visitor.enter?.(node, rest);
			visitor.visit?.(node, rest);
			for (const item of node.children) {
				item && TreeNode.traverse(item, visitor, rest);
			}
			visitor.leave?.(node, rest);

			return node;
		}
		
		public constructor(...rest: any[]) {
			super(...rest);
		}

		public parent: ITreeNode<T> | null = null;
		public children: Array<ITreeNode<T> | null> = [];

		public addChild(node: ITreeNodeData<T>): this {
			return TreeNode.addChild(this, node) as this;
		}

		public depth(): number {
			return TreeNode.depth(this);
		}

		public findLeaves(): ITreeNodeData<T>[] {
			return TreeNode.findLeaves(this);
		}

		public findRoot(): ITreeNodeData<T> {
			return TreeNode.findRoot(this);
		}

		public hasAncestor(ancestor: ITreeNodeData<T>): boolean {
			return TreeNode.hasAncestor(this, ancestor);
		}

		public removeChild(child: ITreeNodeData<T>): this {
			return TreeNode.removeChild(this, child) as this;
		}

		public toArray(): ITreeNodeData<T>[] {
			return TreeNode.toArray(this);
		}

		public traverse(visitor: IVisitor<T>, rest?: any): this {
			return TreeNode.traverse(this, visitor, rest) as this;
		}
	};
};

export const TreeNode = mixin(Object);
