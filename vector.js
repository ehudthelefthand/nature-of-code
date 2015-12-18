var Vector = function(x, y) {
  this.x = x;
  this.y = y;
};

Vector.prototype.add = function(v) {
  this.x += v.x;
  this.y += v.y;
};

Vector.prototype.sub = function(v) {
  this.x -= v.x;
  this.y -= v.y;
};

Vector.prototype.mult = function(n) {
  this.x *= n;
  this.y *= n;
};

Vector.prototype.div = function(n) {
  this.x = this.x / n;
  this.y = this.y / n;
};

Vector.prototype.mag = function() {
  return Math.sqrt((this.x * this.x) + (this.y * this.y))
};

Vector.prototype.normalize = function() {
  var mag = this.mag();
  if (mag !== 0) {
    this.div(mag);
  }
};

Vector.prototype.limit = function(max) {
  if (this.mag() > max) {
    this.normalize();
    this.mult(max);
  }
};

Vector.prototype.get = function() {
  return new Vector(this.x, this.y);
};

Vector.add = function(v1, v2) {
  var v = new Vector(v1.x + v2.x, v1.y + v2.y);
  return v;
};

Vector.sub = function(v1, v2) {
  var v = new Vector(v1.x - v2.x, v1.y - v2.y);
  return v;
};

Vector.mult = function(v, n) {
  var _v = new Vector(v.x * n, v.y * n);
  return _v;
};

Vector.div = function(v, n) {
  var _v = new Vector(v.x / n, v.y / n);
  return _v;
};
