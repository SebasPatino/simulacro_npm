import PromptSync from "prompt-sync";

const prompt = PromptSync()

// Importamos las funciones del módulo donde están las validaciones y la lógica de operaciones
// validarNumero: asegura que el valor sea numérico
// obtenerOperacion: valida que el tipo de operación exista (usa callback)
// ejecutarOperacion: ejecuta la operación y devuelve una Promesa
import { validarNumero, obtenerOperacion, ejecutarOperacion } from "./modulos/ejercicio.js";

// Se define una función asíncrona que se encarga del todo el flujo del programa
// Se usa async porque dentro ejecutaremos Promesas con 'await'
async function proyecto() {
    try {
        // Se solicita al usuario que ingrese el primer número.
        // 'prompt' muestra el mensaje en la terminal y devuelve lo que el usuario escribe como texto (string).
        // 'parseInt(prompt)' convierte ese texto a un número entero.
        const n1 = parseInt(prompt("Ingresa el primer número: "));
        // Se solicita al usuario que ingrese el segundo número.
        // Igual que arriba: prompt devuelve un string y parseInt lo transforma en número entero.
        const n2 = parseInt(prompt("Ingresa el segundo número: "));
        // Se solicita al usuario que escriba el tipo de operación que quiere realizar.
        // En este caso no usamos parseInt porque lo que esperamos es un texto (string).
        // El usuario debe escribir exactamente: "suma", "resta", "multiplicacion" o "division".
        // Ese texto se guarda en la variable tipo.
        const tipo = prompt("Escoja la operación que desea realizar o consultar: (suma, resta, multiplicacion, division): ");

        // validarNumero lanza un Error si el dato no es numérico (isNaN)
        const num1 = validarNumero(n1);
        const num2 = validarNumero(n2);

        // Primer paso con callback: validamos que la operación exista
        // 'obtenerOperacion' recibe el string 'tipo' y un callback con la forma (error, operacion)
        obtenerOperacion(tipo, async (error, operacion) => {
            // Si la operación no es válida, 'error' tendrá un Error y se notifica al usuario
            if (error) {
                console.error(error.message);
                return;     // salimos del flujo sin bloquear el programa
            }

            try {
                // Ejecución de la operación como Promesa, usando async/await
                // 'ejecutarOperacion' retorna una Promesa que se resuelve con el resultado numérico
                // o se rechaza si ocurre un error (por ejemplo división entre cero)
                const resultado = await ejecutarOperacion(num1, num2, operacion);

                // Salida clara al usuario con toda la información requerida
                console.log(`
Operación seleccionada: ${operacion}
Valores ingresados: ${num1}, ${num2}
Resultado: ${resultado}`);
            } catch (error) {
                // Captura de errores de la Promesa (p.ej. división entre cero)
                console.error(error.message);
            }
        });
    } catch (error) {
        // Captura de cualquier error inesperado en el flujo del programa (p.ej. al validar números)
        // Mensaje personalizado por cada error inesperado
        console.error("¡Quieto papi!:", error.message);
    }
}

// Se llama a la función principal para iniciar el programa
proyecto();