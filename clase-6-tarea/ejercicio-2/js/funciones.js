function calcularPromedioMensual(array) {
    const MESES_EN_UN_ANIO = 12;
    return devolverPromedio(array) / MESES_EN_UN_ANIO;
}

function validarSalario(salario){
    if(salario === ""){
        return "Todos los campos deben estar completos.";
    }

    if(salario <=0){
        return "El campo debe ser mayor a 0.";
    }

    if(! /^[0-9]+$/.test(Math.trunc(salario))){
        return "El campo debe ser un número.";
    }

    return "";
}
