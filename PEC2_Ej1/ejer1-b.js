// Función findOne - Recibe como parámetros: una lista (list) y un par llave-valor (key, value)
const findOne = (list, { key, value }) => {
  // Devuelve una nueva promesa
  return new Promise((resolve, reject) => {
    // Se añade un temporizador de 2s que realiza las siguientes acciones:
    setTimeout(() => {
      // Recupera el elemento de la lista donde el elemento en la posición key coincida con el valor
      const element = list.find((element) => element[key] === value);
      // Si el elemento existe, se resuelve la promesa, en caso contrario, se rechaza
      element ? resolve(element) : reject({ msg: "ERROR: Element Not Found" });
    }, 2000);
  });
};

// Función onSuccess - Recibe un nombre (name) y lo muestra por consola.
const onSuccess = ({ name }) => console.log(`user: ${name}`);
// Función onError - Recibe un mensaje (msg) y lo muestra por consola
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
findOne(users, { key: "name", value: "Carlos" }).then(onSuccess).catch(onError);

// Muestra por consola "findOne error"
console.log("findOne error");
// Llama a la función findOne pasándole los parámetros necesarios
findOne(users, { key: "name", value: "Fermin" }).then(onSuccess).catch(onError);
