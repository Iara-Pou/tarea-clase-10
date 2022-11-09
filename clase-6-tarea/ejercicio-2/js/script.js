function mostrarBotonCalcular() {
    $botonCalcular.classList.remove("oculto");
}

function esconderBotonCalcular() {
    $botonCalcular.classList.add("oculto");
}

function borrarElementos() {
    $contenedor.innerHTML = "";
}

function esconderMensaje() {
    $mensaje.classList.add("oculto");
}

function crearInputLabels(elementoPadre) {

    let labelNuevo = document.createElement("label");
    let inputNuevo = document.createElement("input");

    inputNuevo.classList.add("salario");
    labelNuevo.textContent = `ingresá su salario anual: `;

    elementoPadre.appendChild(labelNuevo);
    labelNuevo.appendChild(inputNuevo);
}

function guardarSalariosEnArray(inputs) {
    const array = [];
    for (let i = 0; i < inputs.length; i++) {
        array[i] = inputs[i].value;
    }
    return array;
}

function conseguirInputPorValor(valor){
    const $inputs = document.querySelectorAll("input");
    let resultado = [];
    for(let i=0; i<$inputs.length; i++)
        if($inputs[i].value === valor)
            resultado.push($inputs[i]);
            
    return resultado;
}

function borrarErroresAnteriores(){
    document.querySelector("#errores").textContent = "";
}

const $contenedor = document.querySelector("#contenedor-inputs-nuevos")
const $mensaje = document.querySelector("#calculo");

const $botonSumarIntegrante = document.querySelector("#sumar-integrante");
const $botonQuitarIntegrante = document.querySelector("#restar-integrante");
const $botonCalcular = document.querySelector("#calcular-salario");
const $botonReiniciar = document.querySelector("#reiniciar")

$botonQuitarIntegrante.onclick = function () {
    $contenedor.removeChild($contenedor.lastChild);
    if ($contenedor.innerHTML === "") {
        esconderBotonCalcular();
    }
    return false;
}

$botonReiniciar.onclick = function () {
    borrarElementos();
    esconderBotonCalcular();
    esconderMensaje();
    return false;
}

$botonSumarIntegrante.onclick = function () {

    if ($mensaje.innerHTML !== "") {
        esconderMensaje();
    }

    crearInputLabels($contenedor);
    mostrarBotonCalcular();

    return false;
}

$botonCalcular.onclick = function () {
    let salarios = guardarSalariosEnArray(document.querySelectorAll(".salario"));

    let erroresSalarios = {};
    salarios.forEach(salario=>{
        erroresSalarios[salario] = validarSalario(salario);
    })

    let esExito = manejarErrores(erroresSalarios) === 0;

    if (esExito) {

        $mensaje.classList.remove("oculto");
        document.querySelector("#mayor-salario").textContent = devolverNumeroMayor(salarios);
        document.querySelector("#menor-salario").textContent = devolverNumeroMenor(salarios);
        document.querySelector("#promedio-salario").textContent = devolverPromedio(salarios);
        document.querySelector("#promedio-mensual-salario").textContent = calcularPromedioMensual(salarios);

        esconderBotonCalcular();

    } 

    return false;
}

function manejarErrores(erroresSalarios) {
    borrarErroresAnteriores();

    let $contenedorErrores = document.querySelector("#errores")
    let contadorErrores = 0;
    const salarios = Object.keys(erroresSalarios);

    salarios.forEach(salario => {
        const error = erroresSalarios[salario];

        if (error) {
            contadorErrores++;

            let textoError = document.createElement("p");
            textoError.textContent= error;
            $contenedorErrores.appendChild(textoError);
            
            conseguirInputPorValor(salario).forEach(error => error.classList.add("error"));

        } else {
            conseguirInputPorValor(salario).forEach(error => error.classList.remove("error"));
        }

    })

    return contadorErrores;

}


