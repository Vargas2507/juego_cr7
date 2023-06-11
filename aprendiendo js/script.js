const carrete1 = document.getElementById('carrete-1');
const carrete2 = document.getElementById('carrete-2');
const carrete3 = document.getElementById('carrete-3');
const botonRecargar = document.getElementById('boton-recargar');
const botonAceptar = document.getElementById('boton-aceptar');
const botonGirar = document.getElementById('boton-girar');
const entradaApuesta = document.getElementById('entrada-apuesta');
const valorBalance = document.getElementById('valor-balance');
const contenedorMensaje = document.getElementById('contenedor-mensaje');

let balance = 0;
let apuesta = 0;

// Función para generar un número aleatorio entre 1 y 3
function generarNumeroAleatorio() {
  return Math.floor(Math.random() * 3) + 1;
}

// Función para actualizar el balance
function actualizarBalance() {
  valorBalance.textContent = balance;
}

// Función para mostrar un mensaje en el contenedor de mensajes
function mostrarMensaje(mensaje) {
  contenedorMensaje.textContent = mensaje;
}

// Función para recargar el saldo
function recargarSaldo() {
  balance = 1000; // Cantidad de monedas para recargar
  actualizarBalance();
  mostrarMensaje('¡Saldo recargado exitosamente!');
  entradaApuesta.disabled = false;
}

// Función para iniciar el juego
function iniciarJuego() {
  apuesta = parseInt(entradaApuesta.value);
  if (isNaN(apuesta) || apuesta <= 0) {
    mostrarMensaje('Ingresa una apuesta válida.');
    return;
  }

  if (apuesta > balance) {
    mostrarMensaje('No tienes suficientes monedas para hacer esa apuesta. Recarga tu saldo.');
    return;
  }
// ...

// Función para mostrar la imagen correspondiente en un carrete
function mostrarImagen(carrete, resultado) {
      const img = document.createElement('img');
      img.src = obtenerRutaImagen(resultado);
      img.alt = `Imagen ${resultado}`;
      img.width = '200'; // Ancho original de las imágenes
      img.height = '200'; // Alto original de las imágenes
      carrete.innerHTML = ''; // Limpiar contenido anterior
      carrete.appendChild(img);
    }
    
    // ...
    
  botonRecargar.disabled = true;
  botonAceptar.disabled = true;
  botonGirar.disabled = true;
  entradaApuesta.disabled = true;

  balance -= apuesta;
  actualizarBalance();

  // Generar números aleatorios para los carretes
  const resultado1 = generarNumeroAleatorio();
  const resultado2 = generarNumeroAleatorio();
  const resultado3 = generarNumeroAleatorio();

  // Mostrar imágenes correspondientes en los carretes
  mostrarImagen(carrete1, resultado1);
  mostrarImagen(carrete2, resultado2);
  mostrarImagen(carrete3, resultado3);

  // Simular animación del giro de los carretes
  setTimeout(() => {
    const resultadoFinal1 = generarNumeroAleatorio();
    const resultadoFinal2 = generarNumeroAleatorio();
    const resultadoFinal3 = generarNumeroAleatorio();

    mostrarImagen(carrete1, resultadoFinal1);
    mostrarImagen(carrete2, resultadoFinal2);
    mostrarImagen(carrete3, resultadoFinal3);

    // Comprobar si hay una combinación ganadora
    if (resultadoFinal1 === resultadoFinal2 && resultadoFinal2 === resultadoFinal3) {
      const premio = obtenerPremio(resultadoFinal1);
      balance += premio;
      actualizarBalance();
      mostrarMensaje(`¡Felicidades! Ganaste ${premio} monedas.`);
    } else {
      mostrarMensaje('No tuviste suerte. Inténtalo de nuevo.');
    }

    botonRecargar.disabled = false;
    botonAceptar.disabled = false;
    entradaApuesta.disabled = false;
  }, 2000);
}

// Función para mostrar la imagen correspondiente en un carrete
function mostrarImagen(carrete, resultado) {
  carrete.innerHTML = `<img src="${obtenerRutaImagen(resultado)}" alt="Imagen ${resultado}">`;
}

// Función para obtener la ruta de la imagen según el resultado del carrete
function obtenerRutaImagen(resultado) {
  switch (resultado) {
    case 1:
      return 'cr7.jpeg';
    case 2:
      return 'neymar.jpeg';
    case 3:
      return 'messi.jpg';
    default:
      return '';
  }
}

// Función para obtener el premio según la combinación ganadora
function obtenerPremio(resultado) {
  switch (resultado) {
    case 1:
      return 500;
    case 2:
      return 300;
    case 3:
      return 200;
    default:
      return 0;
  }
}

// Evento click del botón "Recargar saldo"
botonRecargar.addEventListener('click', () => {
  recargarSaldo();
});

// Evento click del botón "Aceptar"
botonAceptar.addEventListener('click', () => {
  balance = parseInt(valorBalance.textContent);
  botonGirar.disabled = false;
});

// Evento input del campo de entrada de apuesta
entradaApuesta.addEventListener('input', () => {
  botonGirar.disabled = entradaApuesta.value === '';
});

// Evento click del botón "Girar"
botonGirar.addEventListener('click', () => {
  iniciarJuego();
});
