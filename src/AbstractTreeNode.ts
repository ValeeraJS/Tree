import IAbstractTreeNode from "./interfaces/IAbstractTreeNode";
import IVisitor from "./interfaces/IVisitor";

const FIND_LEAVES_VISITOR: IVisitor<any> = {
    enter: (node: IAbstractTreeNode<any>, result: IAbstractTreeNode<any>[]) => {
        if (!node.children.length) {
            result.push(node);
        }
    }
};

const ARRAY_VISITOR: IVisitor<any> = {
    enter: (node: IAbstractTreeNode<any>, result: IAbstractTreeNode<any>[]) => {
        result.push(node);
    }
};

export default class AbstractTreeNode<T> implements IAbstractTreeNode<T> {
    public parent: IAbstractTreeNode<T> | null = null;
    public children: Array<IAbstractTreeNode<T> | null> = [];

    public addNode(node: IAbstractTreeNode<T>): this {
        if (this.hasAncestor(node)) {
            throw new Error("The node added is one of the ancestors of current one.");
        }
        this.children.push(node);
        node.parent = this;
        return this;
    }

    public depth(node: IAbstractTreeNode<T> = this): number {
        if (!node.children.length) {
            return 1;
        } else {
            let childrenDepth: number[] = [];
            for (let item of node.children) {
                item && childrenDepth.push(this.depth(item));
            }
            let max = 0;
            for(let item of childrenDepth) {
                max = Math.max(max, item);
            }
            return 1 + max;
        }
    }

    public findLeaves(): IAbstractTreeNode<T>[] {
        const result: IAbstractTreeNode<T>[] = [];
        this.traverse(FIND_LEAVES_VISITOR, result);
        return result;
    }

    public findRoot(node: IAbstractTreeNode<T> = this): IAbstractTreeNode<T> {
        if (node.parent) {
            return this.findRoot(node.parent);
        }
        return node;
    }

    public hasAncestor(node: IAbstractTreeNode<T>): boolean {
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

    public removeNode(node: IAbstractTreeNode<T>): this {
        if (this.children.includes(node)) {
            this.children.splice(this.children.indexOf(node), 1);
            node.parent = null;
        }
        return this;
    }

    public traverse(visitor: IVisitor<T>, rest?: any): this {
        visitor.enter && visitor.enter(this, rest);
        visitor.visit && visitor.visit(this, rest);
        for (let item of this.children) {
            item && item.traverse(visitor, rest);
        }
        visitor.leave && visitor.leave(this, rest);
        return this;
    }

    public toArray(): IAbstractTreeNode<T>[] {
        const result: IAbstractTreeNode<T>[] = []
        this.traverse(ARRAY_VISITOR, result);
        return result;
    }
}