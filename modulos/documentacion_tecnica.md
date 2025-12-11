1. Definición explícita de datos de entrada (desde app.js):
    const n1 = parseInt(prompt("Ingresa el primer número: "));
    const n2 = parseInt(prompt("Ingresa el segundo número: "));
    const tipo = prompt("Escoja la operación que desea realizar o consultar: (suma, resta, multiplicacion, division): ");

1.1 Tipo de dato esperado
    n1 (primer número):
    Tipo esperado final: number (entero).
    Tipo real al capturarlo: string (lo devuelve prompt).
    Conversión: parseInt(...).

    n2 (segundo número):
    Tipo esperado final: number (entero).
    Tipo real al capturarlo: string.
    Conversión: parseInt(...).

    tipo (operación):
    Tipo esperado: string.
    Valores válidos exactos: "suma", "resta", "multiplicacion", "division".

1.2 Validaciones realizadas (desde ejercicio.js):
    export function validarNumero(num) {
        if (isNaN(num)) {
            throw new Error("El valor ingresado no es un número válido (Debes ingresar un valor numerico).");
        }
        return num;
    }

   -Sobre n1 y n2:
    Se convierten con parseInt.
    Luego se pasa el resultado a validarNumero(...).
    isNaN(num) verifica si lo convertido es un número válido.
    Si no lo es, se lanza un Error.

   -Sobre tipo:
    export function obtenerOperacion(tipo, callback) {
        const operaciones = ["suma", "resta", "multiplicacion", "division"];
        if (!operaciones.includes(tipo)) {
            callback(new Error("Operación no válida. Tienes que digitar el tipo de operación a ejecutar: suma, resta, multiplicacion o division."));
        } else {
            callback(null, tipo);
        }
    }
    Se compara el texto ingresado con el array operaciones usando .includes.
    Solo se acepta si coincide exactamente con uno de los elementos dentro del array.

1.3 Riesgos si el dato es incorrecto
   -Número inválido (puede ser: texto, vacío, símbolo, etc.):
    parseInt puede devolver NaN.
    validarNumero detecta el NaN y lanza un Error.

   -Operación inválida (p.ej. texto distinto):
    !operaciones.includes(tipo) será true.
    Se genera un Error en el callback.
    Sin esta validación, se caería en el default del switch.

   -División entre cero:
    Si num2 es 0 y tipo === "division", dividir generaría un valor no deseado.
    El código rechaza la Promesa con un Error para evitar ese caso.

1.4 Cómo se captura desde terminal
    import PromptSync from "prompt-sync";
    const prompt = PromptSync();
    El usuario escribe en la terminal y prompt(...) devuelve lo escrito como string.
    
2. Descripción del proceso:

2.1 Variables creadas y su propósito
   -En app.js:

    prompt: instancia de PromptSync, usada para leer desde terminal.

    n1: number(string) que contiene el primer número ingresado por el usuario.

    n2: number(string) que contiene el segundo número ingresado.

    tipo: string con el tipo de operación ingresado, ya sea suma, resta, etc.

    num1: número validado derivado de n1 tras parseInt + validarNumero.

    num2: número validado derivado de n2 tras parseInt + validarNumero.

    resultado: número final que devuelve ejecutarOperacion cuando la Promesa se resuelve.

   -En ejercicio.js:

    operaciones: array con las operaciones válidas.

    num (parámetro): valor recibido para validar si es número.

    tipo (parámetro): texto de la operación a validar o ejecutar.

2.2 Explicación detallada de cada condicional
   -Validación de número:
    if (isNaN(num)) {
        throw new Error("El valor ingresado no es un número válido (Debes ingresar un valor numerico).");
    }
    Si num no es un número, se lanza un Error para detener el flujo normal.
    Protege al programa de ejecutar operaciones con datos inválidos.

   -Validación de operación:
    if (!operaciones.includes(tipo)) {
        callback(new Error("Operación no válida. Tienes que digitar el tipo de operación a ejecutar: suma, resta, multiplicacion o division."));
    } else {
        callback(null, tipo);
    }
    Si tipo no está en la lista, se llama al callback con un Error.
    Si es válido, se llama al callback sin error (null) y se pasa la operación.

   -Validación de división por cero:
    case "division":
        if (num2 === 0) {
            reject(new Error("!OJO¡ No se puede dividir entre cero mi rey."));
        } else {
            resolve(num1 / num2);
        }
        break;
    Si num2 es 0, se rechaza la Promesa.
    Si no, se realiza la división normalmente.

   -Operación desconocida:
    default:
        reject(new Error("Operación desconocida."));
    Si el tipo no coincide con ninguno de los case, se rechaza la Promesa con un error genérico.

2.3 Justificación de los ciclos empleados
    No hay bucles explícitos (for, while, etc.)
    No son necesarios porque solo se procesa una operación por ejecución.
    La validación de operaciones se hace con .includes, que internamente recorre el array.

2.4 Análisis de mutabilidad e inmutabilidad
    n1, n2, tipo (en app.js):
    Declarados con "const" no se reasignan.
    Son inmutables a nivel de referencia (aunque sean strings, que también son inmutables).

    num1, num2:
    También se declaran con "const".
    Inmutables a nivel de referencia: una vez validados, no cambian.

    operaciones (array):
    Declarado con "const".
    No se modifica el contenido en tiempo de ejecución.
    Se usa como una lista fija de referencia.

    resultado:
    Se declara dentro del callback como "const".
    Solo se asigna una vez al resolverse la Promesa.

2.5 Operadores utilizados y motivo de uso
   -Aritméticos: +, -, *, /
    Usados para realizar las operaciones matemáticas según el tipo.

   -Lógicos / comparación:
    ! se usa para negación en !operaciones.includes(tipo).
    === se usa para comparación estricta (num2 === 0).
    .includes(...) se usa para verificación de pertenencia de un string en un array.

   -Otros:
    parseInt(...) se usa para convertir string a entero.
    isNaN(...) se usa para comprobar si un valor es “Not a Number”.

2.6 Justificación del tipo de función
   -validarNumero(num) es una función síncrona:
    La validación es inmediata y no requiere operaciones asíncronas.
    Lanzar un Error directamente simplifica el flujo.

   -obtenerOperacion(tipo, callback) es una función con callback:
    Modela el patrón clásico de Node.js (error primero: callback(error, resultado)).
    Permite practicar manejo de callbacks antes de entrar a Promesas.

   -ejecutarOperacion(num1, num2, tipo) es una función que retorna una Promesa:
    Encierra la operación en un flujo asíncrono.
    Permite usar async/await en app.js.
    Facilita el manejo de éxito/error con resolve/reject.

   -proyecto() es una función async:
    Se encarga de todo el flujo de lecturas, validaciones y operación final.
    Permite usar await sobre la Promesa de ejecutarOperacion.

2.7 Flujo de ejecución (paso a paso)
    1. Se importa PromptSync y se crea const prompt = PromptSync().
    2. Se importan validarNumero, obtenerOperacion, ejecutarOperacion desde ejercicio.js.
    3. Se define la función async function proyecto().
    4. Dentro de proyecto():
    5. Se pide n1 al usuario con prompt(...).
    6. Se pide n2 al usuario con prompt(...).
    7. Se pide tipo al usuario con prompt(...).
    8. Se convierten n1 y n2 con parseInt y se validan con validarNumero.
    9. Se llama a obtenerOperacion(tipo, async (error, operacion) => { ... }).
    10. Si hay error, se muestra el mensaje y se sale del callback.
    11. Si no, se llama a await ejecutarOperacion(num1, num2, operacion).
    12. Si la Promesa se resuelve, se muestra la operación, valores y resultado.
    13. Si se rechaza (por ejemplo, división entre cero), se captura el error y se muestra el mensaje.
    14. Cualquier error que se produzca fuera del callback (por ejemplo, en validación de números) es capturado por el try/catch de proyecto().
    15. Se llama a proyecto(); para iniciar la ejecución.

