window.onload = function() {
  const canvas = document.createElement("canvas");
  canvas.id = "canvas-bg";
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.zIndex = "-1";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  class Star {
  constructor() {
    this.isMeteor = Math.random() < 0.15;
    this.initRandomPosition();
  }

  initRandomPosition() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.speed = 2 + Math.random() * 3;
    this.length = 15 + Math.random() * 25;
    this.opacity = this.isMeteor 
      ? 0.8 + Math.random() * 0.2 
      : 0.3 + Math.random() * 0.5;

    this.dx = this.speed;
    this.dy = this.speed * 0.3;

    this.color = this.isMeteor
      ? `rgba(${200 + Math.random()*55},${200 + Math.random()*55},255,`
      : `rgba(255,255,255,`;
    this.trail = [];
  }

  reset() {
    if (Math.random() < 0.5) {
      this.x = Math.random() * canvas.width;
      this.y = 0;
    } else {
      this.x = canvas.width;
      this.y = Math.random() * canvas.height;
    }

    this.speed = 2 + Math.random() * 3;
    this.length = 15 + Math.random() * 25;

    this.opacity = this.isMeteor 
      ? 0.8 + Math.random() * 0.2 
      : 0.3 + Math.random() * 0.5;

    this.dx = this.speed;
    this.dy = this.speed * 0.3;

    this.color = this.isMeteor
      ? `rgba(${200 + Math.random()*55},${200 + Math.random()*55},255,`
      : `rgba(255,255,255,`;

    this.trail = [];
  }

  draw(ctx) {
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > this.length) this.trail.shift();

    for (let i = 0; i < this.trail.length - 1; i++) {
      const p1 = this.trail[i];
      const p2 = this.trail[i + 1];
      const alpha = (i / this.trail.length) * this.opacity;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = `${this.color}${alpha})`;
      ctx.lineWidth = this.isMeteor ? 3 : 2;
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.isMeteor ? 4 : 3, 0, Math.PI * 2);
    ctx.fillStyle = `${this.color}${this.opacity + 0.3})`;
    ctx.fill();

    this.x -= this.dx;
    this.y += this.dy;

    const last = this.trail[0];
    if (last && (last.x < -50 || last.y > canvas.height + 50)) {
      this.reset();
    }
  }
}

  const stars = [];
  for (let i = 0; i < 150; i++) stars.push(new Star());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => star.draw(ctx));
    requestAnimationFrame(animate);
  }

  animate();
};
