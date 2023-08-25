import { IRectangle2, Rectangle2 } from "@valeera/mathx";
import { TreeNode } from "./TreeNode";
export type QuadTreeOptions = {
    maxDepth?: number;
    maxObjects?: number;
    boundingRect?: Rectangle2;
    level?: number;
};
export declare class QuadTreeNode extends TreeNode<any> {
    readonly maxDepth: number;
    readonly maxObjects: number;
    readonly boundingRect: Rectangle2;
    children: QuadTreeNode[];
    objects: Rectangle2[];
    level: number;
    constructor(options: QuadTreeOptions);
    split(): void;
    getIndex(rect: IRectangle2): number[];
    insert(pRect: Rectangle2): void;
    retrieve(pRect: IRectangle2): Rectangle2[];
    clear(): void;
}
