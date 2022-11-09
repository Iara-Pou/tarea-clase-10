function pruebaDevolverNumeroMayor() {
    console.assert(
        devolverNumeroMayor([1, 2, 3]) === 3, "Devolver mayor no está devolviendo el numero mayor."
    )
}

function pruebaDevolverNumeroMenor() {
    console.assert(
        devolverNumeroMenor([1, 2, 3]) === 1, "Devolver menor no está devolviendo el menor."
    )
}

function pruebaDevolverPromedio() {
    console.assert(
        devolverPromedio([2, 2, 2]) === 2, "Calcular promedio no está retornando el promedio del array."
    )
}

function pruebaDevolverPromedioMensual() {
    console.assert(
        calcularPromedioMensual([2, 2, 2]) === 2 / 12, "Calcular promedio no está retornando el promedio mensual del array."
    )
}

function pruebaValidarSalario() {
    console.assert(
        validarSalario(-10) === "El campo debe ser mayor a 0.", "Validar salario no está validando que el campo sea mayor a 0."
    )

    console.assert(
        validarSalario("aaa") === "El campo debe ser un número.", "Validar salario no está validando que el campo sea un número."
    )

    console.assert(
        validarSalario("") === "Todos los campos deben estar completos.", "Validar salario no está validando que el campo esté completo."
    )

    console.assert(
        validarSalario(12) === "", "Validar salario no está validando un input correcto."
    )
}

pruebaDevolverNumeroMayor();
pruebaDevolverNumeroMenor();
pruebaDevolverPromedio();
pruebaDevolverPromedioMensual();
pruebaValidarSalario();

