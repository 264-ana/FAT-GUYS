setTimeout(() => {
  // 1. Crear el contenedor principal centrado
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "50%";
  container.style.left = "50%";
  container.style.transform = "translate(-50%, -50%)";
  container.style.zIndex = "10000";
  container.style.textAlign = "center";
  container.style.fontFamily = "'Flame', Arial, sans-serif";
  container.style.color = "#F7EBDB"; // Color crema para líneas 1 y 2

  // 2. Definir la estructura en grid con 4 filas.
  container.innerHTML = `
    <div id="grid" style="
      position: relative;
      display: grid;
      grid-template-rows: auto auto auto auto;
      align-items: center;
      justify-items: center;
    ">
      <!-- Fila 1: "HOY, TÚ ERES LA" -->
      <div id="line1" style="
        font-size: 3rem;
        margin: 0 0 0.1rem 0; 
        line-height: 0.8;
      ">
        HOY, TÚ ERES LA
      </div>

      <!-- Fila 2: "QUEEN" -->
      <div id="line2" style="
        font-size: 8rem;
        margin: 0 0 2rem 0; 
        line-height: 0.8;
        position: relative;
      ">
        QUEEN
      </div>

      <!-- Fila 3: "(No importa qué día lo leas)" -->
      <div id="line3" style="
        font-size: 1.4rem;
        margin: 0;
        line-height: 1.2;
        color: #FD933A;
        opacity: 0;
        transform: translateY(20px);
      ">
        (No importa qué día lo leas)
      </div>

      <!-- Fila 4: Contenedor para el botón -->
      <div id="line4" style="margin-top: 1rem;"></div>
    </div>
  `;

  // 3. Agregar el contenedor al body
  document.body.appendChild(container);

  /**
   * Función para animar letra por letra (espacios sin animación).
   */
  function applyExplosionEffectByLetters(element, delayIncrement = 0.1) {
    const text = element.textContent;
    element.textContent = ""; // Limpiar el contenido original

    let letterIndex = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === " ") {
        element.appendChild(document.createTextNode(" "));
      } else {
        const span = document.createElement("span");
        span.textContent = char;
        span.classList.add("explode-letter"); // Definida en Style.css
        span.style.animationDelay = `${letterIndex * delayIncrement}s`;
        letterIndex++;
        element.appendChild(span);
      }
    }
  }

  // 4. Aplicar el efecto letra por letra a "HOY, TÚ ERES LA"
  const line1El = document.getElementById("line1");
  applyExplosionEffectByLetters(line1El, 0.1);

  // 5. Ajustar dinámicamente "QUEEN" para que tenga el mismo ancho que "HOY, TÚ ERES LA"
  const line2El = document.getElementById("line2");
  requestAnimationFrame(() => {
    const line1Width = line1El.getBoundingClientRect().width;
    const line2Width = line2El.getBoundingClientRect().width;
    if (line2Width > 0) {
      const scaleFactor = line1Width / line2Width;
      const currentFontSize = parseFloat(window.getComputedStyle(line2El).fontSize);
      const newSize = currentFontSize * scaleFactor;
      line2El.style.fontSize = newSize + "px";
    }
    line2El.style.opacity = "0";
  });

  // 6. Función para animar la entrada de "QUEEN"
  function animateQueenEntrance() {
    const finalQueenEl = document.getElementById("line2");
    const finalFontSize = window.getComputedStyle(finalQueenEl).fontSize;
    
    const tempQueen = document.createElement("div");
    tempQueen.textContent = finalQueenEl.textContent;
    tempQueen.style.position = "absolute";
    tempQueen.style.top = finalQueenEl.offsetTop + "px";
    tempQueen.style.left = finalQueenEl.offsetLeft + "px";
    tempQueen.style.width = finalQueenEl.offsetWidth + "px";
    tempQueen.style.fontFamily = window.getComputedStyle(finalQueenEl).fontFamily;
    tempQueen.style.color = window.getComputedStyle(finalQueenEl).color;
    tempQueen.style.fontSize = (parseFloat(finalFontSize) * 3) + "px";
    tempQueen.style.lineHeight = finalQueenEl.style.lineHeight;
    tempQueen.style.transform = "translateX(100vw)";
    tempQueen.style.opacity = "1";
    tempQueen.style.transition = "transform 1.5s ease-in-out";

    const gridEl = document.getElementById("grid");
    gridEl.appendChild(tempQueen);

    void tempQueen.offsetWidth;
    tempQueen.style.transform = "translateX(-200vw)";

    tempQueen.addEventListener("transitionend", function handler() {
      tempQueen.removeEventListener("transitionend", handler);
      tempQueen.parentElement.removeChild(tempQueen);
      finalQueenEl.style.opacity = "1";
      finalQueenEl.style.color = "transparent";
      finalQueenEl.style.webkitTextStroke = "2px #F7EBDB";
      finalQueenEl.style.transition = "";
      void finalQueenEl.offsetWidth;
      finalQueenEl.classList.add("fill-text");
      finalQueenEl.addEventListener("animationend", function fillHandler() {
        finalQueenEl.removeEventListener("animationend", fillHandler);
        animateLine3();
      }, { once: true });
    });
  }

  // 7. Función para animar la aparición de la línea 3
  function animateLine3() {
    const line3El = document.getElementById("line3");
    line3El.style.transition = "opacity 0.8s ease-in-out, transform 0.8s ease-in-out";
    line3El.style.opacity = "1";
    line3El.style.transform = "translateY(0)";
    setTimeout(animateButtonPop, 800);
  }

  // 8. Función para animar el botón "ENCONTRARME" con efecto pop
  function animateButtonPop() {
    const line4El = document.getElementById("line4");
    const buttonEl = document.createElement("button");
    buttonEl.textContent = "ENCONTRARME";
    buttonEl.style.backgroundColor = "#F7EBDB";
    buttonEl.style.color = "#D82B02";
    buttonEl.style.border = "none";
    buttonEl.style.borderRadius = "2rem";
    buttonEl.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    buttonEl.style.padding = "0.75rem 2rem";
    buttonEl.style.fontSize = "1.2rem";
    buttonEl.style.fontWeight = "bold";
    buttonEl.style.cursor = "pointer";
    buttonEl.style.transition = "transform 0.5s ease, opacity 0.5s ease, background-color 0.3s";
    buttonEl.style.opacity = "0";
    buttonEl.style.transform = "scale(0.5)";
    buttonEl.addEventListener("mouseover", () => {
      buttonEl.style.backgroundColor = "#FDA45B";
    });
    buttonEl.addEventListener("mouseout", () => {
      buttonEl.style.backgroundColor = "#F7EBDB";
    });
    line4El.appendChild(buttonEl);
    void buttonEl.offsetWidth;
    buttonEl.style.transform = "scale(1)";
    buttonEl.style.opacity = "1";
  }

  // 9. Iniciar la animación de entrada de "QUEEN" después de 500ms
  setTimeout(animateQueenEntrance, 500);

  // 10. Agregar "By" + Logo en la esquina inferior derecha
  const brandContainer = document.createElement("div");
  brandContainer.style.position = "fixed";
  brandContainer.style.bottom = "1rem";
  brandContainer.style.right = "1rem";
  brandContainer.style.zIndex = "10001";
  brandContainer.style.display = "flex";
  brandContainer.style.alignItems = "center";
  brandContainer.style.gap = "0.5rem";

  const byText = document.createElement("span");
  byText.textContent = "By";
  byText.style.fontSize = "1rem";
  byText.style.fontWeight = "bold";
  byText.style.fontFamily = "'Flame', Arial, sans-serif";
  byText.style.color = "#F7EBDB";

  const logoImg = document.createElement("img");
  logoImg.src = "FOTOS/FGB.png";
  logoImg.alt = "Fat Guys Logo";
  logoImg.style.width = "80px";
  logoImg.style.height = "auto";

  brandContainer.appendChild(byText);
  brandContainer.appendChild(logoImg);
  document.body.appendChild(brandContainer);

}, 11600);
