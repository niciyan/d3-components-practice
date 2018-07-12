var family = [
{ name:"nishi",   parent:"",      value:1 },
{ name:"Taka",    parent:"nishi", value:2 },
{ name:"Suzu",    parent:"nishi", value:2 },
{ name:"Yuzu",    parent:"nishi", value:4 },
{ name:"Kevi",    parent:"nishi", value:2 },
{ name:"Goke",    parent:"Yuzu",  value:6 },
{ name:"Duke",    parent:"Goke",  value:6 },
{ name:"たか",    parent:"Goke",  value:6 },
{ name:"hero",    parent:"Goke",  value:6 },
{ name:"Roger",   parent:"Goke",  value:6  },
{ name:"Federer", parent:"Goke",  value:6  },
{ name:"Rafael",  parent:"Goke",  value:6  },
{ name:"Zeke",    parent:"Yuzu",  value:130 },
]


var svg = d3.select("body")
    .append("svg")
    .attr("width", 700)
    .attr("height", 700)
    .attr("viewbox", "0 0 700 700");

var stratify = d3.stratify()
	.id(function(d){return d.name})
	.parentId(function(d){ return d.parent })

var pack = d3.pack()
	.size([600, 600]);

var root = stratify(family)
    .sum(function(d){ return d.value; })
	.sort(function(a,b){ return a.id.localeCompare(b.id) });

pack(root);

var g = svg.append("g")
	.attr("transform", "translate(0,50)");

// var link = g.selectAll().data(root.descendants())
// 	.enter().append("path")
// 	.attr("stroke", "black")
// 	.attr("fill", "none")
// 	.attr("d", function(d){
// 		return path_line(d.parent.x,d.parent.y,d.x,d.y);
// 	})

var node = g.selectAll().data(root.descendants())
	.enter().append("g")
	.attr("transform", function(d){ return translate(d.x,d.y) });

node.append("circle")
	.attr("stroke", "black")
	.attr("fill", "none")
	.attr("r", function(d){ return d.r; });

node.filter(function(d){ return !d.children; }).append("text")
	.attr("dx", -20)
	// .attr("dy", 20)
	.text(function(d){ return d.id; });

function path_line(x0,y0,x1,y1){
	return "M"+x0+" "+y0+" L"+x1+" "+y1;
}
function translate(x,y){
	return "translate("+x+","+y+")";
}
function path_curve3(x0,y0,x1,y1,x2,y2,x3,y3){
	return "M"+x0+" "+y0+" C"+x1+" "+y1+" "+x2+" "+y2+" "+x3+" "+y3;
}

