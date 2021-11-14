(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Tree = {}));
})(this, (function (exports) { 'use strict';

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation.

	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */
	/* global Reflect, Promise */

	var extendStatics = function(d, b) {
	    extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	    return extendStatics(d, b);
	};

	function __extends(d, b) {
	    if (typeof b !== "function" && b !== null)
	        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	    extendStatics(d, b);
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}

	function __values(o) {
	    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	    if (m) return m.call(o);
	    if (o && typeof o.length === "number") return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	}

	var FIND_LEAVES_VISITOR = {
	    enter: function (node, result) {
	        if (!node.children.length) {
	            result.push(node);
	        }
	    }
	};
	var ARRAY_VISITOR = {
	    enter: function (node, result) {
	        result.push(node);
	    }
	};
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	var mixin = function (Base) {
	    var _a;
	    if (Base === void 0) { Base = Object; }
	    return _a = /** @class */ (function (_super) {
	            __extends(TreeNode, _super);
	            function TreeNode() {
	                var _this = _super !== null && _super.apply(this, arguments) || this;
	                _this.parent = null;
	                _this.children = [];
	                return _this;
	            }
	            TreeNode.addNode = function (node, child) {
	                if (TreeNode.hasAncestor(node, child)) {
	                    throw new Error("The node added is one of the ancestors of current one.");
	                }
	                node.children.push(child);
	                child.parent = node;
	                return node;
	            };
	            TreeNode.depth = function (node) {
	                var e_1, _a, e_2, _b;
	                if (!node.children.length) {
	                    return 1;
	                }
	                else {
	                    var childrenDepth = [];
	                    try {
	                        for (var _c = __values(node.children), _d = _c.next(); !_d.done; _d = _c.next()) {
	                            var item = _d.value;
	                            item && childrenDepth.push(this.depth(item));
	                        }
	                    }
	                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
	                    finally {
	                        try {
	                            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
	                        }
	                        finally { if (e_1) throw e_1.error; }
	                    }
	                    var max = 0;
	                    try {
	                        for (var childrenDepth_1 = __values(childrenDepth), childrenDepth_1_1 = childrenDepth_1.next(); !childrenDepth_1_1.done; childrenDepth_1_1 = childrenDepth_1.next()) {
	                            var item = childrenDepth_1_1.value;
	                            max = Math.max(max, item);
	                        }
	                    }
	                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
	                    finally {
	                        try {
	                            if (childrenDepth_1_1 && !childrenDepth_1_1.done && (_b = childrenDepth_1.return)) _b.call(childrenDepth_1);
	                        }
	                        finally { if (e_2) throw e_2.error; }
	                    }
	                    return 1 + max;
	                }
	            };
	            TreeNode.findLeaves = function (node) {
	                var result = [];
	                TreeNode.traverse(node, FIND_LEAVES_VISITOR, result);
	                return result;
	            };
	            TreeNode.findRoot = function (node) {
	                if (node.parent) {
	                    return this.findRoot(node.parent);
	                }
	                return node;
	            };
	            TreeNode.hasAncestor = function (node, ancestor) {
	                if (!node.parent) {
	                    return false;
	                }
	                else {
	                    if (node.parent === ancestor) {
	                        return true;
	                    }
	                    else {
	                        return TreeNode.hasAncestor(node.parent, ancestor);
	                    }
	                }
	            };
	            TreeNode.removeNode = function (node, child) {
	                if (node.children.includes(child)) {
	                    node.children.splice(node.children.indexOf(child), 1);
	                    child.parent = null;
	                }
	                return node;
	            };
	            TreeNode.toArray = function (node) {
	                var result = [];
	                TreeNode.traverse(node, ARRAY_VISITOR, result);
	                return result;
	            };
	            TreeNode.traverse = function (node, visitor, rest) {
	                var e_3, _a;
	                visitor.enter && visitor.enter(node, rest);
	                visitor.visit && visitor.visit(node, rest);
	                try {
	                    for (var _b = __values(node.children), _c = _b.next(); !_c.done; _c = _b.next()) {
	                        var item = _c.value;
	                        item && TreeNode.traverse(item, visitor, rest);
	                    }
	                }
	                catch (e_3_1) { e_3 = { error: e_3_1 }; }
	                finally {
	                    try {
	                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	                    }
	                    finally { if (e_3) throw e_3.error; }
	                }
	                visitor.leave && visitor.leave(node, rest);
	                return node;
	            };
	            TreeNode.prototype.addNode = function (node) {
	                return TreeNode.addNode(this, node);
	            };
	            TreeNode.prototype.depth = function () {
	                return TreeNode.depth(this);
	            };
	            TreeNode.prototype.findLeaves = function () {
	                return TreeNode.findLeaves(this);
	            };
	            TreeNode.prototype.findRoot = function () {
	                return TreeNode.findRoot(this);
	            };
	            TreeNode.prototype.hasAncestor = function (ancestor) {
	                return TreeNode.hasAncestor(this, ancestor);
	            };
	            TreeNode.prototype.removeNode = function (child) {
	                return TreeNode.removeNode(this, child);
	            };
	            TreeNode.prototype.toArray = function () {
	                return TreeNode.toArray(this);
	            };
	            TreeNode.prototype.traverse = function (visitor, rest) {
	                return TreeNode.traverse(this, visitor, rest);
	            };
	            return TreeNode;
	        }(Base)),
	        _a.mixin = mixin,
	        _a;
	};
	var TreeNode = mixin(Object);

	var tmpNode;
	var AbstractBinaryTreeNode = /** @class */ (function (_super) {
	    __extends(AbstractBinaryTreeNode, _super);
	    function AbstractBinaryTreeNode() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.children = [null, null];
	        _this.parent = null;
	        return _this;
	    }
	    AbstractBinaryTreeNode.prototype.addNode = function (node) {
	        if (this.compare(node)) {
	            if (this.children[1]) {
	                this.children[1].addNode(node);
	            }
	            else {
	                if (this.hasAncestor(node)) {
	                    throw new Error("The node added is one of the ancestors of current one.");
	                }
	                this.children[1] = node;
	                node.parent = this;
	            }
	        }
	        else {
	            if (this.children[0]) {
	                this.children[0].addNode(node);
	            }
	            else {
	                if (this.hasAncestor(node)) {
	                    throw new Error("The node added is one of the ancestors of current one.");
	                }
	                this.children[0] = node;
	                node.parent = this;
	            }
	        }
	        return this;
	    };
	    Object.defineProperty(AbstractBinaryTreeNode.prototype, "left", {
	        get: function () {
	            return this.children[0];
	        },
	        set: function (node) {
	            tmpNode = this.children[0];
	            if (tmpNode) {
	                this.removeNode(tmpNode);
	            }
	            this.children[0] = node;
	            if (node) {
	                node.parent = this;
	            }
	        },
	        enumerable: false,
	        configurable: true
	    });
	    AbstractBinaryTreeNode.prototype.removeNode = function (node) {
	        if (this.children.includes(node)) {
	            this.children[this.children.indexOf(node)] = null;
	            node.parent = null;
	        }
	        return this;
	    };
	    Object.defineProperty(AbstractBinaryTreeNode.prototype, "right", {
	        get: function () {
	            return this.children[1];
	        },
	        set: function (node) {
	            tmpNode = this.children[1];
	            if (tmpNode) {
	                this.removeNode(tmpNode);
	            }
	            this.children[1] = node;
	            if (node) {
	                node.parent = this;
	            }
	        },
	        enumerable: false,
	        configurable: true
	    });
	    AbstractBinaryTreeNode.prototype.traverseInOrder = function (visitor, rest) {
	        tmpNode = this.children[0];
	        visitor.enter && visitor.enter(this, rest);
	        if (tmpNode) {
	            tmpNode.traverseInOrder(visitor, rest);
	        }
	        visitor.visit && visitor.visit(this, rest);
	        tmpNode = this.children[1];
	        if (tmpNode) {
	            tmpNode.traverseInOrder(visitor, rest);
	        }
	        visitor.leave && visitor.leave(this, rest);
	        return this;
	    };
	    AbstractBinaryTreeNode.prototype.traversePostOrder = function (visitor, rest) {
	        tmpNode = this.children[0];
	        visitor.enter && visitor.enter(this, rest);
	        if (tmpNode) {
	            tmpNode.traversePostOrder(visitor, rest);
	        }
	        tmpNode = this.children[1];
	        if (tmpNode) {
	            tmpNode.traversePostOrder(visitor, rest);
	        }
	        visitor.visit && visitor.visit(this, rest);
	        visitor.leave && visitor.leave(this, rest);
	        return this;
	    };
	    AbstractBinaryTreeNode.prototype.traversePreOrder = function (visitor, rest) {
	        tmpNode = this.children[0];
	        visitor.enter && visitor.enter(this, rest);
	        visitor.visit && visitor.visit(this, rest);
	        if (tmpNode) {
	            tmpNode.traversePreOrder(visitor, rest);
	        }
	        tmpNode = this.children[1];
	        if (tmpNode) {
	            tmpNode.traversePreOrder(visitor, rest);
	        }
	        visitor.leave && visitor.leave(this, rest);
	        return this;
	    };
	    return AbstractBinaryTreeNode;
	}(TreeNode));

	exports.BinaryTreeNode = AbstractBinaryTreeNode;
	exports.TreeNode = TreeNode;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=Tree.legacy.js.map
