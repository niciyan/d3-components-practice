var family = [
{ name:"nishi", parent:"" },
{ name:"Taka", parent:"nishi"},
{ name:"Suzu", parent:"nishi"},
{ name:"Yuzu", parent:"nishi"},
{ name:"Kevi", parent:"nishi"},
{ name:"Goke", parent:"Yuzu"},
{ name:"Duke", parent:"Goke"},
{ name:"たか", parent:"Goke"},
{ name:"hero", parent:"Goke"},
{ name:"Roger Federer", parent:"Goke"},
{ name:"Federer", parent:"Goke"},
{ name:"Rafael", parent:"Goke"},
{ name:"Zeke", parent:"Yuzu"},
]

var stratify = d3.stratify()
	.id(function(d){return d.name})
	.parentId(function(d){ return d.parent })

var tree = d3.tree()
	.size([700, 700])

var root = stratify(family)
	.sort(function(a,b){ return a.id.localeCompare(b.id) });

tree(root);

var g = d3.select("svg");
var svg = g.append("g")
	.attr("transform", "translate(0,50)");

var link = svg.selectAll().data(root.descendants().slice(1))
	.enter().append("path")
	.attr("stroke", "black")
	.attr("fill", "none")
	.attr("d", function(d){
		return path_curve3(d.parent.x,d.parent.y,d.parent.x,d.parent.y+100,d.x,d.y-100,d.x,d.y);
	})

var node = svg.selectAll().data(root.descendants())
	.enter().append("g")
	.attr("transform", function(d){ return translate(d.x,d.y) });

node.append("circle")
	.attr("stroke", "black")
	.attr("fill", "none")
	.attr("r", 8);

node.append("text")
	.attr("dx", 20)
	.attr("dy", 20)
	.text(function(d){ return d.id; });

function translate(x,y){
	return "translate("+x+","+y+")";
}
function path_curve3(x0,y0,x1,y1,x2,y2,x3,y3){
	return "M"+x0+" "+y0+" C"+x1+" "+y1+" "+x2+" "+y2+" "+x3+" "+y3;
}
