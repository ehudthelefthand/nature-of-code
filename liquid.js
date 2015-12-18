var Liquid = function(x, y, w, h, c) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.c = c;
};

Liquid.prototype.display = function() {
  context.rect(this.x, this.y, this.w, this.h);
  context.fillStyle = "rgba(150, 150, 150, .7)";
  context.fill();
};
