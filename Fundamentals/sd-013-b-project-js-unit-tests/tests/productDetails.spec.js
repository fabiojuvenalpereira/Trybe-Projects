const assert = require('assert');
const productDetails = require('../src/productDetails');

/*
  Dadas duas strings que representam nomes de produtos, retorne um array contendo dois objetos com os detalhes dos respectivos produtos.

  Parâmetros:
  - Uma string;
  - Uma string;

  Comportamento:
  productDetails('Alcool gel', 'Máscara') // Retorna:
  [
    {
      name: 'Alcool gel'
      details: {
        productId: 'Alcool gel123'
      }
    },
    {
      name: 'Máscara'
      details: {
        productId: 'Máscara123'
      }
    }
  ]

  OBS: Lembre-se que você não precisa se preocupar com o describe e o it por enquanto, isso será aprendido posteriormente.
*/

describe('6 - Implemente os casos de teste para a função `productDetails`', () => {
  it('Verifica se a função `productDetails` tem o comportamento esperado', () => {
    // assert.fail();
    // ESCREVA SEUS TESTES ABAIXO:
    const productTest = productDetails('Alcool gel', 'Máscara');
    // Teste que o retorno da função é um array.
    assert.ok(Array.isArray(productTest));
    // Teste que o array retornado pela função contém dois itens dentro.
    assert.strictEqual(productTest.length, 2);
    // Teste que os dois itens dentro do array retornado pela função são objetos.
    productTest.forEach((product) => {
      assert.strictEqual(typeof(product), 'object');
    });
    // Teste que os dois objetos são diferentes entre si.
    const obj1 = productTest[0];
    const obj2 = productTest[1];
    assert.notDeepStrictEqual(obj1,obj2);
    // Teste que os dois productIds terminam com 123.
    assert.deepStrictEqual(obj1.details.productId.endsWith('123'), obj2.details.productId.endsWith('123'));
  });
});
