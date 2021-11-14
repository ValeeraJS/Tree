import TreeNode from "./TreeNode";
import IBinaryTreeNode from "./interfaces/IBinaryTreeNode";
import IVisitor from "./interfaces/IVisitor";
export default abstract class AbstractBinaryTreeNode extends TreeNode implements IBinaryTreeNode {
    children: Array<IBinaryTreeNode | null>;
    parent: IBinaryTreeNode | null;
    addNode(node: IBinaryTreeNode): this;
    /**
     * 规定左孩子的对比为false，右孩子的对比为true
     * @param nodeAdded
     */
    abstract compare(nodeAdded: IBinaryTreeNode): boolean;
    get left(): IBinaryTreeNode | null;
    set left(node: IBinaryTreeNode | null);
    removeNode(node: IBinaryTreeNode): this;
    get right(): IBinaryTreeNode | null;
    set right(node: IBinaryTreeNode | null);
    traverseInOrder(visitor: IVisitor, rest: any): this;
    traversePostOrder(visitor: IVisitor, rest: any): this;
    traversePreOrder(visitor: IVisitor, rest: any): this;
}
