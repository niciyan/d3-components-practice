var t = 0;
var dt = 0.01;
var circle = document.getElementById("circle-move");
var line = document.getElementById("line-move");
var items = document.getElementById("simple");
var div_line = document.getElementById("div-line");
var text = items.querySelector(".p01");
var b1 = items.querySelector(".b01");
var x_orig = 50;
var y_orig = 350;

function rad(angle){
	return angle/180*Math.PI;
}

var svg = d3.select('#simple');

for ( i=0;i<360;i+=30 ){
	theta = rad(i);
	x = 20+300*( Math.cos(theta)+1 );
	y = 20+100*( Math.sin(theta)+1 );
	svg.append("path")
		.attr("d", path_line(320,120,x,y))
		.attr("stroke", "black")
		.attr("stroke-dasharray", "1, 3");
	svg.append("circle")
		.attr("cx", x)
		.attr("cy", y)
		.attr("r", 6)
		.attr("stroke", "black")
		.attr("stroke-dasharray", "1, 2")
		.attr("fill", "none");
}

(
 function next() {
	 t += dt;
	 // if ( t > 6.3 ) {
		 // return;
	 // }

	 x = 300 * ( Math.cos(t) + 1);
	 y = 100 * ( Math.sin(t) + 1);

	 abs_x = 20 + x;
	 abs_y = 20 + y;

	 bx = ( abs_x + x_orig ) / 2;
	 by = ( abs_y + y_orig ) / 2;

	 div = -1 * ( abs_y - y_orig ) / ( abs_x - x_orig );

	 circle.setAttribute("transform", "translate(" + x + ","+ y + ")");
	 line.setAttribute("d", "M50 350 " + "L " + abs_x + " " + abs_y);
	 text.innerHTML = "( " + Math.round( abs_x ) + ", " + Math.round( abs_y ) + ")";
	 div_line.setAttribute("transform", "translate(" + bx + ","+ by + ")");

	 b1.innerHTML = "div: " + div;

	 requestAnimationFrame(next);
 }
)();

var a = document.getElementById("a");
var point_a = document.getElementById("point_a");
var point_b = document.getElementById("point_b");
var point_c = document.getElementById("point_c");
var a_text = document.getElementById("a_text");
var b_text = document.getElementById("b_text");
var c_text = document.getElementById("c_text");
var line_ab = document.getElementById("ab");
var line_ac = document.getElementById("ac");
var line_bc = document.getElementById("bc");
var i = 0;
var di = 0.01;

line_bc.setAttribute("d", path_line(100,100,300,300));

b_text.innerHTML = point_text("B",100,100);
c_text.innerHTML = point_text("C",300,300);
point_b.setAttribute("transform",translate(100,100));
point_c.setAttribute("transform",translate(300,300));

(function next(){
	i += di;
	c_x = 400*( Math.sin(i)+1 );
	c_y = 100*( Math.sin(i)+1 );
	a_text.innerHTML = point_text("A",c_x,c_y);

	a.setAttribute("d", "M100 100 "+"Q"+c_x +" "+c_y+" "+"300 300");
	line_ab.setAttribute("d", path_line(100,100,c_x,c_y));
	line_ac.setAttribute("d", path_line(c_x,c_y,300,300));

	point_a.setAttribute("transform",translate(c_x,c_y));

	requestAnimationFrame(next);
})()

function translate(x,y){
	return "translate("+x+","+y+")";
}

function path_line(x0,y0,x1,y1){
	return "M"+x0+" "+y0+" L"+x1+" "+y1;
}

function point_text(name,x,y){
	return name+":"+"( "+Math.round(x)+","+Math.round(y)+" )";
}
