/* Binary Search Tree */
(function(root) {
	var LESS = -1;
	var GREATER = 1;
	var EQUAL = 0;

	// Element class
	function Element(key, record) {
		this._key = key;
		this.record = record;
		this._left = null;
		this._right = null;
	}

	Element.prototype = {
		comapareTo : function(el) {
			if(this.key() < el.key()) {
				return LESS;
			}
			else if(this.key() > el.key()) {
				return GREATER;
			}
			else {
				return EQUAL;
			}
		},

		key : function() {
			return this._key;
		},

		left : function(el) {
			if(arguments.length == 1) {				
				this._left = el;
			}

			return this._left;
		},

		right : function(el) {
			if(arguments.length == 1) {				
				this._right = el;
			}

			return this._right;
		}
	};

	function BinarySearchTree() {
		this._root = null;
	};

	BinarySearchTree.prototype = {
		search : function(key, root) {
			if(arguments.length == 1) {
				return this.search(key, this._root);
			}

			if(root == null) {
				return null;
			}
			else if(root.key() == key) {
				return root;
			}
			else if(root.key() < key) {
				return this.search(key, root.right());
			}
			else if(root.key() > key) {
				return this.search(key, root.left());
			}
		},

		insert : function(key) {
			var el = new Element(key);
			if(this._root == null) {
				this._root = el;
				return el;
			}

			return this._insert(this._root, el);
		},

		_insert : function(root, el) {
			var parent = null;

			switch(root.comapareTo(el)) {
				case LESS:
					parent = root.right();
					if(parent == null) {
						return root.right(el);
					}
					break;
				case GREATER:
					parent = root.left();
					if(parent == null) {
						return root.left(el);
					}
					break;
				case EQUAL:
					// Skip duplicate key
					return;
					break;
			}

			return this._insert(parent, el);
		}
	};

	root.BinarySearchTree = BinarySearchTree;
})(this);