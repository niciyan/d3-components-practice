var curve = document.getElementById("curve");
var ax = 20;
var ay = 20;
var bx = 400;
var by = 400;
var cx = 500;
var cy = 200;

var t = 0;
var dt = 0.01;

// var ab_x = bx-ax;
// var ab_y = by-ay;

function next(){
	t += dt;
	if (t > 1){
		t = 0;
	}
	ab_x = (1-t)*ax + t*cx;
	ab_y = (1-t)*ay + t*cy;
	dst_x = (1-t)*(1-t)*ax + t*t*bx + 2*t*(1-t)*cx;
	dst_y = (1-t)*(1-t)*ay + t*t*by + 2*t*(1-t)*cy;
	curve.setAttribute("d", path_curve(ax,ay,ab_x,ab_y,dst_x,dst_y));

	requestAnimationFrame(next);
}

function path_curve(x0,y0,x1,y1,x2,y2){
	return "M"+x0+" "+y0+" Q"+x1+" "+y1+" "+x2+" "+y2;
}

next();
