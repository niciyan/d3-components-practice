var family = [
{ name:"nishi",   parent:""     ,value:1280},
{ name:"Taka",    parent:"nishi",value:2226},
{ name:"Suzu",    parent:"nishi",value:3286},
{ name:"Yuzu",    parent:"nishi",value:4242},
{ name:"Kevi",    parent:"nishi",value:5320},
{ name:"Goke",    parent:"Yuzu" ,value:6579},
{ name:"Duke",    parent:"Goke" ,value:7106},
{ name:"たか",    parent:"Goke" ,value:8213},
{ name:"hero",    parent:"Goke" ,value:9904},
{ name:"Roger",   parent:"Goke" ,value:1762 },
{ name:"Federer", parent:"Goke" ,value:1506 },
{ name:"Rafael",  parent:"Goke" ,value:1192 },
{ name:"Zeke",    parent:"Yuzu" ,value:1240 },
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
	.attr("transform", function(d){ return translate(d.x,d.y) })

node.append("circle")
	.attr("stroke", "black")
	.attr("fill", "none")
	.attr("r", 8);

node.append("text")
	.attr("dx", 20)
	.attr("dy", 20)
	.text(function(d){ return d.id; })
	.on("mouseover", start)
	.on("mouseleave", end);

function translate(x,y){
	return "translate("+x+","+y+")";
}
function path_curve3(x0,y0,x1,y1,x2,y2,x3,y3){
	return "M"+x0+" "+y0+" C"+x1+" "+y1+" "+x2+" "+y2+" "+x3+" "+y3;
}
function start(){
	d3.select(this).text(function(d){ return d.parent ? "parent: "+d.parent.id+" id: "+d.id : "id: "+d.id; });
}
function end(){
	d3.select(this).text(function(d){ return d.id; });
}
