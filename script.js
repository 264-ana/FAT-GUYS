const nombres = [
    "AZUCENA", "ROMINA", "ANA", "MILAGROS", "VALERIA", "ALESSANDRA", "SOL", "ANNIE", "ALE", "JIMENA",
    "MARÍA", "CARMEN", "BÁRBARA", "NATHALY", "VERÓNICA", "MARY", "DANI", "ANDREA", "ANTUANE", "GABRIELA",
    "GIANELLA", "DAYANNA", "GUADALUPE", "NATHALIA", "FRANSHESCA", "ANGELA", "VICTORIA", "SOFÍA", "LUCÍA", "PAULA",
    "MARIANA", "ESTEFANÍA", "REBECA", "FABIOLA", "MÓNICA", "CAROLINA", "ISABELLA", "PATRICIA", "MARTA", "JULIANA",
    "LORENA", "DANIELA", "EUGENIA", "MIRANDA", "SAMANTHA", "CLARA", "INES", "CECILIA", "FLORENCIA", "RAQUEL"
  ];
  
  function colocarNombres() {
    const container = document.getElementById("namesContainer");
    container.innerHTML = "";
  
    const nombresAleatorios = [...nombres].sort(() => Math.random() - 0.5).slice(0, 12);
  
    for (let i = 0; i < nombres.length; i++) {
      const nameElement = document.createElement("span");
      nameElement.classList.add("name");
      nameElement.textContent = nombres[i];
  
      const randomSize = Math.floor(Math.random() * 50) + 50;
      nameElement.style.fontSize = randomSize + "px";
  
      if (nombresAleatorios.includes(nombres[i])) {
        nameElement.classList.add("outline");
      }
  
      container.appendChild(nameElement);
    }
  }
  
  // Función para crear una burbuja flotante con imagen aleatoria de la carpeta PERFILES
  function createBubble() {
    // Se selecciona un número aleatorio entre 1 y 11
    const randomNumber = Math.floor(Math.random() * 11) + 1;
    const bubble = document.createElement('img');
    bubble.src = 'PERFILES/' + randomNumber + '.png';
    bubble.classList.add('bubble');
  
    // Posición horizontal aleatoria
    const randomLeft = Math.random() * 100;
    bubble.style.left = randomLeft + 'vw';
  
    // Tamaño aleatorio entre 50px y 100px
    const size = Math.random() * 50 + 50;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
  
    // Duración y retraso aleatorios para la animación
    const duration = Math.random() * 5 + 5;
    bubble.style.animationDuration = duration + 's';
    bubble.style.animationDelay = Math.random() * 5 + 's';
  
    document.body.appendChild(bubble);
  
    // Elimina la burbuja una vez finalizada la animación
    bubble.addEventListener('animationend', () => {
      bubble.remove();
    });
  }
  
  window.onload = function() {
    setTimeout(() => {
      document.getElementById('preloader-logo').classList.add('hidden');
      setTimeout(() => {
        document.getElementById('preloader-logo').style.display = 'none';
        document.getElementById('preloader-names').style.display = 'flex';
        colocarNombres();
  
        setTimeout(() => {
          document.getElementById('preloader-names').classList.add('hidden');
          setTimeout(() => {
            document.getElementById('preloader-names').style.display = 'none';
            document.body.style.backgroundColor = "#D82B02";
  
            // Inicia la creación periódica de burbujas cada 2 segundos
            setInterval(createBubble, 2000);
          }, 1000);
        }, 8000);
      }, 1000);
    }, 1500);
  };
  