/* Card para la personalizada */
let carrito = [];

function mostrarElementosAgregados() {
    // Obtener el contenido actual del carrito desde el localStorage
    const carritoEnLocalStorage = JSON.parse(localStorage.getItem('carrito') || '[]');

    if (carritoEnLocalStorage.length === 0) {
        // Mostrar mensaje de alerta si el carrito está vacío
        Swal.fire({
            title: 'Carrito vacío',
            text: 'No has seleccionado ningún elemento.',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        });

        return; // Salir de la función si el carrito está vacío
    }

    // Mostrar SweetAlert con botón "Ir a pagar"
    Swal.fire({
        title: 'Elementos en el carrito',
        text: 'Tienes elementos en el carrito. ¿Deseas ir a pagar?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Ver el carrito',
        cancelButtonText: 'Seguir comprando'
    }).then((result) => {
        if (result.isConfirmed) {
            // Redireccionar a la página "pagar.html"
            window.location.href = 'pagar.html';
        }
    });
}


const planPersonalizado = {
    title: 'Personalized',
    description: 'Plan personalizado según tus necesidades',
    features: [
        'Diseño de sitios web atractivos y responsivos.',
        'Integración con redes sociales para aumentar la visibilidad.',
        'Optimización básica de SEO para mejorar el posicionamiento en buscadores.',
        'Formulario de contacto para recibir consultas de los visitantes.',
        'Alojamiento web confiable y seguro.',
        'Integración con herramientas de análisis para medir el tráfico del sitio.',
        'Galería de imágenes para mostrar productos o trabajos realizados.',
        'Blog básico para compartir contenido relevante y generar engagement.',
        'Diseño personalizado con múltiples opciones de estilo y colores.',
        'Integración con plataformas de comercio electrónico para vender productos en línea.',
        'Sistema de gestión de contenido para actualizar y mantener el sitio fácilmente.',
        'Optimización avanzada de SEO para aumentar la visibilidad en buscadores.',
        'Diseño a medida que refleje la identidad y los valores de tu marca.',
        'Funcionalidades y características avanzadas según tus requerimientos.',
        'Integración con sistemas externos y APIs para una mayor eficiencia.',
        'Soporte prioritario y actualizaciones continuas para mantener tu sitio en óptimas condiciones.'
    ]
};

function crearTarjetaPersonalizada() {

    // Obtener el div de personalizado por su id
    const personalizadaCard = document.querySelector('#divPersonalizado');

    // Creo la nueva card
    const card = document.createElement('div');
    card.classList.add('plan-box');

    // Crea el título de la tarjeta
    const title = document.createElement('h2');
    title.textContent = planPersonalizado.title; // Asegúrate de acceder al título del objeto planPersonalizado correctamente
    card.appendChild(title);

    // Crea la descripción de la tarjeta
    const description = document.createElement('p');
    description.textContent = planPersonalizado.description;
    card.appendChild(description);



    // Crea los checkboxes para las características
    const featuresList = document.createElement('ul');
    featuresList.classList.add('features-list');

    planPersonalizado.features.forEach((caracteristica) => {
        const featureItem = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = caracteristica;
        checkbox.addEventListener('change', handleCheckboxChange);

        const label = document.createElement('label');
        label.textContent = caracteristica;

        featureItem.appendChild(checkbox);
        featureItem.appendChild(label);
        featuresList.appendChild(featureItem);
    });
    card.appendChild(featuresList);
    // Crea el enlace de selección de la tarjeta
    const link = document.createElement('a');
    link.href = '#';
    link.classList.add('btn', 'btn-primary');
    link.textContent = 'Seleccionar';
    link.addEventListener('click', mostrarElementosAgregados);
    card.appendChild(link);
    // Agregar un evento de clic al enlace "Seleccionar"
    personalizadaCard.appendChild(card);

}

function removerLocalStorage(key) {
    localStorage.removeItem(key);
}

// Función para marcar los checkboxes según el contenido del carrito almacenado en el LocalStorage
function marcarCheckboxesDesdeLocalStorage() {
    // Obtener el contenido actual del carrito desde el localStorage
    const carritoEnLocalStorage = JSON.parse(localStorage.getItem('carrito') || '[]');

    // Obtener referencias a todos los checkboxes seleccionados
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Recorrer los checkboxes y marcar los que están en el carrito
    checkboxes.forEach(checkbox => {
        const product = checkbox.getAttribute('value');
        if (carritoEnLocalStorage.includes(product)) {
            checkbox.checked = true;
        }
        // Asociar el evento de cambio a cada checkbox
        checkbox.addEventListener('change', handleCheckboxChange);
    });
}
// Obtener referencias a todos los checkboxes seleccionados
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

// Recorrer los checkboxes y marcar los que están en el carrito

checkboxes.forEach(checkbox => {
    const product = checkbox.getAttribute('value');
    if (carritoEnLocalStorage.includes(product)) {
        checkbox.checked = true;
    }
    // Asociar el evento de cambio a cada checkbox
    checkbox.addEventListener('change', handleCheckboxChange);
});

// Función para manejar el cambio de estado de los checkboxes seleccionados
function handleCheckboxChange(event) {
    const checkbox = event.target;
    const isChecked = checkbox.checked;
    // Obtener el atributo data-product del checkbox (en este caso, el nombre del producto)
    const product = checkbox.getAttribute('value');
    console.log(product);

    // Obtener el contenido actual del carrito desde el localStorage
    const carritoEnLocalStorage = JSON.parse(localStorage.getItem('carrito') || '[]');

    // Agregar o eliminar el producto del carrito según su estado
    if (isChecked) {
        carritoEnLocalStorage.push(product); // Agregar el producto al carrito actual
    } else {
        const index = carritoEnLocalStorage.indexOf(product);
        if (index !== -1) {
            carritoEnLocalStorage.splice(index, 1); // Eliminar el producto del carrito actual
        }
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carritoEnLocalStorage));
    actualizarContador();

    // Puedes agregar aquí alguna función para refrescar la visualización del carrito en la página si es necesario
}

// Obtener el enlace por su ID
const botonCarrito = document.getElementById("botonCarrito");

// Función para actualizar el contador de elementos y el estado del botón de vaciar
function actualizarContador() {
    // Obtener la cantidad de elementos en el Local Storage
    const carritoItems = localStorage.getItem("carrito");
    const carritoCantidad = carritoItems ? JSON.parse(carritoItems).length : 0;

    // Actualizar el contenido del enlace con la cantidad de elementos y el enlace
    botonCarrito.textContent = `Tu carrito 🛒 (${carritoCantidad} elementos)`;
    
    if (carritoCantidad === 0) {
        botonCarrito.href = '#';
        botonVaciar.style.display = 'none';
    } else {
        botonCarrito.href = 'pagar.html';
        botonVaciar.style.display = 'block';
    }
}

// Agregar event listener para cuando se agrega o quita un item
window.addEventListener("storage", () => {
    actualizarContador();
});

// Obtener el botón por su ID
const botonVaciar = document.getElementById("botonVaciar");

botonVaciar.addEventListener("click", () => {
    // Vaciar el Local Storage
    localStorage.removeItem("carrito");

    // Actualizar el contador de elementos y ocultar el botón de vaciar
    actualizarContador();

    // Desmarcar todos los checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
});

// Llamada inicial para configurar el contador y el botón de vaciar
actualizarContador();



crearTarjetaPersonalizada();
marcarCheckboxesDesdeLocalStorage();
