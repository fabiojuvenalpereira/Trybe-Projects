// Desafio 1 - Projetinho
function compareTrue(param1, param2) {
  if (param1 && param2 === true) {
    return true;
  }
  return false;
}

// Desafio 2
let result = null;

function calcArea(base, height) {
  result = (base * height) / 2;
  return result;
}

// Desafio 3
function splitSentence(string) {
  let str = string.split(' ');
  return str;
}

// Desafio 4
function concatName(listArray) {
  let concatenation = '';
  let space = ', ';
  concatenation = listArray[listArray.length - 1] + space + listArray[0];
  return concatenation;
}

// Desafio 5
function footballPoints(wins, ties) {
  let points = 0;
  wins *= 3;
  points = wins + ties;
  return points;
}

// Desafio 6
function findBiggestValue(valores) {
  let mValue = valores[0];
  for (let index = 0; index < valores.length; index += 1) {
    if (valores[index] > mValue) {
      mValue = valores[index];
    }
  }
  return mValue;
}

function highestCount(valores) {
  let countValue = 0;
  let maxValue = findBiggestValue(valores);
  for (let indexX = 0; indexX < valores.length; indexX += 1) {
    if (maxValue === valores[indexX]) {
      countValue += 1;
    }
  }
  return countValue;
}

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  let diff1 = Math.abs(cat1 - mouse);
  let diff2 = Math.abs(cat2 - mouse);
  let def = null;
  if (diff1 < diff2) {
    def = 'cat1';
  } else if (diff1 > diff2) {
    def = 'cat2';
  } else {
    def = 'os gatos trombam e o rato foge';
  }
  return def;
}

// Desafio 8
function fizzBuzz(array) {
  let secArray = [];
  for (let index = 0; index < array.length; index += 1) {
    if (array[index] % 5 === 0 && array[index] % 3 !== 0) {
      secArray.push('buzz');
    } else if (array[index] % 3 === 0 && array[index] % 5 !== 0) {
      secArray.push('fizz');
    } else if (array[index] % 3 === 0 || array[index] % 5 === 0) {
      secArray.push('fizzBuzz');
    } else {
      secArray.push('bug!');
    }
  }
  return secArray;
}

// Desafio 9
function cripto(letra) {
  if (letra === 'a') {
    letra = 1;
  } else if (letra === 'e') {
    letra = 2;
  } else if (letra === 'i') {
    letra = 3;
  } else if (letra === 'o') {
    letra = 4;
  } else if (letra === 'u') {
    letra = 5;
  }
  return letra;
}

function encode(texto) {
  let encoding = '';
  let letra = '';
  for (let index = 0; index < texto.length; index += 1) {
    letra = texto[index];
    letra = cripto(letra);
    encoding += letra;
  }
  return encoding;
}
function decriptando(decNumb) {
  let numdecript = '';
  if (decNumb === '1') {
    decNumb = 'a';
  } else if (decNumb === '2') {
    decNumb = 'e';
  } else if (decNumb === '3') {
    decNumb = 'i';
  } else if (decNumb === '4') {
    decNumb = 'o';
  } else if (decNumb === '5') {
    decNumb = 'u';
  }
  numdecript = decNumb;
  return numdecript;
}

function decode(decrpt) {
  let decoding = '';
  let recebevalue = '';
  let decNumb = '';
  for (let indexX = 0; indexX < decrpt.length; indexX += 1) {
    decNumb = decrpt[indexX];
    recebevalue = decriptando(decNumb);
    decoding += recebevalue;
  }
  return decoding;
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
};
