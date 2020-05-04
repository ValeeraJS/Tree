import IAbstractTreeNode from "./IAbstractTreeNode";
export default interface IVisitor {
    enter?: (node: IAbstractTreeNode, rest: any) => any;
    visit?: (node: IAbstractTreeNode, rest: any) => any;
    leave?: (node: IAbstractTreeNode, rest: any) => any;
}
