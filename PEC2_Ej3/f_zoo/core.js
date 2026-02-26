const data = require("./data.js");

function entryCalculator(entrants) {
  const prices = data.prices;

  if (!entrants || Object.keys(entrants).length === 0) {
    return 0;
  }

  return Object.keys(entrants)
    .filter((group) => prices[group] && entrants[group])
    .map((group) => prices[group] * entrants[group])
    .reduce((acc, price) => acc + price, 0);
}

function schedule(dayName) {
  const hours = data.hours;

  function formatTime(hour) {
    const period = hour >= 12 ? "pm" : "am";
    const newHour = hour % 12;
    return `${newHour}${period}`;
  }

  if (dayName) {
    return Object.keys(hours)
      .filter((day) => day === dayName)
      .map((day) => ({
        [day]:
          hours[day].open === 0 && hours[day].close === 0
            ? "CLOSED"
            : `Open from ${formatTime(hours[day].open)} until ${formatTime(
                hours[day].close,
              )}`,
      }))[0];
  }

  return Object.keys(hours)
    .map((day) => ({
      [day]:
        hours[day].open === 0 && hours[day].close === 0
          ? "CLOSED"
          : `Open from ${formatTime(hours[day].open)} until ${formatTime(
              hours[day].close,
            )}`,
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
}

function animalCount(species) {
  const animals = data.animals;

  if (species) {
    return animals
      .filter((animal) => animal.name === species)
      .map((animal) => animal.residents.length)[0];
  }

  return animals
    .map((animal) => ({ [animal.name]: animal.residents.length }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
}

function animalMap(options) {
  const animals = data.animals;

  if (!options) {
    return animals.reduce((acc, animal) => {
      if (!acc[animal.location]) {
        acc[animal.location] = [];
      }
      acc[animal.location].push(animal.name);
      return acc;
    }, {});
  }

  if (options.includeNames) {
    return animals.reduce((acc, animal) => {
      const residents = animal.residents.map((resident) => resident.name);

      if (!acc[animal.location]) {
        acc[animal.location] = [];
      }

      acc[animal.location].push({ [animal.name]: residents });

      if (options.sex) {
        const filteredResidents = animal.residents
          .filter((resident) => resident.sex === options.sex)
          .map((resident) => resident.name);

        if (filteredResidents.length === 0) {
          acc[animal.location] = acc[animal.location].map((group) => {
            const animalName = Object.keys(group)[0];
            if (animalName === animal.name) {
              return { [animalName]: [] };
            }
            return group;
          });
        } else {
          acc[animal.location] = acc[animal.location].map((group) => {
            const animalName = Object.keys(group)[0];
            if (animalName === animal.name) {
              return { [animalName]: filteredResidents };
            }
            return group;
          });
        }
      }

      return acc;
    }, {});
  }

  return animals.reduce((acc, animal) => {
    if (!acc[animal.location]) {
      acc[animal.location] = [];
    }
    acc[animal.location].push(animal.name);
    return acc;
  }, {});
}

function animalPopularity(rating) {
  const animals = data.animals;

  if (!rating) {
    return animals.reduce((acc, animal) => {
      const animalRating = animal.popularity;

      if (!acc[animalRating]) {
        acc[animalRating] = [];
      }

      acc[animalRating].push(animal.name);

      return acc;
    }, {});
  }

  return animals
    .filter((animal) => animal.popularity === rating)
    .map((animal) => animal.name);
}

function animalsByIds(ids) {
  const animals = data.animals;

  if (!ids) {
    return [];
  }

  if (typeof ids === "string") {
    return animals.filter((animal) => animal.id === ids);
  }

  if (Array.isArray(ids)) {
    return animals.filter((animal) => ids.includes(animal.id));
  }
}

function animalByName(animalName) {
  const animals = data.animals;

  if (!animalName) {
    return {};
  }

  const matchingAnimals = animals.filter((animal) =>
    animal.residents.some((resident) => resident.name === animalName),
  );

  return matchingAnimals.map((animal) => {
    const resident = animal.residents.find(
      (resident) => resident.name === animalName,
    );
    return {
      name: resident.name,
      sex: resident.sex,
      age: resident.age,
      species: animal.name,
    };
  })[0];
}

function employeesByIds(ids) {
  const employees = data.employees;

  if (!ids) {
    return [];
  }

  if (typeof ids === "string") {
    return employees.filter((employee) => employee.id === ids);
  }

  return employees.filter((employee) => ids.includes(employee.id));
}

function managersForEmployee(idOrName) {
  const employees = data.employees;

  const employee = employees.find(
    (e) =>
      e.id === idOrName || e.firstName === idOrName || e.lastName === idOrName,
  );

  const managerIds = employee.managers;

  const managerNames = employees
    .filter((manager) => managerIds.includes(manager.id))
    .map((manager) => `${manager.firstName} ${manager.lastName}`);

  return {
    id: employee.id,
    firstName: employee.firstName,
    lastName: employee.lastName,
    managers: managerNames,
    responsibleFor: employee.responsibleFor,
  };
}

function employeeCoverage(idOrName) {
  const employees = data.employees;
  const animals = data.animals;

  const employee = employees.find(
    (e) =>
      e.id === idOrName || e.firstName === idOrName || e.lastName === idOrName,
  );

  if (!idOrName) {
    const coverage = {};
    employees.forEach((employee) => {
      const animalNames = employee.responsibleFor.map(
        (animalId) => animals.find((animal) => animal.id === animalId).name,
      );
      coverage[`${employee.firstName} ${employee.lastName}`] = animalNames;
    });
    return coverage;
  }

  const animalNames = employee.responsibleFor.map(
    (animalId) => animals.find((animal) => animal.id === animalId).name,
  );

  return { [`${employee.firstName} ${employee.lastName}`]: animalNames };
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalPopularity,
  animalsByIds,
  animalByName,
  employeesByIds,
  managersForEmployee,
  employeeCoverage,
};
