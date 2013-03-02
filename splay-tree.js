(function(global) {

    /**
     * @class SplayTree
     * @constructor
     * @extends {BinarySearchTree}
     */
    function SplayTree() {}

    SplayTree.prototype = new global.BinarySearchTree();
    SplayTree.prototype.constructor = SplayTree;

    _.extend(SplayTree.prototype, {
        super : global.BinarySearchTree.prototype,

        insert : function(key) {
            var el = this.super.insert.call(this, key);

            while(!el.isRoot()) {
                this.splay(el);
            }

            return el;
        },

        remove : function(key) {
            var el = this.super.remove.call(this, key);

            if(el != null) {
                while(!el.parent().isRoot()) {
                    this.splay(el.parent());
                }
            }

            return el;
        },

        splay : function(el) {
            if(el.isRoot()) {
                return el;
            }

            // parent is root
            var zig = function() {
                if(el.isLeftChild()) {
                    this.rotateRight(el.parent());
                }
                else {
                    this.rotateLeft(el.parent());
                }
            };

            // parent not root and both are left or right
            // Rotate grandparent then parent
            var zigzig = function() {
                if(el.isLeftChild()) {
                    this.rotateRight(el.parent().parent());
                    this.rotateRight(el.parent());
                }
                else {
                    this.rotateLeft(el.parent().parent());
                    this.rotateLeft(el.parent());
                }
            };

            // parent not root and both are opposites
            var zigzag = function() {
                // Rotate first parent
                if(el.isLeftChild()) {
                    this.rotateRight(el.parent());
                }
                else {
                    this.rotateLeft(el.parent());
                }

                // Rotate next parent
                if(el.isLeftChild()) {
                    this.rotateRight(el.parent());
                }
                else {
                    this.rotateLeft(el.parent());
                }
            }

            if(el.parent().isRoot()) {
                zig.call(this);
            }
            else if(el.isLeftChild() && el.parent().isLeftChild()) {
                zigzig.call(this);
            }
            else if(el.isRightChild() && el.parent().isRightChild()) {
                zigzig.call(this);
            }
            else {
                zigzag.call(this);
            }

            return el;
        }
    });

    global.SplayTree = SplayTree;

})(this);