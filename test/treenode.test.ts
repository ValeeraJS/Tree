/* eslint-disable max-nested-callbacks */
import { expect } from "chai";
import { IVisitor } from "../src/interfaces/IVisitor";
import { TreeNode, mixin } from "../src/TreeNode";

describe("treenode api", function () {
	it("addChild:", function () {
		const a = new TreeNode();
		const b = new TreeNode();
		const c = new TreeNode();

		a.addChild(b);
		expect(a.children[0]).to.equal(b);
		b.addChild(c);

		try {
			c.addChild(a);
		} catch (e) {
			expect(e instanceof Error).to.equal(true);
		}
	});
	it("removeChild:", function () {
		const a = new TreeNode();
		const b = new TreeNode();
		const c = new TreeNode();

		a.addChild(b);
		a.removeChild(c);
		expect(a.depth()).to.be.equals(2);
	});
	it("depth:", function () {
		const a = new TreeNode();
		const b = new TreeNode();
		const c = new TreeNode();

		a.addChild(b);
		b.addChild(c);
		expect(a.depth()).to.equal(3);
		b.removeChild(c);
		expect(a.depth()).to.equal(2);
	});
	it("find leaves:", function () {
		const a = new TreeNode();

		expect(a.findLeaves()[0]).to.equal(a);
		const b = new TreeNode();
		const c = new TreeNode();

		a.addChild(b);
		b.addChild(c);
		expect(a.findLeaves()[0]).to.equal(c);
		b.removeChild(c);
		expect(a.findLeaves()[0]).to.equal(b);
	});
	it("find root:", function () {
		const a = new TreeNode();

		expect(a.findRoot()).to.equal(a);
		const b = new TreeNode();
		const c = new TreeNode();

		a.addChild(b);
		b.addChild(c);
		expect(c.findRoot()).to.equal(a);
		b.removeChild(c);
		expect(c.findRoot()).to.equal(c);
	});
	it("hasAncestor:", function () {
		const a = new TreeNode();

		expect(a.hasAncestor(a)).to.equal(false);
		const b = new TreeNode();
		const c = new TreeNode();

		a.addChild(b);
		b.addChild(c);
		expect(c.hasAncestor(a)).to.equal(true);
		b.removeChild(c);
		expect(c.hasAncestor(a)).to.equal(false);
	});
	it("toArray:", function () {
		const a = new TreeNode();
		const b = new TreeNode();
		const c = new TreeNode();

		a.addChild(b);
		b.addChild(c);
		expect(a.toArray().length).to.equal(3);
		expect(b.toArray().length).to.equal(2);
	});
	it("traverse:", function () {
		class NumTree extends TreeNode<any> {
			public data: number;
			public constructor(data: number) {
				super();
				this.data = data;
			}
		}
		const a = new NumTree(1);
		const b = new NumTree(2);
		const c = new NumTree(3);

		a.addChild(b);
		b.addChild(c);

		const result: { sum: number } = { sum: 0 };

		const sumVisitor: IVisitor<NumTree> = {
			enter: (node: any, result: { sum: number }) => {
				result.sum += node.data;
			}
		};

		a.traverse(sumVisitor, result);
		expect(result.sum).to.equal(6);
	});
});

describe("mixin", function () {
	class A {
		aaa() { }
	}
	const B = mixin(A);
	const C = mixin();
	it("addChild:", function () {
		const a = new B();
		const c = new C();
		expect(a instanceof A).to.be.true;
		expect(c.depth()).to.be.equals(1);
	});
});