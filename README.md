# 🔎 PEC 2 - Lenguajes de desarrollo front-end

Esta entrega contiene la resolución de la **PEC 2** de la asignatura **Desarrollo Front-end con Frameworks JavaScript** de la UOC. El objetivo principal es desarrollar código JavaScript usando las características modernas del estándar (ES6-ES12) , dominar la programación asíncrona y utilizar el patrón de arquitectura MVC en el desarrollo de una aplicación Web.

## 🚀 Despliegue
Puede ver y probar el ejercicio ***Expense Tracker*** en el siguiente enlace:

* [Expense Tracker](https://srnatsu.github.io/DFJS-PEC2/PEC2_Ej2/Ejer2-2-expense-tracker)

## 📂 Estructura del repositorio

El proyecto sigue estrictamente la estructura de carpetas solicitada en el enunciado:

```text
PEC2/
├── PEC2_Ej1/
├── PEC2_Ej2/
└── PEC2_Ej3/
```

## 📋 Descripción de los ejercicios

### 1. Asincronía (```PEC2_Ej1```)
Refactorización evolutiva de una función de búsqueda en un array, manejando la asincronía de cuatro formas distintas:

* ***Callbacks* (```ejer1-a.js```):** Documentación del flujo de ejecución usando callbacks tradicionales (```onSuccess```, ```onError```).

* **Promesas (```ejer1-b.js```)**: Sustitución de *callbacks* por objetos ```Promise``` consumidos mediante ```.then()``` y ```.catch()```.

* ***Async* / *Await* (```ejer1-c.js```):** Refactorización del consumo de promesas utilizando la sintaxis moderna ```async```/```await``` dentro de funciones asíncronas.

* **Ejecución en paralelo (```ejer1-d.js```):** Implementación de peticiones simultáneas utilizando ```Promise.all()``` para no bloquear la ejecución secuencial.

### 2. Arquitectura MVC usando VanillaJS (```PEC2_Ej2```)
Construcción de una aplicación de control de gastos (*Expense Tracker*) aplicando el patrón Modelo-Vista-Controlador en JavaScript puro, sin utilizar frameworks externos.

#### 2.1 Teoría del contexto (```PEC2_Solucion_Ejercicio_2a.md```)
* Explicación razonada sobre el problema con el cambio de contexto de ```this``` en JavaScript.
  
* Análisis de cómo el uso de fat-arrow de ES6 soluciona la pérdida de contexto léxico al pasar métodos como parámetros a los eventos de la vista.

#### 💰 2.2 *Expense Tracker* (```Ejer2-2-expense-tracker```)
Aplicación SPA completa para el control de ingresos y gastos.

* **Patrón MVC:** Separación estricta de la lógica en Modelo (estructura de datos anémica) , Vista (manipulación del DOM) , Servicio (lógica de negocio y estructuras de datos) y Controlador (intermediario).

* **Operaciones CRUD:** Implementación completa para crear, leer, editar y borrar registros de gastos. (Se añadió expresamente la funcionalidad de edición no incluida en el modelo base ).

* **Persistencia:** Almacenamiento de los datos de transacciones en el ```localStorage``` del navegador a través de la capa de servicio.

### 3. Métodos nativos de Arrays (```PEC2_Ej3```)
Resolución de algoritmos y manipulación de estructuras de datos utilizando programación funcional y métodos nativos del objeto ```Array```.

* **Métodos implementados:** Uso intensivo de métodos como ```.map()```, ```.filter()```, ```.reduce()```, ```.every()``` y ```.some()``` para transformar datos, sumar acumulados y validar matrices sin mutar los arrays originales.

* **Caso práctico (Zoo):** Combinación de múltiples métodos para extraer, cruzar y transformar datos complejos de un objeto (empleados, horarios de apertura y control de animales).

* **Testing:** Superación de todos los tests unitarios ejecutados mediante el framework Mocha (```npm install -g mocha```) logrando el estado de *passed* en todas las pruebas de los archivos ```core.js```.