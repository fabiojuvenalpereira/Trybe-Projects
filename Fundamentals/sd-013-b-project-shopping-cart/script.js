const url = 'https://api.mercadolibre.com/sites/MLB/search?q=';
const forClick = document.querySelector('body');
const addInOl = document.querySelector('.cart__items');
const clean = document.querySelector('.empty-cart');
const cart = document.querySelector('.to-total');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// ----------- minhas funções------------- //
function generateobj(objetoGerado) { // função para criar um objeto a partir do parametro passado 
  const newObject = {
    sku: objetoGerado.id,
    name: objetoGerado.title,
    image: objetoGerado.thumbnail,
    saleprice: objetoGerado.price,
  };
  return newObject;
}

function addItemInHtml(param) { // função para adicionar os itens no html, que no caso são os produtos.
  const findElement = document.querySelector('.items');
  findElement.appendChild(param);
}

function removeLoad() {
  const load = document.querySelector('.loading');
  load.remove();
}

async function getObjectItens(nameToSearch) { // função para buscar via API os produtos e adiciona-los na pagina
  const search = nameToSearch;
  await fetch(`${url}${search}`).then((response) => response.json())
  .then((object) => {
    object.results.forEach((someObject) => {
      const something = generateobj(someObject);
      addItemInHtml(createProductItemElement(something));
    });
  });
  removeLoad();
}

function saveList() { // função para salvar os itens do carrinho no localStorage.
  const getItemscart = addInOl;
  const saveCart = JSON.stringify(getItemscart.innerHTML);
  localStorage.setItem('buyCart', saveCart);
}

function recoveryList() { // função para resgatar os itens que estavam no carrinho.
  const getcart = JSON.parse(localStorage.getItem('buyCart'));
  if (!getcart) {
    console.log('listaVazia');
  }
  addInOl.innerHTML = getcart;
}

function total() { // funções para calcular o valor total dos itens do carrinho 
  const items = addInOl.childNodes;
  let totalValue = 0;
  if (items.length !== 0) {
    items.forEach((item) => {
      const getValue = item.textContent.split('PRICE: $')[1];
      const changeToNum = parseFloat(getValue);
      totalValue += changeToNum;
    });
  }
  return totalValue;
}

function getTotalPrice() {
  const getTotalText = document.querySelector('.total-price');
  getTotalText.innerText = total();
}

function cartItemClickListener(event) { // função para remover os itens quando clicado
  event.target.remove();
  saveList();
  getTotalPrice();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  return li;
}

// ---- novas funções ---- //

function addH2WithSum() { // esta função cria o elemento h4 que servirá para apresentar os textos.
  const p = document.createElement('p');
  p.className = 'total-price';
  p.innerText = 'Total:';
  cart.appendChild(p);
}

const makeRequisition = (idReceived) => { // esta função faz a requisição e adiciona os itens que foram passados por parametro.
  const urlItems = 'https://api.mercadolibre.com/items/';
  fetch(`${urlItems}${idReceived}`)
  .then((response) => response.json())
  .then((object) => {
    addInOl.appendChild(createCartItemElement(object));
    saveList();
    getTotalPrice();
    });  
  };

addInOl.addEventListener('click', (event) => { // esta função é para 'escutar' os eventos de clicks que ocorrerem na ol do carrinho.
    if (event.target.classList.contains('cart__item')) {
      cartItemClickListener(event);
    }
  });

forClick.addEventListener('click', (event) => { // função para e'escutar' os eventos de clicks nos itens 
    if (event.target.classList.contains('item__add')) {
      const getId = event.target
      .parentNode.firstChild
      .innerText;
      makeRequisition(getId);
    }
  });

clean.addEventListener('click', () => {
  while (addInOl.childElementCount > 0) addInOl.firstElementChild.remove();
  getTotalPrice();
  saveList();
});

window.onload = () => {
    getObjectItens('computador');
    addH2WithSum();
    recoveryList();
    getTotalPrice();
};
