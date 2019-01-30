(function() {
	// PARTICLES
	var canvas = document.getElementById("room");
	var ctx = canvas.getContext("2d");

	var numberOfParticles = 120;
	var pageW = window.innerWidth;
	var pageH = window.innerHeight;
	canvas.width = pageW;
	canvas.height = pageH;

	var dust = [];

	for (i = 0; i < numberOfParticles; i++) {
	  dust.push(new createSpec());
	}

	function createSpec() {
	  this.x = Math.random() * pageW;
	  this.y = Math.random() * pageH;
	  this.radius = Math.random() * (20) + 5;
	  this.radiusFloor = this.radius - (.25 * this.radius);
	  this.radiusCeiling = this.radius + (.25 * this.radius);
	  if(Math.random() > 0.5) {
	    this.fade = false;
	  } else {
	    this.fade = true
	  }
	  this.fadeOpacity = 0.8;
	  this.returnYStart = function() {
	    return this.y;
	  };
	  this.yStart = this.returnYStart();

	  this.animateSpeed = Math.random() * (.1 - .01) + .05;
	  this.moveX = Math.random() * 2;
	  this.xLeft = Math.random() * 1;
	  this.yMaxArch = Math.random() * 100 + 100;
	  this.yAmountLeft = 1;
	  this.moveY = this.yAmountLeft;
	}

	function onresize() {
	  pageW = window.innerWidth;
	  pageH = window.innerHeight;
	  canvas.width = pageW;
	  canvas.height = pageH;
	  
	}

	function updateSpec(spec) {
	  if (spec.xLeft > 0.5) {
	    spec.x += spec.moveX;
	  }
	  if (spec.xLeft < 0.5) {
	    spec.x -= spec.moveX;
	  }
	  if (spec.x > pageW || spec.x < 0) {
	    spec.moveX *= -1;
	  }

	  var yCurrentOffSet = Math.abs(spec.y - spec.yStart);
	  var yArchRatio = yCurrentOffSet / spec.yMaxArch;

	  if (spec.fade && yArchRatio >= 0.75 && spec.moveY > 0.15) {
	    spec.moveY += -0.05;
	  }
	  if (!spec.fade && (yArchRatio >= 0.75 || spec.moveY >= -1)) {
	    spec.moveY += -0.05;
	  }
	  //   slow down spec on meeting yArch basement
	  if (!spec.fade && (yArchRatio <= 0.25) && spec.moveY < -0.15) {
	    spec.moveY += 0.05;
	  }
	  //   speed up spec when leaving yArch basement
	  if (spec.fade && (yArchRatio <= 0.25 || spec.moveY <= 1)) {
	    spec.moveY += 0.05;
	  }

	  if (yCurrentOffSet > spec.yMaxArch) {
	    spec.moveY *= -1;
	  }
	  spec.y += spec.moveY;
	  // console.log(spec.moveY + ' MoveY \n' + yArchRatio + ' yArchRatio \n' + spec.fade);
	}

	function removeDust(dustIndex) {
	  dust.splice(dustIndex, 1);
	  console.log(dust);
	}

	function resizeSpec(spec) {
	  if (spec.fade && spec.radius > spec.radiusFloor) {
	    spec.radius -= spec.animateSpeed;
	    if (spec.fadeOpacity > 0.2) {
	      spec.fadeOpacity -= 0.05;
	    }
	  } else if (!spec.fade && spec.radius <= spec.radiusCeiling) {
	    spec.radius += spec.animateSpeed;
	    if (spec.fadeOpacity <= 0.8) {
	      spec.fadeOpacity += 0.05;
	    }
	  } else if (spec.radius < spec.radiusFloor) {
	    spec.radius += spec.animateSpeed;
	    spec.fade = false;
	    spec.animateSpeed = Math.random() * (.1 - .01) + .05;
	  } else if (spec.radius > spec.radiusCeiling) {
	    spec.radius -= spec.animateSpeed;
	    spec.fade = true;
	  }
	}

	function draw() {
	  window.addEventListener('resize', onresize);
	  ctx.clearRect(0, 0, pageW, pageH);
	  for (var t = 0; t < dust.length; t++) {
	    var s = dust[t];
	    ctx.beginPath();

	    var gradient = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius);
	    gradient.addColorStop(0, "rgba(234, 219, 190, " + s.fadeOpacity + ")");
	    gradient.addColorStop(0.4, "rgba(210, 199, 170, " + (s.fadeOpacity - 0.3) + ")");
	    gradient.addColorStop(0.6, 'rgba(150, 122, 108, 0.000)');

	    ctx.fillStyle = gradient;
	    ctx.arc(s.x, s.y, s.radius, Math.PI * 2, false);
	    ctx.fill();

	    resizeSpec(s);
	    updateSpec(s);
	  }
	}

	function getCanvasLocation(e) {
	  var mouseX = e.clientX;
	  var mouseY = e.clientY;
	  for (var i = 0; i < dust.length; i++) {
	    var dustX = dust[i].x;
	    var dustY = dust[i].y;
	    if ((dustX <= mouseX + 10 && dustX >= mouseX - 10) && (dustY <= mouseY + 10 && dustY >= mouseY - 10)) {
	      console.log(dust[i]);
	      dust[i].radius *= 2;
	      console.log(dust);
	      removeDust(i);
	    }
	  }
	}
	window.addEventListener('click', function(e) {
	  getCanvasLocation(e);
	});

	setInterval(draw, 1000 / 60);
}());