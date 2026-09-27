/* ==========================================
   LLUVIA DE ESTRELLAS
========================================== */
const contenedorEstrellas = document.getElementById("lluvia-estrellas");

function crearEstrella() {
    const estrella = document.createElement("span");
    estrella.className = "estrella-caida";
    const formas = ["★", "✦", "✧", "⋆", "♡", "✿"];
    estrella.textContent = formas[Math.floor(Math.random() * formas.length)];
    estrella.style.left = Math.random() * 100 + "%";
    estrella.style.fontSize = (Math.random() * 14 + 10) + "px";
    estrella.style.setProperty("--drift", (Math.random() * 120 - 60) + "px");
    const duracion = Math.random() * 5 + 6;
    estrella.style.animationDuration = duracion + "s";
    estrella.style.animationDelay = (Math.random() * 1.5) + "s";
    const colores = ["#fff", "#ffe5f1", "#ff72ae", "#ffd5e7", "#e8d5ff", "#fff4b8"];
    estrella.style.color = colores[Math.floor(Math.random() * colores.length)];
    contenedorEstrellas.appendChild(estrella);
    setTimeout(() => estrella.remove(), (duracion + 2) * 1000);
}

for (let i = 0; i < 28; i++) setTimeout(crearEstrella, i * 180);
setInterval(crearEstrella, 420);


/* ==========================================
   CONTROLADOR DE MÚSICA LOCAL (BOTÓN ROSA)
========================================== */
let isPlaying = false;

function toggleMusic() {
    const audio = document.getElementById('peppa-audio');
    
    if (!isPlaying) {
        audio.play();
        isPlaying = true;
    } else {
        audio.pause();
        isPlaying = false;
    }
}

// Conservamos también la función de desplazamiento por si la usas
function irCumple() { 
    document.getElementById("cumple").scrollIntoView({ behavior: "smooth", block: "start" }); 
}


/* ==========================================
   CONTADOR (PERFECTO Y FUNCIONANDO)
========================================== */
const fechaEvento = new Date("2026-10-03T18:00:00").getTime();

function actualizarContador() {
    const d = fechaEvento - Date.now();
    
    if (d <= 0) {
        ["dias", "horas", "minutos", "segundos"].forEach(id => document.getElementById(id).textContent = "00");
        return;
    }
    
    document.getElementById("dias").textContent = String(Math.floor(d / 86400000)).padStart(2, "0");
    document.getElementById("horas").textContent = String(Math.floor(d / 3600000) % 24).padStart(2, "0");
    document.getElementById("minutos").textContent = String(Math.floor(d / 60000) % 60).padStart(2, "0");
    document.getElementById("segundos").textContent = String(Math.floor(d / 1000) % 60).padStart(2, "0");
}

actualizarContador();
setInterval(actualizarContador, 1000);