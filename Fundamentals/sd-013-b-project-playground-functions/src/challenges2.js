// Desafio 10
function organiza(a, b) {
  if (a.tech < b.tech) {
    return -1;
  }
  return 1;
}

function techList(array, name) {
  let att = [];
  for (let index = 0; index < array.length; index += 1) {
    let obegeto = {
      tech: '',
      name: name,
    };
    obegeto.tech = array[index];
    att[index] = obegeto;
  }
  att.sort(organiza);
  if (att == 0) {
    return 'Vazio!';
  }
  return att;
}

// Desafio 11
function generatePhoneNumber() {
  // seu código aqui
}

// Desafio 12
function triangleCheck() {
  // seu código aqui
}

// Desafio 13
function hydrate() {
  // seu código aqui
}

module.exports = {
  generatePhoneNumber,
  techList,
  hydrate,
  triangleCheck,
};
