// ==========================================
// BUSCADOR DE PRODUCTOS - CAMPO NORTE
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // ELEMENTOS DEL HTML
    // ==========================================

    const buscador = document.getElementById("buscador");
    const productos = document.querySelectorAll(".producto");
    const categorias = document.querySelectorAll(".categoria");

    const contador = document.getElementById("contador");
    const sinResultados = document.getElementById("sinResultados");
    const limpiarBusqueda = document.getElementById("limpiarBusqueda");


    // ==========================================
    // COMPROBAR QUE EXISTAN LOS ELEMENTOS
    // ==========================================

    if (
        !buscador ||
        !contador ||
        !sinResultados ||
        !limpiarBusqueda
    ) {
        console.error("No se encontraron los elementos del buscador.");
        return;
    }


    // ==========================================
    // FUNCIÓN PARA BUSCAR PRODUCTOS
    // ==========================================

    function buscarProductos() {

        const texto = buscador.value
            .toLowerCase()
            .trim();

        let encontrados = 0;


        // ==========================================
        // RECORRER TODOS LOS PRODUCTOS
        // ==========================================

        productos.forEach(function (producto) {

            const titulo = producto.querySelector("h3");
            const tipoElemento = producto.querySelector(".tipo");
            const descripcionElemento = producto.querySelector(".descripcion");


            // Evitar errores si falta algún elemento
            const nombre = titulo
                ? titulo.textContent.toLowerCase()
                : "";

            const tipo = tipoElemento
                ? tipoElemento.textContent.toLowerCase()
                : "";

            const descripcion = descripcionElemento
                ? descripcionElemento.textContent.toLowerCase()
                : "";


            // ==========================================
            // COMPROBAR COINCIDENCIA
            // ==========================================

            const coincide =
                nombre.includes(texto) ||
                tipo.includes(texto) ||
                descripcion.includes(texto);


            if (coincide) {

                producto.style.display = "";

                encontrados++;

            } else {

                producto.style.display = "none";

            }

        });


        // ==========================================
        // OCULTAR CATEGORÍAS VACÍAS
        // ==========================================

        categorias.forEach(function (categoria) {

            const productosCategoria =
                categoria.querySelectorAll(".producto");

            let hayProducto = false;


            productosCategoria.forEach(function (producto) {

                if (producto.style.display !== "none") {

                    hayProducto = true;

                }

            });


            if (hayProducto) {

                categoria.style.display = "";

            } else {

                categoria.style.display = "none";

            }

        });


        // ==========================================
        // ACTUALIZAR CONTADOR
        // ==========================================

        if (texto === "") {

            contador.textContent =
                "Mostrando todos los productos";

        } else if (encontrados === 1) {

            contador.textContent =
                "Se encontró 1 producto";

        } else {

            contador.textContent =
                `Se encontraron ${encontrados} productos`;

        }


        // ==========================================
        // MOSTRAR / OCULTAR SIN RESULTADOS
        // ==========================================

        if (encontrados === 0) {

            sinResultados.style.display = "block";

        } else {

            sinResultados.style.display = "none";

        }

    }


    // ==========================================
    // BUSCAR MIENTRAS SE ESCRIBE
    // ==========================================

    buscador.addEventListener(
        "input",
        buscarProductos
    );


    // ==========================================
    // BOTÓN LIMPIAR
    // ==========================================

    limpiarBusqueda.addEventListener(
        "click",
        function () {

            buscador.value = "";

            buscarProductos();

            buscador.focus();

        }
    );


    // ==========================================
    // TECLA ESCAPE
    // ==========================================

    buscador.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                buscador.value = "";

                buscarProductos();

                buscador.focus();

            }

        }
    );


    // ==========================================
    // BOTONES COMPRAR
    // ==========================================

    const botonesComprar =
        document.querySelectorAll(".descripcion button");


    botonesComprar.forEach(function (boton) {

        boton.addEventListener(
            "click",
            function () {

                const producto =
                    boton.closest(".producto");


                if (!producto) {
                    return;
                }


                const titulo =
                    producto.querySelector("h3");


                const nombre =
                    titulo
                        ? titulo.textContent
                        : "producto";


                alert(
                    `Seleccionaste "${nombre}". ¡Gracias por elegir Campo Norte!`
                );

            }
        );

    });


    // ==========================================
    // MENSAJE INICIAL
    // ==========================================

    buscarProductos();

});