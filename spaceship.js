var SpaceShip = function(position) {
  this.position = position || new Vector(0,0);
  this.w = 10;
  this.h = 30;
  this.angle = 0;
  this.acceleration = new Vector(0, 0);
  this.velocity = new Vector(0, 0);
  this.damping = 0.995;
  this.topspeed = 6;
};

SpaceShip.prototype.turn = function(a) {
  this.angle = a;
};

SpaceShip.prototype.thrust = function() {
  var angle = this.position.mag();
  var force = new Vector(Math.cos(angle), Math.sin(angle));
  force.mult(0.1);
  this.applyForce(force);
};

SpaceShip.prototype.applyForce = function(f) {
  this.acceleration.add(f.get());
};

SpaceShip.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.velocity.mult(this.damping);
  this.velocity.limit(this.topspeed);
  this.position.add(this.velocity);
  this.acceleration.mult(0);
};

SpaceShip.prototype.display = function() {
  context.save();
  context.translate(this.position.x, this.position.y);
  context.rotate(this.angle);

  context.beginPath();
  context.moveTo(0, this.h/-2);
  context.lineTo(this.w/2, this.h/2);
  context.lineTo(this.w/-2, this.h/2);
  context.lineTo(0, this.h/-2);
  context.closePath();

  context.strokeStyle = "white";
  context.lineWidth = 1;
  context.fillStyle = "white";
  context.fill();
  context.stroke();

  context.restore();
};
