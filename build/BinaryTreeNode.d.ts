import { IBinaryTreeNode } from "./interfaces/IBinaryTreeNode";
import { IVisitor } from "./interfaces/IVisitor";
import { TreeNode } from "./TreeNode";
export type IComparer = (currentNode: IBinaryTreeNode, child: IBinaryTreeNode) => boolean;
export declare abstract class AbstractBinaryTreeNode extends TreeNode implements IBinaryTreeNode {
    children: Array<AbstractBinaryTreeNode | null>;
    parent: AbstractBinaryTreeNode | null;
    private comparer;
    constructor(comparer: IComparer);
    removeChild(node: AbstractBinaryTreeNode): this;
    traverseInorder(visitor: IVisitor<AbstractBinaryTreeNode>, ...rest: any[]): this;
    addChild(node: AbstractBinaryTreeNode): this;
    /**
     * 规定左孩子的对比为false，右孩子的对比为true
     * @param nodeAdded
     */
    compare(nodeAdded: AbstractBinaryTreeNode): boolean;
    get left(): AbstractBinaryTreeNode | null;
    set left(node: AbstractBinaryTreeNode | null);
    get right(): AbstractBinaryTreeNode | null;
    set right(node: AbstractBinaryTreeNode | null);
}
