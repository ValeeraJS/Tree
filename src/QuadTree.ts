import { IRectangle2, Rectangle2 } from "@valeera/mathx";
import { TreeNode } from "./TreeNode";

export type QuadTreeOptions = {
    maxDepth?: number;
    maxObjects?: number;
    boundingRect?: Rectangle2;
    level?: number;
}

const tmpOptions: QuadTreeOptions = {
    maxDepth: Infinity,
    maxObjects: 4,
    boundingRect: new Rectangle2(),
    level: 0,
}

export class QuadTreeNode extends TreeNode<any> {
    readonly maxDepth: number;
    readonly maxObjects: number;
    readonly boundingRect: Rectangle2;

    children: QuadTreeNode[] = [];

    objects: Rectangle2[] = [];
    level = 0;
    constructor(options: QuadTreeOptions) {
        super();
        this.maxDepth = options.maxDepth || Infinity;
        this.maxObjects = options.maxObjects || 4;
        this.boundingRect = options.boundingRect || new Rectangle2([-window.innerWidth * 0.5, -window.innerHeight * 0.5], [window.innerWidth * 0.5, window.innerHeight * 0.5]);
        this.level = options.level ?? 0;
    }

    split() {
        tmpOptions.level = this.level + 1;
        tmpOptions.maxDepth = this.maxDepth;
        tmpOptions.maxObjects = this.maxObjects;

        const arr = Rectangle2.split(this.boundingRect);
        tmpOptions.boundingRect = arr[3];

        this.children[0] = new QuadTreeNode(tmpOptions);

        tmpOptions.boundingRect = arr[2];
        this.children[1] = new QuadTreeNode(tmpOptions);

        tmpOptions.boundingRect = arr[0];
        this.children[2] = new QuadTreeNode(tmpOptions);

        tmpOptions.boundingRect = arr[1];
        this.children[3] = new QuadTreeNode(tmpOptions);
    }

    getIndex(rect: IRectangle2) {

        var indexes = [];
        const center = Rectangle2.center(rect);

        var startIsSouth = rect.min[1] < center.y,
            startIsWest = rect.min[0] < center.x,
            endIsEast = rect.max[0] > center.x,
            endIsNorth = rect.max[1] > center.y;

        if (startIsSouth && endIsEast) {
            indexes.push(3);
        }

        if (startIsWest && startIsSouth) {
            indexes.push(2);
        }

        if (startIsWest && endIsNorth) {
            indexes.push(1);
        }

        if (endIsEast && endIsNorth) {
            indexes.push(0);
        }

        return indexes;
    }

    insert(pRect: Rectangle2) {

        var i = 0,
            indexes;

        //if we have subnodes, call insert on matching subnodes
        if (this.children.length) {
            indexes = this.getIndex(pRect);

            for (i = 0; i < indexes.length; i++) {
                this.children[indexes[i]].insert(pRect);
            }
            return;
        }

        //otherwise, store object here
        this.objects.push(pRect);

        //max_objects reached
        if (this.objects.length > this.maxObjects && this.level < this.maxDepth) {

            //split if we don't already have subnodes
            if (!this.children.length) {
                this.split();
            }

            //add all objects to their corresponding subnode
            for (i = 0; i < this.objects.length; i++) {
                indexes = this.getIndex(this.objects[i]);
                for (var k = 0; k < indexes.length; k++) {
                    this.children[indexes[k]].insert(this.objects[i]);
                }
            }

            //clean up this node
            this.objects = [];
        }
    }

    retrieve(pRect: IRectangle2) {

        var indexes = this.getIndex(pRect),
            returnObjects = this.objects;

        //if we have subnodes, retrieve their objects
        if (this.children.length) {
            for (var i = 0; i < indexes.length; i++) {
                returnObjects = returnObjects.concat(this.children[indexes[i]].retrieve(pRect));
            }
        }

        //remove duplicates
        returnObjects = returnObjects.filter((item, index) => {
            return returnObjects.indexOf(item) >= index;
        });

        return returnObjects;
    }

    clear() {
        this.objects.length = 0;

        for (var i = 0; i < this.children.length; i++) {
            if (this.children.length) {
                this.children[i].clear();
            }
        }

        this.children.length = 0;
    }
}
