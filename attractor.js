var Attractor = function(position, mass, radius) {
  this.position = position || new Vector(0, 0);
  this.mass = mass || 1;
  this.radius = radius || 1;

  this.constrain = function(d, min, max) {
    if (d < min) {
      return min;
    }
    else if (d > max) {
      return max;
    }
    return d;
  };
};

Attractor.prototype.display = function() {
  context.beginPath();
  context.arc(this.position.x, this.position.y, this.mass * this.radius, 0, 2 * Math.PI, false);
  context.fillStyle = "rgb(100, 100, 100)";
  context.fill();
  context.strokeStyle = "#000";
  context.stroke();
};

Attractor.prototype.attract = function(mover) {
  var force = Vector.sub(this.position, mover.position);
  var distance = force.mag();
  distance = this.constrain(distance, 5, 25);
  force.normalize();
  var G = 0.4;
  var strength = (G * this.mass * mover.mass) / (distance * distance);
  force.mult(strength);
  return force;
};
