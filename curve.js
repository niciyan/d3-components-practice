var curve = document.getElementById("curve");
var point_d = document.getElementById("point_d");
var point_e = document.getElementById("point_e");
var point_a = document.getElementById("point_a");
var point_b = document.getElementById("point_b");
var point_c = document.getElementById("point_c");
var point_p = document.getElementById("point_p");

var ab = document.getElementById("ab");
var bc = document.getElementById("bc");
var ac = document.getElementById("ac");
var ad = document.getElementById("ad");
var de = document.getElementById("de");
var pd = document.getElementById("pd");

var t = 0;
var dt = 0.01;

var a = new Victor(20,20);
var b = new Victor(400, 400);
var c = new Victor(500, 200);

point_a.setAttribute("transform", translate(a.x,a.y));
point_b.setAttribute("transform", translate(b.x,b.y));
point_c.setAttribute("transform", translate(c.x,c.y));

ab.setAttribute("d", path_line(a.x,a.y,b.x,b.y));
bc.setAttribute("d", path_line(b.x,b.y,c.x,c.y));
ac.setAttribute("d", path_line(a.x,a.y,c.x,c.y));

var svg = d3.select("svg")
for(i=0;i<1;i+=0.05){
	var d = a.clone().multiplyScalar(1-i).add(c.clone().multiplyScalar(i));
	var e = b.clone().multiplyScalar(i).add(c.clone().multiplyScalar(1-i));
	svg.append("path")
		.attr("d", path_line(d.x,d.y,e.x,e.y))
		.attr('stroke', "black")
		.attr("stroke-dasharray", "1, 3");
}

function next(){
	t += dt;
	
	// if (t > 1){
	// 	t = 0;
	// }

	(function(t){
		var d = a.clone().multiplyScalar(1-t).add(c.clone().multiplyScalar(t)) ;
		var e = b.clone().multiplyScalar(t).add(c.clone().multiplyScalar(1-t));
		var p = d.clone().multiplyScalar(1-t).add(e.clone().multiplyScalar(t));
		curve.setAttribute("d", path_curve(a.x,a.y,d.x,d.y,p.x,p.y));
		point_d.setAttribute("transform", translate(d.x,d.y));
		point_e.setAttribute("transform", translate(e.x,e.y));
		point_p.setAttribute("transform", translate(p.x,p.y));
		ad.setAttribute("d", path_line(a.x,a.y,d.x,d.y));
		de.setAttribute("d", path_line(d.x,d.y,e.x,e.y));
		pd.setAttribute("d", path_line(d.x,d.y,p.x,p.y));
	})(Math.abs( Math.sin(t) ));

	requestAnimationFrame(next);
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

next();
