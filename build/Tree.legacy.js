(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.Tree = {}));
}(this, (function (exports) { 'use strict';

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */
	/* global Reflect, Promise */

	var extendStatics = function(d, b) {
	    extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return extendStatics(d, b);
	};

	function __extends(d, b) {
	    extendStatics(d, b);
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}

	function __values(o) {
	    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
	    if (m) return m.call(o);
	    return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
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
	var AbstractTreeNode = /** @class */ (function () {
	    function AbstractTreeNode() {
	        this.parent = null;
	        this.children = [];
	    }
	    AbstractTreeNode.prototype.addNode = function (node) {
	        if (this.hasAncestor(node)) {
	            throw new Error("The node added is one of the ancestors of current one.");
	        }
	        this.children.push(node);
	        node.parent = this;
	        return this;
	    };
	    AbstractTreeNode.prototype.depth = function (node) {
	        var e_1, _a, e_2, _b;
	        if (node === void 0) { node = this; }
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
	    AbstractTreeNode.prototype.findLeaves = function () {
	        var result = [];
	        this.traverse(FIND_LEAVES_VISITOR, result);
	        return result;
	    };
	    AbstractTreeNode.prototype.findRoot = function (node) {
	        if (node === void 0) { node = this; }
	        if (node.parent) {
	            return this.findRoot(node.parent);
	        }
	        return node;
	    };
	    AbstractTreeNode.prototype.hasAncestor = function (node) {
	        if (!this.parent) {
	            return false;
	        }
	        else {
	            if (this.parent === node) {
	                return true;
	            }
	            else {
	                return this.parent.hasAncestor(node);
	            }
	        }
	    };
	    AbstractTreeNode.prototype.removeNode = function (node) {
	        if (this.children.includes(node)) {
	            this.children.splice(this.children.indexOf(node), 1);
	            node.parent = null;
	        }
	        return this;
	    };
	    AbstractTreeNode.prototype.traverse = function (visitor, rest) {
	        var e_3, _a;
	        visitor.enter && visitor.enter(this, rest);
	        visitor.visit && visitor.visit(this, rest);
	        try {
	            for (var _b = __values(this.children), _c = _b.next(); !_c.done; _c = _b.next()) {
	                var item = _c.value;
	                item && item.traverse(visitor, rest);
	            }
	        }
	        catch (e_3_1) { e_3 = { error: e_3_1 }; }
	        finally {
	            try {
	                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	            }
	            finally { if (e_3) throw e_3.error; }
	        }
	        visitor.leave && visitor.leave(this, rest);
	        return this;
	    };
	    AbstractTreeNode.prototype.toArray = function () {
	        var result = [];
	        this.traverse(ARRAY_VISITOR, result);
	        return result;
	    };
	    return AbstractTreeNode;
	}());

	var TreeNode = /** @class */ (function (_super) {
	    __extends(TreeNode, _super);
	    function TreeNode(data) {
	        var _this = _super.call(this) || this;
	        _this.parent = null;
	        _this.data = null;
	        _this.children = [];
	        _this.data = data;
	        return _this;
	    }
	    return TreeNode;
	}(AbstractTreeNode));

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
	        enumerable: true,
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
	        enumerable: true,
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

	exports.AbstractBinaryTreeNode = AbstractBinaryTreeNode;
	exports.AbstractTreeNode = AbstractTreeNode;
	exports.TreeNode = TreeNode;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
