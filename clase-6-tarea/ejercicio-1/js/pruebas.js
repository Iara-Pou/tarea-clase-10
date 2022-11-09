function pruebaDevolverMayor(){
    console.assert(
        devolverNumeroMayor([1,2,3]) === 3, "Devolver mayor no está devolviendo el numero mayor."
    )
}

function pruebaDevolverMenor(){
console.assert(
    devolverNumeroMenor([1,2,3]) === 1, "Devolver menor no está devolviendo el menor."
)    
}

function pruebaDevolverPromedio(){
console.assert(
    devolverPromedio([2,2,2]) === 2, "Calcular promedio no está retornando el promedio del array."
)    
}

function pruebaValidarCantidadIntegrantes(){

    console.assert(
        validarCantidadIntegrantes("") === "Debe ingresar por lo menos 1 carácter.", 
        "validar cantidad integrantes no valida el caso en el que el usuario no ingresa nada al input."
    )

    console.assert(
        validarCantidadIntegrantes(-1) === "La cantidad debe ser mayor a cero.",
        "validar cantidad integrantes no valida que la cantidad sea un número positivo."
    )

    console.assert(
        validarCantidadIntegrantes(1.1) === "La cantidad debe ser un número entero.",
        "validar cantidad integrantes no valida que la cantidad sea un número entero."
    )

    console.assert(
        validarCantidadIntegrantes(1) === "",
        "validar cantidad integrantes no valida un input correcto."
    )
    
}

function pruebaValidarEdadIntegrante(){
console.assert(
    validarEdadIntegrante(-9) === "Todos los campos deben tener un numero positivo ingresado.", 
    "validar edad integrante no valida que la edad sea mayor a 0."
)

console.assert(
    validarEdadIntegrante("aaaaaa") === "El campo debe tener un número entero ingresado.",
    "validar edad integrante no valida que la edad sea un número."
)

console.assert(
    validarEdadIntegrante(8) === "",
    "validar edad integrante no valida una edad correcta."
)

}

//para la prueba de pasar un array de otro tipo a number, puedo poner que si ingreso [] con string, tiene que incluir Nan el nuevo, con includes()

pruebaDevolverMayor();
pruebaDevolverMenor();
pruebaDevolverPromedio();
pruebaValidarCantidadIntegrantes();
pruebaValidarEdadIntegrante();

