var rgbfunc = d3.interpolateRgb("red", "black");

var elements = d3.selectAll("p")
var num = elements.size();

var colorFunc = function(d,i){
	t = i/num;
	d3.select(this).style("color", rgbfunc(t))
		.text(rgbfunc(t))
		// .style("background-color", rgbfunc(1-t)); 
}

elements.each(colorFunc);


