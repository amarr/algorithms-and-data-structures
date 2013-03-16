(function(w) {
    
    function heapsort(numbers) {
        var heap = new Heap(numbers);

        // Can be done inplace with more polish to my heap...
        var sorted = [];

        var el;
        while((el = heap.remove()) != null) {
            sorted.push(el.key());
        }

        return sorted;
    }

    w.heapsort = {
        sort : heapsort
    };
})(this);