class Espacio {
    constructor(palabra) {
      this.palabra = palabra.toLowerCase();
      this.estadoEspacio = new Array(this.palabra.length).fill(false);
    }
  
    adivinarLetra(letra) {
      letra = letra.toLowerCase();
      let acierto = false;
  
      for (let i = 0; i < this.palabra.length; i++) {
        if (this.palabra[i] === letra) {
          this.estadoEspacio[i] = true;
          acierto = true;
        }
      }
  
      return acierto;
    }
  
    estaCompleto() {
      return this.estadoEspacio.every((letraAdivinada) => letraAdivinada);
    }
  
    getPalabraAdivinada() {
      let palabraAdivinada = "";
      for (let i = 0; i < this.palabra.length; i++) {
        palabraAdivinada += this.estadoEspacio[i] ? this.palabra[i] : " _ ";
      }
      return palabraAdivinada;
    }
  }
  
  class Jugador {
    constructor(nombre) {
      this.nombre = nombre;
      this.vida = 6;
    }
  
    perderVida() {
      this.vida--;
    }
  
    estaVivo() {
      return this.vida > 0;
    }
  }
  
  class Partida {
    constructor(palabras) {
      this.palabras = palabras.map((palabra) => palabra.toLowerCase());
      this.espacio = null;
      this.jugador = null;
      this.guessedLetters = [];
    }
  
    nuevaPartida(nombreJugador) {
      this.jugador = new Jugador(nombreJugador);
      this.nuevaPalabra();
    }
  
    nuevaPalabra() {
      if (this.palabras.length > 0) {
        const randomIndex = Math.floor(Math.random() * this.palabras.length);
        const palabraSeleccionada = this.palabras[randomIndex];
        this.espacio = new Espacio(palabraSeleccionada);
        this.palabras.splice(randomIndex, 1);
        this.guessedLetters = [];
      } else {
        alert("¡Has adivinado todas las palabras!");
      }
    }
  
    intentoLetra(letra) {
      if (!this.guessedLetters.includes(letra)) {
        this.guessedLetters.push(letra);
        if (!this.espacio.adivinarLetra(letra)) {
          this.jugador.perderVida();
        }
      }
    }
  
    estadoPartida() {
      if (this.espacio.estaCompleto()) {
        alert("¡Felicidades! Has adivinado la palabra.");
        this.nuevaPalabra();
      } else if (!this.jugador.estaVivo()) {
        alert("¡Perdiste! La palabra era: " + this.espacio.palabra);
        this.nuevaPalabra();
      }
    }
  
    getPalabraAdivinada() {
      return this.espacio.getPalabraAdivinada();
    }
  
    getVidasRestantes() {
      return this.jugador.vida;
    }
  
    getGuessedLetters() {
      return this.guessedLetters;
    }
  }
  
  // Función para inicializar el juego
  function initGame() {
    const palabras = ["javascript", "html", "css", "programming", "web"];
    partida = new Partida(palabras);
    const nombreJugador = prompt("Ingresa tu nombre:");
    partida.nuevaPartida(nombreJugador);
    updateDisplay();
  }
  
  // Función para actualizar el contenido mostrado en pantalla
  function updateDisplay() {
    const wordContainer = document.getElementById("word-container");
    const guessContainer = document.getElementById("guess-container");
    const attemptsContainer = document.getElementById("attempts-container");
  
    wordContainer.textContent = partida.getPalabraAdivinada();
    guessContainer.textContent = `Letras adivinadas: ${partida.getGuessedLetters().join(", ")}`;
    attemptsContainer.textContent = `Intentos restantes: ${partida.getVidasRestantes()}`;
  }
  
  // Event listener para capturar las letras ingresadas por el jugador
  document.addEventListener("keydown", (event) => {
    const letter = event.key.toLowerCase();
    if (/[a-z]/.test(letter)) {
      partida.intentoLetra(letter);
      updateDisplay();
      partida.estadoPartida();
    }
  });
  
  let partida = null;
  initGame();
  