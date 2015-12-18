var Oscillator = function(angle, vel, amp) {
  this.angle = angle;
  this.velocity = vel;
  this.amplitude = amp;
};

Oscillator.prototype.oscillate = function() {
  this.angle.add(this.velocity);
};

Oscillator.prototype.display = function(space) {
  var x = Math.sin(this.angle.x) * this.amplitude.x;
  var y = Math.sin(this.angle.y) * this.amplitude.y;

  context.save();
  context.translate(space.width/2, space.height/2);
  context.beginPath();
  context.arc(x, y, 20, 0, Math.PI * 2);
  context.moveTo(x, y);
  context.lineTo(0, 0);
  context.fillStyle = "rgba(150, 150, 150, .7)";
  context.fill();
  context.restore();
  context.stroke();
};
