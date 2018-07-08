var curve = document.getElementById("curve");
var point_d = document.getElementById("point_d");
var point_a = document.getElementById("point_a");
var point_p = document.getElementById("point_p");

var ad = document.getElementById("ad");
var pd = document.getElementById("pd");

var t = 0;
var dt = 0.01;

var a = new Victor(20,20);
var b = new Victor(400, 400);
var c = new Victor(500, 200);

point_a.setAttribute("transform", translate(a.x,a.y));

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
		point_p.setAttribute("transform", translate(p.x,p.y));
		ad.setAttribute("d", path_line(a.x,a.y,d.x,d.y));
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
