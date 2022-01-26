const { species, employees, hours } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  return ids.map((id) => data.species.find((param) => param.id === id));
}

function getAnimalsOlderThan(animal, age) {
  return species
    .find((spec) => spec.name === animal)
    .residents.every((resident) => resident.age >= age);
}

function getEmployeeByName(employeeName) {
  return (employees.find(({ firstName, lastName }) =>
    firstName === employeeName || lastName === employeeName) || {}
  );
}
// nesta função caso o return não satisfaça a condição passada pelo find retorna automagicamente  o array vazio.

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return !!employees.find(({ managers }) => managers.includes(id));
}
//  o find nesta função busca e retorna o elemento ou undefined, logo em seguida o includes vai verificar e retornar true ou false.

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  const newObj = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newObj);
}

function countAnimals(speciesAgain) {
  const createObj = {};
  data.species.forEach((spec) => {
    createObj[spec.name] = spec.residents.length;
  });
  if (!speciesAgain) {
    return createObj;
  }
  const getIndividual = Object.entries(createObj)
    .find((element) => element[0] === speciesAgain);
  return getIndividual[1];
}

function makeCalc(entrantsAgain) {
  const { Adult, Child, Senior } = data.prices;
  const {
    Adult: adultEntrant = 0,
    Child: childEntrant = 0,
    Senior: seniorEntrant = 0,
  } = entrantsAgain;
  const getTotalValue = Adult * adultEntrant + Child * childEntrant + Senior * seniorEntrant;
  return getTotalValue;
}

function calculateEntry(entrants) {
  if (!entrants || Object.entries(entrants).length === 0) {
    return 0;
  }
  return makeCalc(entrants);
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  const days = Object.keys(hours);
  const newObj = {};
  days.forEach((day) => {
    if (hours[day].open === 0) {
      newObj[day] = 'CLOSED';
    } else {
      newObj[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    }
  });

  if (!dayName) {
    return newObj;
  }
  return { [dayName]: newObj[dayName] };
}

function findOldest(findSpecies) {
  let oldestSpecie;
  findSpecies.residents.forEach((spec) => {
    if (!oldestSpecie || spec.age > oldestSpecie.age) {
      oldestSpecie = spec;
    }
  });
  return oldestSpecie;
}

function getOldestFromFirstSpecies(id) {
  const emp = data.employees.find((employe) => id === employe.id)
    .responsibleFor.find((ids, index) => index === 0);
  const getSpecie = data.species.find((specie) => specie.id === emp);
  const getolder = findOldest(getSpecie);
  const { name, sex, age } = getolder;
  return [name, sex, age];
}

function increasePrices(percentage) {
  const percentageCalc = percentage / 100;
  const valueTochange = Object.entries(data.prices);
  let newObj = {};
  valueTochange.forEach((value) => {
    let [nwValue] = value;
    nwValue = parseFloat((value[1] + percentageCalc * value[1] + 0.001).toFixed(2));
    newObj = { [value[0]]: nwValue };
    Object.assign(data.prices, newObj);
  });
}

function animalsNames(arrayOfIds) {
  const arrRetunrn = [];
  const newarr = Array.from(arrayOfIds);
  newarr.forEach((id) => {
    const animal = data.species.find((specie) => specie.id === id);
    arrRetunrn.push(animal.name);
  });

  return arrRetunrn;
}

function getEmployeeCoverage(idOrName) {
  const getEmployeesNames = {};
  data.employees.forEach((employee) => {
    if (!idOrName
      || employee.firstName === idOrName
      || employee.lastName === idOrName
      || employee.id === idOrName) {
      const fullName = `${employee.firstName} ${employee.lastName}`;
      getEmployeesNames[fullName] = animalsNames(employee.responsibleFor);
    }
  });
  return getEmployeesNames;
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
