var Mover = function(position, mass) {
  this.position = position || new Vector(0, 0);
  this.mass = mass || 1;
  this.w = Math.floor(Math.random() * 3);
  this.velocity = new Vector(0, 0);
  this.acceleration = new Vector(0, 0);

  this.angle = 0;
  this.aVelocity = 0;
  this.aAcceleration = 0;

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

Mover.prototype.applyForce = function(force) {
  var f = Vector.div(force, this.mass);
  this.acceleration.add(f);
};

Mover.prototype.update = function() {
  this.aAcceleration += this.acceleration.x / 10;
  this.aVelocity += this.aAcceleration;
  this.angle += this.constrain(this.aVelocity, -0.1, 0.1);

  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.acceleration.mult(0);
};

Mover.prototype.display = function() {
  context.save();

  context.translate(this.position.x, this.position.y);

  context.rotate(this.angle);

  context.beginPath();
  context.rect((this.w * this.mass)/-2, (this.w * this.mass)/-2, this.w * this.mass, this.w * this.mass);
  context.fillStyle = "rgba(175, 175, 175, .7)";
  context.fill();
  context.strokeStyle = "#000";
  context.stroke();

  context.restore();
};

Mover.prototype.drag = function(liquid) {
  var speed = this.velocity.mag();
  var drag = this.velocity.get();
  var dragMagnitude = liquid.c * speed * speed;

  drag.mult(-1);
  drag.normalize();
  drag.mult(dragMagnitude);

  this.applyForce(drag);
};

Mover.prototype.isInside = function(liquid) {
  if (this.position.x > liquid.x && this.position.x < liquid.x + liquid.w &&
      this.position.y > liquid.y && this.position.y < liquid.y + liquid.h)
  {
    return true;
  }
  else {
    return false;
  }
};

Mover.prototype.attract = function(mover) {
  var force = Vector.sub(this.position, mover.position);
  var distance = force.mag();
  distance = this.constrain(distance, 5, 25);
  force.normalize();
  var G = 0.4;
  var strength = (G * this.mass * mover.mass) / (distance * distance);
  force.mult(strength);
  return force;
};

Mover.prototype.checkEdges = function(width, height) {
  if (this.position.x > width) {
    this.position.x = width;
    this.velocity.x *= -1;
  }
  else if (this.position.x < 0) {
    this.position.x = 0;
    this.velocity.x *= -1;
  }

  if (this.position.y > height) {
    this.position.y = height;
    this.velocity.y *= -1;
  }
};
