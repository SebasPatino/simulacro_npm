// Exportamos funciones con ES Modules para que puedan ser importadas en app.js
// En este archivo se encuentran la lógica de validación y la ejecución de operaciones

// Exportamos la función (síncrona) 'validarNumero' para que pueda ser usada en otros archivos (por ejemplo en app.js).
// Su objetivo es asegurarse de que el valor recibido realmente sea un número válido.
export function validarNumero(num) {
    // La función isNaN(num) devuelve true si 'num' NO es un número (NaN = Not a Number).
    // Aquí comprobamos si el valor ingresado no es numérico.
    if (isNaN(num)) {
        // Si el valor no es un número, lanzamos un Error.
        // 'throw new Error(...)' detiene la ejecución normal y envía un mensaje claro al usuario.
        // Este mensaje explica qué salió mal y qué debe hacer: ingresar un valor numérico.
        throw new Error("El valor ingresado no es un número válido (Debes ingresar un valor numerico).");
    }
    // Si el valor sí es un número válido, simplemente lo devolvemos.
    // Esto permite que el programa continúe y use ese número en las operaciones matemáticas.
    return num;
}

// Exportamos la función 'obtenerOperacion' para que pueda ser usada en otros archivos (por ejemplo en app.js).
// Esta función recibe dos parámetros:
//  - tipo: el texto que el usuario escribió indicando la operación (ej. "suma")
//  - callback: una función que se ejecutará después de validar el tipo de operación
export function obtenerOperacion(tipo, callback) {
    // Definimos un array con las operaciones válidas que el programa reconoce.
    // Este array sirve como lista de referencia para comparar lo que el usuario escribió.
    const operaciones = ["suma", "resta", "multiplicacion", "division"];
    // Validamos si el valor 'tipo' está dentro del array 'operaciones'.
    // El método .includes() devuelve true si encuentra el elemento, false si no.
    if (!operaciones.includes(tipo)) {
        // Si la operación NO está en la lista, llamamos al callback con un Error.
        // Esto significa que el flujo se interrumpe y se muestra un mensaje claro al usuario.
        callback(new Error("Operación no válida. Tienes que digitar el tipo de operación a ejecutar: suma, resta, multiplicacion o division."));
    } else {
        // Si la operación SÍ está en la lista, llamamos al callback sin error (null)
        // y pasamos el tipo de operación válido para que el programa continúe.
        callback(null, tipo);
    }
}

// Exportamos la función 'ejecutarOperacion' para que pueda ser usada en otros archivos (por ejemplo en app.js).
// Esta función recibe tres parámetros:
//   - num1: primer número validado
//   - num2: segundo número validado
//   - tipo: el texto de la operación que el usuario eligió ("suma", "resta", etc.)
export function ejecutarOperacion(num1, num2, tipo) {
    // Retornamos una Promesa porque queremos manejar la operación de forma asíncrona.
    // Esto permite usar 'then/catch' o 'async/await' en el archivo principal.
    return new Promise((resolve, reject) => {
        // Usamos un switch para decidir qué operación ejecutar según el valor de 'tipo'.
        switch (tipo) {
            case "suma":
                // Si el tipo es "suma", resolvemos la Promesa con el resultado de num1 + num2.
                resolve(num1 + num2);
                break;
            case "resta":
                // Si el tipo es "resta", resolvemos la Promesa con el resultado de num1 - num2.
                resolve(num1 - num2);
                break;
            case "multiplicacion":
                // Si el tipo es "multiplicacion", resolvemos la Promesa con el resultado de num1 * num2.
                resolve(num1 * num2);
                break;
            case "division":
                // Si el tipo es "division", primero validamos que el divisor (num2) no sea cero.
                if (num2 === 0) {
                    // Si num2 es 0, rechazamos la Promesa con un Error personalizado.
                    reject(new Error("!OJO¡ No se puede dividir entre cero mi rey."));
                } else {
                    // Si num2 es distinto de 0, resolvemos la Promesa con el resultado de num1 / num2.
                    resolve(num1 / num2);
                }
                break;
            default:
                // Si 'tipo' no coincide con ninguno de los casos anteriores,
                // rechazamos la Promesa con un Error indicando que la operación es desconocida.
                reject(new Error("Operación desconocida."));
        }
    });
}