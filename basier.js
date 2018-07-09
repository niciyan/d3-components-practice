var svg = d3.select("svg");

var a = new Victor(20,300);
var b = new Victor(700, 400);
var c = new Victor(200, 100);
var d = new Victor(600, 600);

function draw_line(start, control, end, color){
	var dt = 0.05; 

	for(t=0;t<1;t+=dt){
		var p1 = add(control,t,start,1-t);	
		var p2 = add(end,t,control,1-t);

		svg.append("path")
			.attr("d", path_line(p1.x,p1.y,p2.x,p2.y))
			.attr("stroke",color)
			.attr("stroke-dasharray", "1, 2");
	}
}

draw_line(a,c,d,"blue");
draw_line(c,d,b,"red")

svg.append("path")
	.attr("d", path_curve3( a.x,a.y,c.x,c.y,d.x,d.y,b.x,b.y ))
	.attr("stroke", "black")
	.attr("stroke-width", "4")
	.attr("fill", "none");

svg.append("path")
	.attr("d", path_curve(a.x,a.y,c.x,c.y,d.x,d.y))
	.attr("stroke", "blue")
	.attr("fill", "none");

svg.append("path")
	.attr("d", path_curve(c.x,c.y,d.x,d.y,b.x,b.y))
	.attr("stroke", "red")
	.attr("fill", "none");

add_point(svg, a, "a");
add_point(svg, b, "b");
add_point(svg, c, "c");
add_point(svg, d, "d");

function add_point(svg, vec, name){
	svg.append("circle")
		.attr("cx", vec.x)
		.attr("cy", vec.y)
		.attr("r", 8);
	svg.append("text")
		.attr("x", vec.x)
		.attr("y", vec.y)
		.attr("dx", 0)
		.attr("dy", -20)
		.text(name);
}
function add(vec1,t1,vec2,t2){
	var d = vec1.clone().multiplyScalar(t1).add(vec2.clone().multiplyScalar(t2));
	return d;
}

function path_curve3(x0,y0,x1,y1,x2,y2,x3,y3){
	return "M"+x0+" "+y0+" C"+x1+" "+y1+" "+x2+" "+y2+" "+x3+" "+y3;
}

function path_curve(x0,y0,x1,y1,x2,y2){
	return "M"+x0+" "+y0+" Q"+x1+" "+y1+" "+x2+" "+y2;
}
function translate(x,y){
	return "translate("+x+","+y+")";
}
function path_line(x0,y0,x1,y1){
	return "M"+x0+" "+y0+" L"+x1+" "+y1;
}

