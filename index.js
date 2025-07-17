const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");

let confetti = [];
const colors = ["#e91e63", "#ffeb3b", "#4caf50", "#03a9f4", "#ff9800"];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function Confetto() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * -canvas.height;
  this.r = Math.random() * 6 + 4;
  this.d = Math.random() * colors.length;
  this.color = colors[Math.floor(this.d)];
  this.speed = Math.random() * 3 + 2;
  this.tilt = Math.random() * 10 - 5;

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x + this.tilt, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  this.update = function () {
    this.y += this.speed;
    this.x += Math.sin(this.y * 0.01);
    if (this.y > canvas.height) {
      this.y = -10;
      this.x = Math.random() * canvas.width;
    }
  };
}

for (let i = 0; i < 150; i++) {
  confetti.push(new Confetto());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let c of confetti) {
    c.update();
    c.draw();
  }
  requestAnimationFrame(animate);
}
animate();

// Reproducir el audio solo si el navegador lo permite
window.addEventListener('click', () => {
  document.getElementById("cumpleAudio").play().catch(() => {});
});
