(function(root) {
	/**
	 * @method sort
	 */
	function sort(numbers) {
		if(numbers.length <= 1) {
			return numbers;
		}

		var pivot = Math.floor(numbers.length / 2);
		var pivotVal = numbers[pivot];

		var same = [pivotVal];
		var less = [];
		var more = [];

		// Divide
		for(var i = 0, l = numbers.length; i < l; i++) {
			if(i == pivot) {
				continue;
			}
			// Less
			else if(numbers[i] < pivotVal) {
				less.push(numbers[i]);
			}
			// More
			else if(numbers[i] > pivotVal) {
				more.push(numbers[i]);
			}
			// Equal
			else {
				same.push(numbers[i]);
			}
		}

		// Conquer!
		return sort(less).concat(same).concat(sort(more));
	}

	root.quicksort = {
		sort : sort
	}
})(this);