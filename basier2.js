var svg = d3.select("svg");

var b = new Victor(20,700);
var a = new Victor(700, 600);
// var a = new Victor(20,700);
// var b = new Victor(700, 600);
var c = new Victor(650, 100);
var d = new Victor(200, 100);

curve = svg.append("path")
            .attr("fill", "none")
            .attr("stroke-width", "4")
            .attr("stroke", "red");

eg = svg.append("path")
    .attr("fill", "none")
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", "1, 2")
    .attr("stroke", "blue");
gi = svg.append("path")
    .attr("fill", "none")
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", "1, 2")
    .attr("stroke", "blue");

fh = svg.append("path")
    .attr("fill", "none")
    .attr("stroke-width", 2)
    .attr("stroke", "purple");

var t = 0;
var dt = 0.005;
(function next(){

    t += dt;
    sin = Math.abs( Math.sin(t) );

    (function (t){
        var e = add(1-t,a,t,b);
        var g = add(1-t,b,t,c);
        var i = add(1-t,c,t,d);

        var f = add(1-t,e,t,g);
        var h = add(1-t,g,t,i);

        var p = add(1-t,f,t,h);

        curve.attr("d", path_curve3(a,e,f,p));
        eg.attr("d", path_line(e,g));
        gi.attr("d", path_line(g,i));
        fh.attr("d", path_line(f,h));

    })(sin);
    
    requestAnimationFrame(next);
})();

add_point(svg, a, "A");
add_point(svg, b, "B");
add_point(svg, c, "C");
add_point(svg, d, "D");

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

function add_line(svg, vec1, vec2){
    svg.append("path")
        .attr("stroke", "black")
        .attr("d", path_line(vec1,vec2));
}

add_line(svg,a,b);
add_line(svg,b,c);
add_line(svg,c,d);


function add(t1,vec1,t2,vec2){
	var d = vec1.clone().multiplyScalar(t1).add(vec2.clone().multiplyScalar(t2));
	return d;
}

function path_curve3(vec1,vec2,vec3,vec4){
	return "M"+vec1.x+" "+vec1.y+" C"+vec2.x+" "+vec2.y+" "+vec3.x+" "+vec3.y+" "+vec4.x+" "+vec4.y;
}

function path_curve(x0,y0,x1,y1,x2,y2){
	return "M"+x0+" "+y0+" Q"+x1+" "+y1+" "+x2+" "+y2;
}
function translate(x,y){
	return "translate("+x+","+y+")";
}
function path_line(vec1, vec2){
	return "M"+vec1.x+" "+vec1.y+" L"+vec2.x+" "+vec2.y;
}

