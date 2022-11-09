function guardarEdadesIntegrantes(numeros) {
    const arrayNuevo = [];
    for (let i = 0; i < numeros.length; i++) {
        arrayNuevo[i] = numeros[i].value;
    }
    return arrayNuevo;
}

function manejarErroresCantidad(textoError, input) {
    $contenedorErrores.classList = "";

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
        inputNuevo.classList.add("edad");
        labelNuevo.textContent = `ingresá su edad: `;

        $contenedorInputs.appendChild(labelNuevo);
        labelNuevo.appendChild(inputNuevo);
    }

}

function manejarErroresEdades (erroresEdades){
    vaciarErroresAnteriores();

    let contadorErrores = 0;
    const edades = Object.keys(erroresEdades);

    edades.forEach(edad => {
        const error = erroresEdades[edad];

        if (error) {
            contadorErrores++;

            $contenedorErrores.classList.remove("oculto");

            let textoError = document.createElement("p");
            textoError.textContent = error;
            $contenedorErrores.appendChild(textoError);

            conseguirInputPorValor(edad).forEach(error => error.classList.add("input-error"));

        } else {
            conseguirInputPorValor(edad).forEach(error => error.classList.remove("input-error"));
        }

    })

    return contadorErrores;
}

function conseguirInputPorValor(valor){
    const $inputs = document.querySelectorAll("input");

    let resultado = [];
    for(let i=0; i<$inputs.length; i++)
        if($inputs[i].value === valor)
            resultado.push($inputs[i]);

    return resultado;
}

function esconderErrores() {
    $contenedorErrores.classList = "oculto"
}

function vaciarErroresAnteriores(){
    $contenedorErrores.innerHTML="";
}

function vaciarContenedorInputs() {
    $contenedorInputs.innerHTML = "";
}

function esconderMensajeFinal() {
    let $mensaje = document.querySelector("#mensaje");
    $mensaje.classList = "oculto";
}

function esconderBotones() {
    $botonCalcular.classList = "oculto";
    $botonReinicio.classList = "oculto";
}

function mostrarBotones() {
    $botonCalcular.classList = " ";
    $botonReinicio.classList = " ";
}


const $botonCantidad = document.querySelector("#boton-cantidad");
const $botonCalcular = document.querySelector("#calculo-edades");
const $botonReinicio = document.querySelector("#reinicio");
const $botonReinicioGeneral = document.querySelector("#reinicio-general");

let $contenedorInputs = document.querySelector("#contenedor-inputs-nuevos");
let $contenedorErrores = document.querySelector("#errores");

$botonCantidad.onclick = function () {
    vaciarContenedorInputs();

    const cantidadIntegrantes = document.querySelector("#integrantes").value;
    let esExito = validarCantidadIntegrantes(cantidadIntegrantes) === "";

    if (esExito) {
        document.querySelector("#integrantes").classList = "";
        esconderErrores();
        esconderMensajeFinal();
        
        crearInputLabels(cantidadIntegrantes);
        if ($botonCalcular.classList.contains("oculto")) {
            mostrarBotones();
        }

    } else {
        const textoError = (validarCantidadIntegrantes(cantidadIntegrantes));
        manejarErroresCantidad(textoError, document.querySelector("#integrantes"));
    }

    return false;
}

$botonCalcular.onclick = function () {

    let $mensaje = document.querySelector("#mensaje");
    let edadesIntegrantes = guardarEdadesIntegrantes(document.querySelectorAll(".edad"));

    const erroresEdades = {};

    edadesIntegrantes.forEach(edad => {
            erroresEdades[edad] = validarEdadIntegrante(edad);
    })

    let esExito = manejarErroresEdades(erroresEdades) === 0;

    if (esExito) {
        esconderErrores();
        esconderBotones();

        document.querySelectorAll(".edad").forEach(elemento => elemento.classList.remove("input-error"));

        $mensaje.classList = "";
        document.querySelector("#edad-mayor").textContent = devolverNumeroMayor(edadesIntegrantes);
        document.querySelector("#edad-menor").textContent = devolverNumeroMenor(edadesIntegrantes);
        document.querySelector("#edad-promedio").textContent = devolverPromedio(edadesIntegrantes);
    } 

    return false;
}

$botonReinicioGeneral.onclick = function () {
    document.querySelector("#integrantes").value = "";
    esconderBotones();
    vaciarContenedorInputs();
    esconderMensajeFinal();
    esconderErrores();

    return false;
}

