import IAbstractTreeNode from "./IAbstractTreeNode";

export default interface IVisitor<T> {
    enter?: (node: IAbstractTreeNode<T>, rest: any) => any;
    visit?: (node: IAbstractTreeNode<T>, rest: any) => any;
    leave?: (node: IAbstractTreeNode<T>, rest: any) => any;
}
