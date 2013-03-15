/** MergeSort **/
(function(root) {
    var x = 0;

    function merge(left, right) {
        x++;
        var result = [];

        var i = 0,
            il = left.length,
            j = 0,
            jl = right.length;

        while(i < il && j < jl) {
            if(left[i] < right[j]) {
                result.push(left[i]);
                i++;
            }
            else if(left[i] > right[j]) {
                result.push(right[j]);
                j++;
            }
            else {
                result.push(left[i]);
                result.push(right[j]);
                i++;
                j++;
            }
        }

        if(i < il) {
            return result.concat(left.slice(i));
        }
        else if(j < jl) {
            return result.concat(right.slice(j));
        }
        else {
            return result;
        }
    }

    function sort(numbers) {
        if(numbers.length <= 1) {
            return numbers;
        }

        var left = [],
            right = [];

        var middle = Math.floor(numbers.length / 2);

        left.push.apply(left, numbers.slice(0, middle));
        right.push.apply(right, numbers.slice(middle));

        left = sort(left);
        right = sort(right);

        return merge(left, right);
    }

    function _sort(numbers) {
        var r = sort(numbers);
        console.log(x);
        return r;
    }

    root.mergesort = {
        sort : _sort
    };
})(this);