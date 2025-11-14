// index.js
window.onload = function() {
  const canvas = document.createElement("canvas");
  canvas.id = "canvas-bg";
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.zIndex = "-1"; // detrás del contenido
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  class Star {
    constructor() { this.reset(true); }

    reset(initial = false) {
      // Aparecen en borde superior o lado derecho
      if (initial) {
        if (Math.random() < 0.5) {
          this.x = Math.random() * canvas.width;
          this.y = 0;
        } else {
          this.x = canvas.width;
          this.y = Math.random() * canvas.height;
        }
      } else {
        if (Math.random() < 0.5) {
          this.x = Math.random() * canvas.width;
          this.y = 0;
        } else {
          this.x = canvas.width + Math.random() * 50;
          this.y = Math.random() * canvas.height;
        }
      }

      this.speed = 2 + Math.random() * 3;
      this.length = 15 + Math.random() * 25; // longitud de estela
      this.opacity = 0.3 + Math.random() * 0.7;

      // Dirección fija: hacia abajo a la izquierda
      this.dx = this.speed;
      this.dy = this.speed * 0.3;

      this.trail = [];
    }

    draw(ctx) {
      // Añadir posición actual al trail
      this.trail.push({x: this.x, y: this.y});
      if (this.trail.length > this.length) this.trail.shift();

      // Dibujar estela difuminada
      for (let i = 0; i < this.trail.length - 1; i++) {
        const p1 = this.trail[i];
        const p2 = this.trail[i + 1];
        const alpha = (i / this.trail.length) * this.opacity; // gradual
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Cabeza de la estrella más brillante
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${this.opacity + 0.3})`;
      ctx.fill();

      // Mover estrella manteniendo dirección
      this.x -= this.dx;
      this.y += this.dy;

      // Reiniciar si sale de pantalla
      if (this.x < 0 || this.y > canvas.height) this.reset();
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
