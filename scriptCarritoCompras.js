
function mostrarDatosDeCarroDesdeLocalStorage() {
    // Buscar el elemento con ID "carro" en el HTML
    const carroElement = document.getElementById("carro");

    // Obtener los datos del Local Storage
    const datosGuardados = localStorage.getItem('carrito');

    if (datosGuardados) {
        // Convertir los datos de texto a un objeto JavaScript
        const datosJSON = JSON.parse(datosGuardados);

        // Crear una lista para mostrar los datos
        const lista = document.createElement("ul");

        // Iterar a través de los datos y agregar elementos a la lista
        datosJSON.forEach((dato, index) => {
            const elementoLista = document.createElement("li");
            elementoLista.textContent = dato;

            // Agregar botón de "Quitar" para eliminar el elemento
            const botonQuitar = document.createElement("button");
            botonQuitar.textContent = "Quitar";
            botonQuitar.addEventListener("click", () => {
                // Remover el elemento del arreglo de datos y actualizar el Local Storage
                datosJSON.splice(index, 1);
                localStorage.setItem('carrito', JSON.stringify(datosJSON));
                // Remover el elemento de la lista en la página
                lista.removeChild(elementoLista);
            });

            elementoLista.appendChild(botonQuitar);
            lista.appendChild(elementoLista);
        });

        // Agregar la lista al elemento del carro en el HTML
        carroElement.appendChild(lista);
    } else {
        // Mostrar un mensaje si no hay datos guardados en el Local Storage
        carroElement.textContent = "No hay datos de carro guardados.";
    }
}


// Llamar a la función para mostrar los datos del carro
mostrarDatosDeCarroDesdeLocalStorage();


function mostrarElementosAgregados() {
    // Obtener el contenido actual del carrito desde el localStorage
    const carritoEnLocalStorage = JSON.parse(localStorage.getItem('carrito') || '[]');

    // Concatenar los elementos del carrito para mostrarlos en SweetAlert
    const elementosAgregados = carritoEnLocalStorage.join('\n');

    // Realizar los cálculos
    const cantidadElementos = carritoEnLocalStorage.length;
    const totalCalculado = cantidadElementos * 75 * (dolar_blue); // Por simplicidad cada ítem vale 75pe (alto guiso)

    Swal.fire({
        title: 'Elementos agregados al carrito:',
        text: elementosAgregados,
        icon: 'info',
        confirmButtonText: 'Pagar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Vaciar el carrito
            localStorage.removeItem('carrito');
            // Alerta de compra exitosa
            Swal.fire({
                title: 'Compra realizada con éxito',
                text: `Total pagado: ${totalCalculado} pesos`,
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }
    });
}



var botonComprar = document.getElementById("comprar");
botonComprar.addEventListener("click", mostrarElementosAgregados);