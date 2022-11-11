function mostrar(elemento) {
    elemento.classList.remove("oculto");
}

function esconder(elemento) {
    elemento.classList.add("oculto");
}

function borrarElementos() {
    $contenedorInputs.innerHTML = "";
}

function esconderBotonesRemover() {
    document.querySelectorAll(".boton-remover").forEach(botonRemover => esconder(botonRemover));
}

function mostrarBotonesRemover() {
    document.querySelectorAll(".boton-remover").forEach(botonRemover => mostrar(botonRemover))
}

function crearInputLabels(elementoPadre) {
    let labelNuevo = document.createElement("label");
    let inputNuevo = document.createElement("input");

    inputNuevo.classList = "salario form-control";
    labelNuevo.classList = "form-label col-sm-9";
    labelNuevo.textContent = `Ingresá su salario anual`;

    elementoPadre.appendChild(labelNuevo);
    labelNuevo.appendChild(inputNuevo);
}

function crearBotonRemover(elementoPadre) {
    let botonRemover = document.createElement("button");
    botonRemover.textContent = `Eliminar integrante`;
    botonRemover.classList = "boton-remover btn btn-danger col-sm-3 ";

    botonRemover.onclick = function () {
        elementoPadre.remove();
        if ($contenedorInputs.innerHTML === "") {
            esconder($botonCalcular);
            borrarErroresAnteriores();
        }
    }

    elementoPadre.appendChild(botonRemover);
}

function guardarSalariosEnArray(inputs) {
    const array = [];
    for (let i = 0; i < inputs.length; i++) {
        array[i] = inputs[i].value;
    }
    return array;
}

function conseguirInputPorValor(valor) {
    const $inputs = document.querySelectorAll("input");
    let resultado = [];
    for (let i = 0; i < $inputs.length; i++)
        if ($inputs[i].value === valor)
            resultado.push($inputs[i]);

    return resultado;
}

function borrarErroresAnteriores() {
    document.querySelector("#errores").textContent = "";
}

const $contenedorInputs = document.querySelector("#contenedor-inputs-nuevos");
const $contenedorErrores = document.querySelector("#errores");
const $mensajeResultado = document.querySelector("#calculo");

const $botonSumarIntegrante = document.querySelector("#sumar-integrante");
const $botonCalcular = document.querySelector("#calcular-salario");
const $botonReiniciar = document.querySelector("#reiniciar")

$botonReiniciar.onclick = function () {
    borrarElementos();
    esconder($botonCalcular);
    esconder($mensajeResultado);
    borrarErroresAnteriores();
    return false;
}

$botonSumarIntegrante.onclick = function () {

    if ($mensajeResultado.innerHTML !== "") {
        esconder($mensajeResultado);
    }
    mostrarBotonesRemover();
    crearIntegranteNuevo();

    return false;
}

function crearIntegranteNuevo() {
    const contenedorIntegrante = document.createElement("div");
    contenedorIntegrante.classList = "row";
    $contenedorInputs.appendChild(contenedorIntegrante);

    crearInputLabels(contenedorIntegrante);
    crearBotonRemover(contenedorIntegrante);
    mostrar($botonCalcular);
}

$botonCalcular.onclick = function () {
    let salarios = guardarSalariosEnArray(document.querySelectorAll(".salario"));

    let erroresSalarios = {};
    salarios.forEach(salario => {
        erroresSalarios[salario] = validarSalario(salario);
    })

    let esExito = manejarErrores(erroresSalarios) === 0;

    if (esExito) {
        esconderBotonesRemover();
        esconder($contenedorErrores);

        document.querySelector("#mayor-salario").textContent = devolverNumeroMayor(salarios);
        document.querySelector("#menor-salario").textContent = devolverNumeroMenor(salarios);
        document.querySelector("#promedio-salario").textContent = devolverPromedio(salarios);
        document.querySelector("#promedio-mensual-salario").textContent = calcularPromedioMensual(salarios);
        mostrar($mensajeResultado);

        esconder($botonCalcular);
    }

    return false;
}

function manejarErrores(erroresSalarios) {
    borrarErroresAnteriores();

    mostrar($contenedorErrores);
    let contadorErrores = 0;
    const salarios = Object.keys(erroresSalarios);

    salarios.forEach(salario => {
        const error = erroresSalarios[salario];

        if (error) {
            contadorErrores++;

            let textoError = document.createElement("p");
            textoError.textContent = error;
            $contenedorErrores.appendChild(textoError);

            conseguirInputPorValor(salario).forEach(error => error.classList.add("error"));

        } else {
            conseguirInputPorValor(salario).forEach(error => error.classList.remove("error"));
        }

    })

    return contadorErrores;

}
