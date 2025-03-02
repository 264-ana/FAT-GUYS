// Esperamos ~12 segundos, o lo que dure tu animación superior.
// Ajusta este tiempo para que sea un poco mayor que el final real de la animación.
setTimeout(() => {
    // 1. Seleccionar el contenedor que final.js creó
    //    Recuerda que final.js hace:
    //    const container = document.createElement("div"); ... document.body.appendChild(container);
    //    Lo ubicamos consultando su estilo (position: fixed).
    const containers = document.querySelectorAll('body > div');
    let animatedContainer = null;
    containers.forEach((c) => {
      if (getComputedStyle(c).position === 'fixed') {
        animatedContainer = c;
      }
    });
  
    if (!animatedContainer) {
      console.warn("No se encontró el contenedor animado. Revisa tu código.");
      return;
    }
  
    // 2. Cambiar la posición de 'fixed' a 'static' para que el body pueda scrollear
    animatedContainer.style.position = 'static';
    animatedContainer.style.top = '0';
    animatedContainer.style.left = '0';
    animatedContainer.style.transform = 'none';
    // Asegurarnos de que ocupe el espacio normal en el flujo
    animatedContainer.style.width = '100%';
  
    // 3. Habilitar scroll en el body (por si estuviera bloqueado)
    document.body.style.overflowY = 'auto';
  
    // 4. Crear una sección inferior con fondo crema
    const bottomSection = document.createElement('div');
    bottomSection.style.height = '100vh';
    bottomSection.style.backgroundColor = '#F7EBDB';
    bottomSection.innerHTML = `
      <h2 style="
        text-align:center;
        padding-top:2rem;
        color:#D82B02;
        font-family:'Flame', Arial, sans-serif;
      ">
        Contenido inferior
      </h2>
      <p style="
        text-align:center;
        max-width:600px;
        margin:0 auto;
        color:#333;
        font-family:'Flame', Arial, sans-serif;
      ">
        Aquí tu contenido en fondo crema...
      </p>
    `;
  
    // 5. Insertar la sección al final del body
    document.body.appendChild(bottomSection);
  
  }, 12000); // Ajusta el tiempo (12s) a la duración total de tu animación
  