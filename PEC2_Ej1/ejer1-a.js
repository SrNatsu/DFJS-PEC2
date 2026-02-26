// Función findOne - Recibe como parámetros: una lista (list), un par llave-valor (key, value) y dos funciones callback (onSuccess, onError)
const findOne = (list, { key, value }, { onSuccess, onError }) => {
  // Se añade un temporizador de 2s que realiza las siguientes acciones:
  setTimeout(() => {
    // Recupera el elemento de la lista donde el elemento en la posición key coincida con el valor
    const element = list.find((element) => element[key] === value);
    // Si el elemento existe, se ejecuta la función onSuccess, en caso contrario, se ejecuta la función onError
    element ? onSuccess(element) : onError({ msg: "ERROR: Element Not Found" });
  }, 2000);
};

// Función onSuccess (callback) - Recibe un nombre (name) y lo muestra por consola.
const onSuccess = ({ name }) => console.log(`user: ${name}`);

// Función onError (callback) - Recibe un mensaje (msg) y lo muestra por consola
const onError = ({ msg }) => console.log(msg);

// Lista de usuarios (objetos con las propiedades name y rol)
const users = [
  {
    name: "Carlos",
    rol: "Teacher",
  },
  {
    name: "Ana",
    rol: "Boss",
  },
];

// Muestra por consola "findOne success"
console.log("findOne success");

// Llama a la función findOne pasándole los parámetros necesarios
findOne(users, { key: "name", value: "Carlos" }, { onSuccess, onError });

// Muestra por consola "findOne error"
console.log("findOne error");

// Llama a la función findOne pasándole los parámetros necesarios
findOne(users, { key: "name", value: "Fermin" }, { onSuccess, onError });

/*
findOne success
findOne error
 //wait 2 seconds
user: Carlos
ERROR: Element Not Found
*/
