(function(root) {
	// Element class
	function Element(body) {
		this._body = body;
		this._next = null;
	}

	Element.prototype.next = function(element) {
		if(element === undefined) {
			return this._next;
		}
		else {
			this._next = element;
		}
	}

	Element.prototype.body = function(body) {
		if(body === undefined) {
			return this._body;
		}
		else {
			this._body = body;
		}
	}

	// List class
	function LinkedList() {
		this._head = null;
		this._tail  = null;
	}

	LinkedList.prototype.add = function(value) {
		if(this._head == null) {
			var el = new Element(value);
			this._head = el;
			this._tail = el;
		}
		else {
			this._tail = this.addAfter(this._tail, value);
		}
	}

	LinkedList.prototype.addAfter = function(el, value) {
		var newEl = new Element(value);

		newEl.next(el.next());
		el.next(newEl);

		return newEl;
	}

	LinkedList.prototype.removeAfter = function(el) {
		var removedEl = el.next();

		if(removedEl != null) {
			if(removedEl.next() != null) {
				el.next(removedEl.next());
			}
			else {
				el.next(null);
			}
		}

		return removedEl;
	}

	LinkedList.prototype.head = function() {
		return this._head;
	}

	LinkedList.prototype.empty = function() {
		this._head = null;
		this._tail = null;
	}

	root.LinkedList = LinkedList;
})(this);