// 🎊 Confeti animado
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
  this.color = colors[Math.floor(Math.random() * colors.length)];
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

// 🎵 Reproducir sonido y mostrar contenido luego de unos segundos
window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("cumpleAudio");
  let reproducido = false;

function reproducirAudio() {
  if (!reproducido) {
    audio.play().then(() => {
      reproducido = true;
    }).catch(() => {
      // Si el navegador bloquea el autoplay, esperamos el primer click
      window.addEventListener("click", clickHandler);
    });
  }
}

function clickHandler() {
  if (!reproducido) {
    audio.play();
    reproducido = true;
    window.removeEventListener("click", clickHandler);
  }
}

reproducirAudio();

  setTimeout(() => {
    document.getElementById("intro").style.display = "none";
    document.querySelector(".contenido").style.display = "block";
    document.body.style.overflow = "auto";
    actualizarHora();
    efectoEscritura("typewriter", "¡Esto es una web... hecha con código y cariño!");
  }, 6000); // esperar 6 segundos
});

// 🕹️ Cosas divertidas
let count = 0;
function sumar() {
  count++;
  document.getElementById("contador").innerText = count;
}

function cambiarColor() {
  const colores = ["#fff9f3", "#ffe4e1", "#f0fff0", "#e0ffff", "#fff0f5"];
  document.body.style.backgroundColor =
    colores[Math.floor(Math.random() * colores.length)];
}

function actualizarHora() {
  const ahora = new Date();
  document.getElementById("hora").innerText = ahora.toLocaleTimeString();
  setTimeout(actualizarHora, 1000);
}

function efectoEscritura(id, texto, velocidad = 60) {
  let i = 0;
  function escribir() {
    if (i < texto.length) {
      document.getElementById(id).innerHTML += texto.charAt(i);
      i++;
      setTimeout(escribir, velocidad);
    }
  }
  escribir();
}

function sorpresa() {
  const btn = document.querySelector("button[onclick='sorpresa()']");
  btn.style.position = "absolute";
  btn.style.left = Math.random() * 90 + "%";
  btn.style.top = Math.random() * 80 + "%";
}
