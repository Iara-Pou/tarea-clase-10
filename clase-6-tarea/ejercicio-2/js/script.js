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

function crearBotonRemover(elementoPadre) {
    let botonRemover = document.createElement("button");
    botonRemover.textContent = `Eliminar integrante`;
    botonRemover.classList="boton-remover ";

    botonRemover.onclick = function (){
        elementoPadre.remove();
        if($contenedor.innerHTML === ""){
            esconderBotonCalcular();
        }
    }

    elementoPadre.appendChild(botonRemover);
}

function esconderBotonesRemover (){
    const $botonesRemover = document.querySelectorAll(".boton-remover");
    $botonesRemover.forEach(botonRemover => botonRemover.classList.add("oculto"))
}

function mostrarBotonesRemover (){
    const $botonesRemover = document.querySelectorAll(".boton-remover");
    $botonesRemover.forEach(botonRemover => botonRemover.classList.remove("oculto"))
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
const $botonCalcular = document.querySelector("#calcular-salario");
const $botonReiniciar = document.querySelector("#reiniciar")

$botonReiniciar.onclick = function () {
    borrarElementos();
    esconderBotonCalcular();
    esconderMensaje();
    borrarErroresAnteriores();
    return false;
}

$botonSumarIntegrante.onclick = function () {

    if ($mensaje.innerHTML !== "") {
        esconderMensaje();
    }
    mostrarBotonesRemover();
    crearIntegranteNuevo();

    return false;
}

function crearIntegranteNuevo(){
    const contenedorIntegrante = document.createElement("div");
    $contenedor.appendChild(contenedorIntegrante);

    crearInputLabels(contenedorIntegrante);
    crearBotonRemover(contenedorIntegrante);
    mostrarBotonCalcular();
}

$botonCalcular.onclick = function () {
    let salarios = guardarSalariosEnArray(document.querySelectorAll(".salario"));

    let erroresSalarios = {};
    salarios.forEach(salario=>{
        erroresSalarios[salario] = validarSalario(salario);
    })

    let esExito = manejarErrores(erroresSalarios) === 0;

    if (esExito) {
        esconderBotonesRemover();

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


