 class Star {
  x: number = 0;
  y: number = 0;
  length: number = 0;
  speed: number = 0;
  opacity: number = 0;

  dx: number = 0;
  dy: number = 0;

  isMeteor: boolean;
  trail: { x: number; y: number }[] = [];
  color: string = "";

  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.isMeteor = Math.random() < 0.15;
    this.initRandomPosition();
  }

  initRandomPosition(): void {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;

    this.speed = 2 + Math.random() * 3;
    this.length = 15 + Math.random() * 25;
    this.opacity = this.isMeteor
      ? 0.8 + Math.random() * 0.2
      : 0.3 + Math.random() * 0.5;

    this.dx = this.speed;
    this.dy = this.speed * 0.3;

    this.color = this.isMeteor
      ? `rgba(${200 + Math.random() * 55},${200 + Math.random() * 55},255,`
      : "rgba(255,255,255,";

    this.trail = [];
  }

  reset(): void {
    if (Math.random() < 0.5) {
      this.x = Math.random() * this.canvas.width;
      this.y = 0;
    } else {
      this.x = this.canvas.width;
      this.y = Math.random() * this.canvas.height;
    }

    this.speed = 2 + Math.random() * 3;
    this.length = 15 + Math.random() * 25;
    this.opacity = this.isMeteor
      ? 0.8 + Math.random() * 0.2
      : 0.3 + Math.random() * 0.5;

    this.dx = this.speed;
    this.dy = this.speed * 0.3;

    this.color = this.isMeteor
      ? `rgba(${200 + Math.random() * 55},${200 + Math.random() * 55},255,`
      : "rgba(255,255,255,";

    this.trail = [];
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > this.length) this.trail.shift();

    // Estela
    for (let i = 0; i < this.trail.length - 1; i++) {
      const p1 = this.trail[i];
      const p2 = this.trail[i + 1];
      if (!p1 || !p2) continue;

      const alpha = (i / this.trail.length) * this.opacity;

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = `${this.color}${alpha})`;
      ctx.lineWidth = this.isMeteor ? 3 : 2;
      ctx.stroke();
    }

    // Punto principal
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.isMeteor ? 4 : 3, 0, Math.PI * 2);
    ctx.fillStyle = `${this.color}${this.opacity + 0.3})`;
    ctx.fill();

    this.x -= this.dx;
    this.y += this.dy;

    const last = this.trail[0];
    if (last && (last.x < -50 || last.y > this.canvas.height + 50)) {
      this.reset();
    }
  }
}
export function createCanvas(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.id = "canvas-bg";
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "-1";
  document.body.prepend(canvas);
  return canvas;
}

export function resizeCanvas(canvas: HTMLCanvasElement): void {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

export function startAnimation(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const stars: Star[] = [];

  for (let i = 0; i < 150; i++) {
    stars.push(new Star(canvas));
  }

  function animate(): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((star) => star.draw(ctx));
    requestAnimationFrame(animate);
  }

  animate();
}
