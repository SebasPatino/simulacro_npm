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

1.3 Riesgos si el dato es incorrecto

1.4 Cómo se captura desde terminal

2. Descripción del proceso:
o Variables creadas y su propósito
o Explicación detallada de cada condicional
o Justificación de los ciclos empleados
o Análisis de mutabilidad e inmutabilidad
o Operadores utilizados y motivo de uso
o Justificación del tipo de función
o Flujo de ejecución (paso a paso)