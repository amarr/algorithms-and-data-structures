/* Binary Search Tree */
(function(global) {
    var LESS = -1;
    var GREATER = 1;
    var EQUAL = 0;

    // Element class
    function Element(key, record) {
        this._key = key;
        this.record = record;
        this._left = null;
        this._right = null;
        this._parent = null;
    }

    Element.prototype = {
        compareTo : function(key) {
            if(key instanceof Element) {
                key = key.key();
            }
            
            if(this.key() < key) {
                return LESS;
            }
            else if(this.key() > key) {
                return GREATER;
            }
            else {
                return EQUAL;
            }
        },

        is : function(el) {
            return this.key() == el.key();
        },

        isLeftChild : function() {
            var l = this.parent().left();
            return l != null && l.is(this);
        },

        isRightChild : function() {
            var r = this.parent().right();
            return r != null && r.is(this);
        },

        key : function() {
            return this._key;
        },

        left : function(el) {
            if(arguments.length == 1) {             
                this._left = el;
                
                if(el != null) {
                    el.parent(this);
                }
            }

            return this._left;
        },

        right : function(el) {
            if(arguments.length == 1) {             
                this._right = el;

                if(el != null) {
                    el.parent(this);
                }
            }

            return this._right;
        },

        parent : function(el) {
            if(arguments.length == 1) {             
                this._parent = el;
            }

            return this._parent;
        },

        hasNoChildren : function() {
            return !this.hasLeftChild() && !this.hasRightChild();
        },

        hasNoParent : function() {
            return this.parent() == null;
        },

        hasLeftChild : function() {
            return this.left() != null;
        },

        hasRightChild : function() {
            return this.right() != null;
        },

        hasOneChild : function() {
            return (this.hasRightChild() && !this.hasLeftChild()) || (!this.hasRightChild() && this.hasLeftChild());
        },

        onlyChild : function() {
            if(this.hasOneChild()) {
                return this.right() != null ? this.right() : this.left();
            }
        },

        replaceWith : function(el) {
            if(this.hasNoParent()) {
                // Do nothing
            }
            else if(this.isLeftChild()) {
                this.parent().left(el);
            }
            else if(this.isRightChild()) {
                this.parent().right(el);
            }

            if(el == null) {
                return;
            }

            el.parent(this.parent());

            if(this.hasLeftChild() && !this.left().is(el)) {
                el.left(this.left());
                this.left().parent(el);
            }

            if(this.hasRightChild() && !this.right().is(el)) {
                el.right(this.right());
                this.right().parent(el);
            }
        },

        rotateRight : function() {
            if(!this.hasLeftChild()) {
                return this;
            }

            var newParent = this.left();

            if(!this.isRoot()) {
                if(this.parent().hasLeftChild() && this.isLeftChild()) {
                    this.parent().left(newParent);
                }
                else if(this.parent().hasRightChild() && this.isRightChild()) {
                    this.parent().right(newParent);
                }
            }

            this.left(newParent.right());

            newParent.parent(this.parent());

            this.parent(newParent);

            newParent.right(this);

            return this;
        },

        rotateLeft : function() {
            if(!this.hasRightChild()) {
                return this;
            }

            var newParent = this.right();

            if(!this.isRoot()) {
                if(this.parent().hasLeftChild() && this.isLeftChild()) {
                    this.parent().left(newParent);
                }
                else if(this.parent().hasRightChild() && this.isRightChild()) {
                    this.parent().right(newParent);
                }
            }

            this.right(newParent.left());

            newParent.parent(this.parent());

            this.parent(newParent);

            newParent.left(this);

            return this;            
        },

        isRoot : function() {
            return this.parent() == null;
        }
    };

    /**
     * BinarySearchTree
     * @type {Class}
     */
    function BinarySearchTree() {
        this._count = 0;
        this._root = null;
        this._replaceMethod = 0;
    };

    BinarySearchTree.prototype = {
        search : function(key, root) {
            if(arguments.length == 1) {
                return this.search(key, this._root);
            }

            if(root == null) {
                return null;
            }

            switch(root.compareTo(key)) {
                case LESS:
                    return this.search(key, root.right());
                    break;
                case GREATER:
                    return this.search(key, root.left());
                    break;
                case EQUAL:
                    return root;
                    break;
            }
        },

        rotateRight : function(el) {
            el.rotateRight();

            if(!el.isRoot() && el.parent().isRoot()) {
                this._root = el.parent();
            }
        },

        rotateLeft : function(el) {
            el.rotateLeft();

            if(!el.isRoot() && el.parent().isRoot()) {
                this._root = el.parent();
            }
        },

        count : function() {
            return this._count;
        },

        insert : function(key) {
            var el = new Element(key);
            if(this._root == null) {
                this._root = el;
                this._count++;
                return el;
            }

            return this._insert(this._root, el);
        },

        _insert : function(root, el) {
            var parent = null;

            switch(root.compareTo(el)) {
                case LESS:
                    parent = root.right();
                    if(parent == null) {
                        this._count++;
                        return root.right(el);
                    }
                    break;
                case GREATER:
                    parent = root.left();
                    if(parent == null) {
                        this._count++;
                        return root.left(el);
                    }
                    break;
                case EQUAL:
                    // Skip duplicate key
                    return;
                    break;
            }

            return this._insert(parent, el);
        },

        remove : function(key) {
            var el = null;

            if(key instanceof Element) {
                el = key;
            }
            else {
                el = this.search(key);
            }

            if(el == null) {
                return null;
            }

            return this._remove(el);
        },

        _remove : function(el) {
            // 0
            if(el.hasNoChildren()) {
                if(el.hasNoParent()) {
                    this._root = null;
                }
                
                this._count--;

                el.replaceWith(null)

                return el;
            }

            // 1
            if(el.hasOneChild()) {
                if(el.hasNoParent()) {
                    this._root = el.onlyChild();
                }

                this._count--;

                el.replaceWith(el.onlyChild());

                return el;
            }

            // 2 - naive
            if(this._replaceMethod == 0) {
                this._replaceMethod = 1;

                if(el.hasNoParent()) {
                    this._root = el.left();
                }

                this._count--;

                el.replaceWith(el.left());
            }
            else {
                this._replaceMethod = 0;

                if(el.hasNoParent()) {
                    this._root = el.right();
                }

                this._count--;

                el.replaceWith(el.right());
            }

            return el;
        },

        root : function() {
            return this._root;
        }
    };

    global.Element = Element;
    global.BinarySearchTree = BinarySearchTree;
})(this);