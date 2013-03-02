(function(that) {

    var sh = 0;
    var base = 30;

    /**
     * Recursively determine tree height by locating 
     * the tallest branch. 
     * 
     * @param  {[type]} root
     * @return {[type]}
     */
    function treeHeight(root) {
        var _h = 0;

        if(root == null) {
            return _h;
        }

        _h++;

        if(root.hasNoChildren()) {
            return _h;
        }
        else if(root.hasOneChild()) {
            return _h + treeHeight(root.onlyChild());
        }
        else {
            var l = treeHeight(root.left());
            var r = treeHeight(root.right());

            if(l >= r) {
                return _h + l;
            }
            else {
                return _h + r;
            }
        }
    }

    /**
     * Draw a circle
     * 
     * @param  {Paper} paper
     * @param  {Number} x
     * @param  {Number} y
     * @param  {Number} val
     * @return {void}
     */
    function circle(paper, x, y, val) {
        // Creates circle at x = 50, y = 40, with radius 10
        var circle = paper.circle(x, y, 10);
        // Sets the fill attribute of the circle to red (#f00)
        circle.attr("fill", "#f00");

        // Sets the stroke attribute of the circle to white
        circle.attr("stroke", "#000");

        var text = paper.text(x, y);
        text.attr('text', val + '');
    }

    /**
     * Draw a line
     * @param  {Paper} paper
     * @param  {Number} sX
     * @param  {Number} sY
     * @param  {Number} eX
     * @param  {Number} eY
     * @return {void}
     */
    function line(paper, sX, sY, eX, eY) {
        paper.path("M"+sX+" "+sY+"L"+eX+" "+eY).toBack();
    }

    /**
     * Recursively draw the tree one node at a time.
     *
     * Each invocation draws the current root with given 
     * parameters, builds parameters for children and 
     * recurses for each child.
     *
     * Finally it connects the parent and children with 
     * some nice lines.
     * 
     * @param  {Paper} paper canvas
     * @param  {Element} root Node to draw
     * @param  {Number} tHeight Current height in the tree
     * @param  {Number} x Position to draw node
     * @param  {Number} w Offset to determine x for children
     * @return {Array} Containing final x,y of child
     */
    function draw(paper, root, tHeight, x, w) {
        var y = ((base / 1.5) * tHeight);
        var cw = w * (0.5);
        var childHeight = (tHeight + 1);

        var xy;

        if(root.hasLeftChild()) {
            xy = draw(paper, root.left(), childHeight, x - cw, cw);
            line(paper, x, y, xy[0], xy[1]);
        }

        if(root.hasRightChild()) {
            xy = draw(paper, root.right(), childHeight, x + cw, cw);
            line(paper, x, y, xy[0], xy[1]);
        }

        circle(paper, x, y, root.key());

        return [x, y];
    }

    /**
     * Renders a tree
     * 
     * @param  {Tree} tree
     * @return {void}
     */
    function drawTree(tree) {
        var h = treeHeight(tree.root());

        var cW = base * Math.pow(2, (h - 1));
        var cH = base * h;

        // Creates canvas
        if(paper != null) { 
            paper.clear();   
            paper.remove(); 
        }
        
        var paper = Raphael(0, sh, cW, cH);

        draw(paper, tree.root(), 1, cW / 2, cW / 2);

        sh += (cH + 10);
    }

    that.drawTree = drawTree;
})(this);