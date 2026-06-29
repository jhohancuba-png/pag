// =========================
// SPORTZONE - SCRIPT COMPLETO
// =========================

// =========================
// ELEMENTOS
// =========================

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const contador = document.getElementById("contador");
const listaCarrito = document.getElementById("listaCarrito");
const totalProductos = document.getElementById("totalProductos");
const botonSubir = document.getElementById("subir");
const formulario = document.getElementById("formulario");

// =========================
// VARIABLES
// =========================

let carrito = [];

// =========================
// MENÚ RESPONSIVE
// =========================

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
});

// =========================
// SCROLL SUAVE
// =========================

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function(e){
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){
            target.scrollIntoView({
                behavior: "smooth"
            });
        }

        menu.classList.remove("active");
    });
});

// =========================
// CARRITO DE COMPRAS (CORREGIDO)
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const botones = document.querySelectorAll(".agregar");

    botones.forEach(boton => {
        boton.addEventListener("click", (e) => {

            const card = e.target.closest(".card");

            const nombre = card.querySelector("h3").innerText;
            const precio = card.querySelector("span").innerText;

            carrito.push({ nombre, precio });

            actualizarCarrito();

            mostrarMensaje("🛒 Producto agregado al carrito");
        });
    });

});

// =========================
// ACTUALIZAR CARRITO
// =========================

function actualizarCarrito(){

    listaCarrito.innerHTML = "";

    carrito.forEach((item, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            ${item.nombre} - ${item.precio}
            <button onclick="eliminarProducto(${index})">X</button>
        `;

        listaCarrito.appendChild(li);
    });

    contador.innerText = carrito.length;
    totalProductos.innerText = carrito.length;
}

// =========================
// ELIMINAR PRODUCTO
// =========================

function eliminarProducto(index){
    carrito.splice(index, 1);
    actualizarCarrito();
}

// =========================
// BOTÓN SUBIR ARRIBA
// =========================

window.addEventListener("scroll", () => {
    if(window.scrollY > 400){
        botonSubir.style.display = "block";
    } else {
        botonSubir.style.display = "none";
    }
});

botonSubir.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// =========================
// VALIDACIÓN FORMULARIO
// =========================

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if(nombre === "" || correo === "" || mensaje === ""){
        alert("❌ Completa todos los campos");
        return;
    }

    alert("✅ Mensaje enviado correctamente");

    formulario.reset();
});

// =========================
// MENSAJE FLOTANTE (PRO)
// =========================

function mostrarMensaje(texto){

    const div = document.createElement("div");

    div.textContent = texto;

    div.style.position = "fixed";
    div.style.top = "20px";
    div.style.right = "20px";
    div.style.background = "#e60023";
    div.style.color = "white";
    div.style.padding = "12px 20px";
    div.style.borderRadius = "8px";
    div.style.zIndex = "9999";
    div.style.boxShadow = "0 5px 15px rgba(0,0,0,.3)";
    div.style.fontWeight = "bold";

    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 2000);
}

// =========================
// ANIMACIONES AL SCROLL
// =========================

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll("section").forEach(sec => {
    sec.style.opacity = 0;
    sec.style.transform = "translateY(50px)";
    sec.style.transition = "0.6s ease";
    observer.observe(sec);
});