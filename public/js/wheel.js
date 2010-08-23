// Creates canvas 320 × 200 at 10, 50
var width = window.innerWidth;
var height = window.innerHeight;
var centerx = width / 2;
var centery = height / 2;
var paper = Raphael(0, 0, width, height);
var radius = Math.min(width, height) / 2 - 20

// Creates circle at x = 50, y = 40, with radius 10
var circle = paper.circle(width / 2, height / 2, radius);
circle.attr("fill", "#444");
circle.attr("stroke-width", 0);

var innerCircle = paper.circle(width / 2, height / 2, radius - 60);
innerCircle.attr("fill", "#000");
innerCircle.attr("stroke-width", 0);

//var rect = paper.rect(centerx - radius, centery - 5, 2 * radius, 10);
//rect.attr("fill", "#FFF");
//rect.attr("stroke-width", 0);
var marker = paper.circle(centerx + radius - 30, centery, 28);
marker.attr("fill", "#84C5FD");
marker.attr("stroke-width", 0);

var el = document.body.getElementsByTagName("svg")[0];

angle = 90;

var move = function(dx, dy) {
  var oldAngle = angle;

  var curx = (this.sx - dx) * -1;
  var cury = this.sy - dy;
  angle = Math.atan(curx / cury) * (180/Math.PI);
  if(cury < 0) {
    angle = angle + 180;
  } else if(curx < 0) {
    angle = angle + 360;
  }
  angle = angle - 90;

  var delta = angle - oldAngle;

  //  rect.rotate(delta);
  el.style["-webkit-transform"] = "rotate(" + angle + "deg)";

  var scrollAmount = Math.ceil(delta * 4);
  if(Math.abs(scrollAmount) > 100) { return; }

  console.log(scrollAmount);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "/?" + scrollAmount, true);
  xmlhttp.send();
};

var up = function() {};
var start = function(dx, dy) {
  this.ox = centerx;
  this.oy = centery;
  this.sx = this.ox - dx;
  this.sy = this.oy - dy;
};

var overlay = paper.rect(0, 0, width, height);
overlay.attr("fill", "transparent");
overlay.attr("stroke-width", 0);

overlay.drag(move, start, up);

