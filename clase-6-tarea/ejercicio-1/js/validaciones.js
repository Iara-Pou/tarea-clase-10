function validarCantidadIntegrantes(cantidad){
    
    if (cantidad === ""){
        return "Debe ingresar por lo menos 1 carácter.";
    }

    if(cantidad < 0){
        return "La cantidad debe ser mayor a cero."
    }

    if(! /^[0-9]+$/.test(cantidad)){
        return "La cantidad debe ser un número entero."
    }

    return "";
}

function validarEdadIntegrante(edad){
    
    if (edad <= 0){
        return "Todos los campos deben tener un numero positivo ingresado."
    }

    if(! /^[0-9]+$/.test(edad)){
        return "El campo debe tener un número entero ingresado."
    }

    return "";
}
