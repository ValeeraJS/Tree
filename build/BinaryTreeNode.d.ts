import { IBinaryTreeNode } from "./interfaces/IBinaryTreeNode";
import { IVisitor } from "./interfaces/IVisitor";
import { TreeNode } from "./TreeNode";
export type IComparer = (currentNode: IBinaryTreeNode<any>, child: IBinaryTreeNode<any>) => boolean;
export declare abstract class AbstractBinaryTreeNode<T> extends TreeNode<AbstractBinaryTreeNode<T>> implements IBinaryTreeNode<T> {
    children: Array<IBinaryTreeNode<T> | null>;
    parent: IBinaryTreeNode<T> | null;
    private comparer;
    constructor(comparer: IComparer);
    removeChild(node: IBinaryTreeNode<T>): this;
    traverseInOrder(visitor: IVisitor<T>, rest: any): this;
    traversePostOrder(visitor: IVisitor<T>, rest: any): this;
    traversePreOrder(visitor: IVisitor<T>, rest: any): this;
    addChild(node: IBinaryTreeNode<T>): this;
    /**
     * 规定左孩子的对比为false，右孩子的对比为true
     * @param nodeAdded
     */
    compare(nodeAdded: IBinaryTreeNode<T>): boolean;
    get left(): IBinaryTreeNode<T> | null;
    set left(node: IBinaryTreeNode<T> | null);
    get right(): IBinaryTreeNode<T> | null;
    set right(node: IBinaryTreeNode<T> | null);
}
