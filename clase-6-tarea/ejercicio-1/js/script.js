function guardarEdadesIntegrantes(numeros) {
    const edades = [];
    for (let i = 0; i < numeros.length; i++) {
        edades[i] = numeros[i].value;
    }
    return edades;
}

function manejarErroresCantidad(textoError, input) {
    vaciarErroresAnteriores();
    mostrar($contenedorErrores)

    const contenedor = document.createElement("p");
    contenedor.textContent = textoError;
    $contenedorErrores.appendChild(contenedor);

    input.classList.add("input-error");
}

function crearInputLabels(cantidadIntegrantes) {

    for (let i = 1; i <= cantidadIntegrantes; i++) {
        let labelNuevo = document.createElement("label");
        let inputNuevo = document.createElement("input");

        inputNuevo.placeholder = `integrante ${i}`;
        inputNuevo.classList = "edad form-control";
        labelNuevo.textContent = `Ingrese la edad`;
        labelNuevo.classList = "form-label col-12";

        $contenedorInputs.appendChild(labelNuevo);
        labelNuevo.appendChild(inputNuevo);
    }
}

function manejarErroresEdades(erroresEdades) {
    vaciarErroresAnteriores();

    let contadorErrores = 0;
    const edades = Object.keys(erroresEdades);

    edades.forEach(edad => {
        const error = erroresEdades[edad];

        if (error) {
            contadorErrores++;
            mostrar($contenedorErrores)
            $contenedorErrores.textContent = "Algunos inputs tienen valores equivocados, por favor, revisalos."


            conseguirInputPorValor(edad).forEach(input => {
                input.classList.add("input-error");

                //crea y suma texto debajo del input
                let textoError = document.createElement("p");
                textoError.textContent = error;
                textoError.classList = "form-text text-danger"
                input.after(textoError)
            });

        } else {
            conseguirInputPorValor(edad).forEach(error => error.classList.remove("input-error"))
            document.querySelectorAll(".form-text").forEach(texto => texto.remove())
        }
    }
    );

    return contadorErrores;
}

function vaciarErroresAnteriores() {
    $contenedorErrores.innerHTML = "";
    document.querySelectorAll(".form-text").forEach(texto => texto.remove())
}

function vaciarContenedorInputs() {
    $contenedorInputs.innerHTML = "";
}

const $botonCantidad = document.querySelector("#boton-cantidad");
const $botonCalcular = document.querySelector("#calculo-edades");
const $botonReinicio = document.querySelector("#reinicio");
const $botonReinicioGeneral = document.querySelector("#reinicio-general");

const $mensajeResultado = document.querySelector("#mensaje");
const $contenedorInputs = document.querySelector("#contenedor-inputs-nuevos");
const $contenedorErrores = document.querySelector("#errores");

$botonCantidad.onclick = function () {
    vaciarContenedorInputs();

    const cantidadIntegrantes = document.querySelector("#integrantes").value;
    let esExito = validarCantidadIntegrantes(cantidadIntegrantes) === "";

    if (esExito) {
        document.querySelector("#integrantes").classList.remove("input-error");
        esconder($contenedorErrores);
        esconder($mensajeResultado);

        crearInputLabels(cantidadIntegrantes);
        if ($botonCalcular.classList.contains("oculto")) {
            mostrar($botonCalcular);
            mostrar($botonReinicio);
        }

    } else {
        const textoError = (validarCantidadIntegrantes(cantidadIntegrantes));
        manejarErroresCantidad(textoError, document.querySelector("#integrantes"));
    }

    return false;
}

$botonCalcular.onclick = function () {

    let edadesIntegrantes = guardarEdadesIntegrantes(document.querySelectorAll(".edad"));
    const erroresEdades = {};

    edadesIntegrantes.forEach(edad => {
        erroresEdades[edad] = validarEdadIntegrante(edad);
    })

    let esExito = manejarErroresEdades(erroresEdades) === 0;

    if (esExito) {
        esconder($contenedorErrores);
        esconder($botonCalcular);
        esconder($botonReinicio);

        document.querySelectorAll(".edad").forEach(elemento => elemento.classList.remove("input-error"));

        mostrar($mensajeResultado)
        document.querySelector("#edad-mayor").textContent = devolverNumeroMayor(edadesIntegrantes);
        document.querySelector("#edad-menor").textContent = devolverNumeroMenor(edadesIntegrantes);
        document.querySelector("#edad-promedio").textContent = devolverPromedio(edadesIntegrantes);
    }

    return false;
}

$botonReinicioGeneral.onclick = function () {
    document.querySelector("#integrantes").value = "";
    vaciarContenedorInputs();
    esconder($botonCalcular);
    esconder($botonReinicio);
    esconder($mensajeResultado);
    esconder($contenedorErrores);

    return false;
}

$botonReinicio.onclick = function () {
    document.querySelectorAll(".edad").forEach((inputEdad) => inputEdad.value = "")
}
