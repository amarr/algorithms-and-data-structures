(function(w) {
    var LESS = -1;
    var GREATER = 1;
    var EQUAL = 0;

    var Element = function(n, h) {
        this._key = n;
        this._heap = h;
        this._slot = null;
    };

    Element.prototype = {
        key : function() {
            return this._key;
        },

        slot : function(s) {
            if(arguments.length == 1) {
                this._slot = s;
            }
            else {
                return this._slot;
            }
        },

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

        hasNoChildren : function() {
            return this._heap.count() < (this._slot * 2);
        },

        hasOneChild : function() {
            return this._heap.count() == (this._slot * 2);
        },

        hasTwoChildren : function() {
            return this._heap.count() > (this._slot * 2);
        },

        onlyChild : function() {
            if(this.hasOneChild()) {
                return this._heap.arr[(this._slot * 2) - 1];
            }
            else {
                return null;
            }
        },

        hasLeftChild : function() {
            return this.hasTwoChildren() || this.hasOneChild();
        },

        hasRightChild : function() {
            return this.hasTwoChildren();
        },

        left : function() {
            return this._heap.arr[(this._slot * 2) - 1];
        },

        right : function() {
            return this._heap.arr[(this._slot * 2)];
        }
    };
    
    function Heap(numbers) {
        this.arr = [];

        for(var i = 0, l = numbers.length; i < l; i++) {
            this.insert(numbers[i]);
        }
    };

    Heap.prototype = {
        insert : function(n) {
            var e = new Element(n, this);
            this.arr.push(e);
            e.slot(this.arr.length);

            this.upHeap(this.arr.length);
        },

        remove : function() {
            if(this.arr.length == 0) {
                return null;
            }

            // swap root for last leaf
            this.swap(1, this.arr.length);
            // remove old root
            var el = this.arr.pop();

            if(this.arr.length <= 1) {
                return el;
            }
            
            this.downHeap(1);

            return el;
        },

        upHeap : function(slot) {
            if(slot == 1) {
                return;
            }
            // odd = right
            else if(slot % 2 == 1) {
                var p = (slot - 1 == 0 ? 1 : (slot - 1) / 2);
            }
            // even = left
            else {
                var p = (slot / 2);
            }

            var sE = this.arr[this.s2i(slot)];
            var pE = this.arr[this.s2i(p)];

            if(sE.compareTo(pE) == GREATER) {
                this.swap(slot, p);

                // not at root
                if(p != 1) {
                    this.upHeap(p);
                }
            }
        },

        // Assumes at least parent and one child
        downHeap : function(slot) {
            var e = this.arr[this.s2i(slot)];
            var l = null;
            var r = null;

            if(e.hasLeftChild()) {
                l = e.left();
            }

            if(e.hasRightChild()) {
                r = e.right();
            }

            // Start with left
            if(l.compareTo(r) != LESS) {
                if(l != null && e.compareTo(l) == LESS) {
                    this.swap(slot, slot * 2);

                    if(!e.hasNoChildren()) {
                        this.downHeap(slot * 2);
                    }
                }
                else if(r != null && e.compareTo(r) == LESS) {
                    this.swap(slot, (slot * 2) + 1);

                    if(!e.hasNoChildren()) {
                        this.downHeap((slot * 2) + 1);
                    }
                }
            }
            // Start with right
            else {
                if(r != null && e.compareTo(r) == LESS) {
                    this.swap(slot, (slot * 2) + 1);

                    if(!e.hasNoChildren()) {
                        this.downHeap((slot * 2) + 1);
                    }
                }
                else if(l != null && e.compareTo(l) == LESS) {
                    this.swap(slot, slot * 2);

                    if(!e.hasNoChildren()) {
                        this.downHeap(slot * 2);
                    }
                }
            }
        },

        swap : function(s1, s2) {
            var i1 = this.s2i(s1);
            var i2 = this.s2i(s2);

            var e1 = this.arr[i1];
            var e2 = this.arr[i2];
            
            e1.slot(s2);
            e2.slot(s1);

            this.arr[i1] = e2;
            this.arr[i2] = e1;
        },

        s2i : function(slot) {
            return slot - 1;
        },

        count : function() {
            return this.arr.length;
        },

        root : function() {
            if(this.arr.length > 0) {
                return this.arr[0];
            }
            else {
                return null;
            }
        }
    };

    w.Heap = Heap;
})(this);