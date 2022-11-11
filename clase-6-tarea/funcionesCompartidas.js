function devolverPromedio(numeros) {
    let totalSuma = 0;
    for (let i = 0; i < numeros.length; i++) {
        totalSuma += Number(numeros[i]);
    }
    return totalSuma / numeros.length;
}

function devolverNumeroMenor(numeros) {
    let numeroMenor = Number(numeros[0]);
    for (let i = 0; i < numeros.length; i++) {
        if (numeros[i] < numeroMenor) {
            numeroMenor = Number(numeros[i]);
        }
    }
    return numeroMenor;
}

function devolverNumeroMayor(numeros) {
    let numeroMayor = Number(numeros[0]);
    for (let i = 0; i < numeros.length; i++) {
        if (numeros[i] > numeroMayor) {
            numeroMayor = Number(numeros[i]);
        }
    }
    return numeroMayor;
}

function mostrar(elemento) {
    elemento.classList.remove("oculto");
}

function esconder(elemento) {
    elemento.classList.add("oculto");
}

function conseguirInputPorValor(valor) {
    const $inputs = document.querySelectorAll("input");

    let resultado = [];
    for (let i = 0; i < $inputs.length; i++)
        if ($inputs[i].value === valor)
            resultado.push($inputs[i]);

    return resultado;
}
