import IBinaryTreeNode from "./interfaces/IBinaryTreeNode";
import IVisitor from "./interfaces/IVisitor";
import TreeNode from "./TreeNode";
export declare type IComparer = (currentNode: IBinaryTreeNode, child: IBinaryTreeNode) => boolean;
export default abstract class AbstractBinaryTreeNode extends TreeNode implements IBinaryTreeNode {
    children: Array<IBinaryTreeNode | null>;
    parent: IBinaryTreeNode | null;
    private comparer;
    constructor(comparer: IComparer);
    removeChild(node: IBinaryTreeNode): this;
    traverseInOrder(visitor: IVisitor, rest: any): this;
    traversePostOrder(visitor: IVisitor, rest: any): this;
    traversePreOrder(visitor: IVisitor, rest: any): this;
    addChild(node: IBinaryTreeNode): this;
    /**
     * 规定左孩子的对比为false，右孩子的对比为true
     * @param nodeAdded
     */
    compare(nodeAdded: IBinaryTreeNode): boolean;
    get left(): IBinaryTreeNode | null;
    set left(node: IBinaryTreeNode | null);
    get right(): IBinaryTreeNode | null;
    set right(node: IBinaryTreeNode | null);
}
