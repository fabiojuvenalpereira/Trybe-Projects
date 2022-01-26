const botao = document.querySelector('#criar-tarefa');
const entradaDeTexto = document.querySelector('#texto-tarefa');
const getClick = document.getElementById('conteudo-lista');
const clearAll = document.querySelector('#apaga-tudo');
const rmIndividual = document.querySelector('#remover-finalizados');
const sList = document.querySelector('#salvar-tarefas');
const rSelected = document.querySelector('#remover-selecionado');
const moveUp = document.querySelector('#mover-cima');
const moveDown = document.querySelector('#mover-baixo');
const listT = document.getElementById('lista-tarefas');

// Resgata o que foi escrito na caixa de texto
function criaTarefa() {
  const texto = document.querySelector('#texto-tarefa').value;
  return texto;
}

// Adiciona o Item na lista.
function adicionaLista() {
  const addlist = document.querySelector('#lista-tarefas');
  const text = entradaDeTexto;
  if (criaTarefa() !== '') {
    const lista = document.createElement('li');
    lista.innerText = criaTarefa();
    lista.classList.add('itensLista');
    addlist.appendChild(lista);
    text.value = '';
  }
  text.value = '';
}

// Remove os itens selecionados
function removeclass() {
  const getSelected = document.querySelector('.selected');
  if (getSelected != null) {
    getSelected.classList.remove('selected');
  }
}

// Seleciona os itens pelo click do mouse
getClick.addEventListener('click', (haveClick) => {
  removeclass();
  if (haveClick.target.classList.contains('itensLista')) {
    haveClick.target.classList.add('selected');
  }
}, false);

// Marca como completo o item que foi clicado duas vezes
getClick.addEventListener('dblclick', (clicks) => {
  const clicked = clicks.target;
  if (clicked.classList.contains('itensLista')) {
    if (clicked.classList.contains('completed')) {
      clicked.classList.remove('completed');
    } else {
      clicked.classList.add('completed');
    }
  }
}, false);

// limpa toda a lista de tarefas
clearAll.addEventListener('click', () => {
  const listToRm = document.getElementById('lista-tarefas');
  listToRm.innerHTML = '';
});

// remove os itens que estão marcados como feitos
function remComplete() {
  const remove = document.querySelectorAll('.completed');
  for (let index = 0; index < remove.length; index += 1) {
    remove[index].remove(remove[index]);
  }
}

rSelected.addEventListener('click', () => {
  const getSelItem = document.querySelector('.selected');
  getSelItem.remove(getSelItem);
});

// salva os itens na lista
function saveList() {
  const getListItens = document.querySelector('#lista-tarefas');
  const teste = JSON.stringify(getListItens.innerHTML);
  localStorage.setItem('completeList', teste);
}

window.onload = () => {
  const getOl = document.querySelector('#lista-tarefas');
  const content = JSON.parse(localStorage.getItem('completeList'));
  getOl.innerHTML = content;
};

// move os itens da lista que estão selecionados para cima
moveUp.addEventListener('click', () => {
  const selItem = document.querySelector('.selected');
  for (let indexI = 0; indexI < listT.childNodes.length; indexI += 1) {
    if (listT.childNodes[indexI] === selItem && indexI > 0) {
      listT.insertBefore(selItem, listT.childNodes[indexI - 1]);
    }
  }
});

// move os itens da lista que estão selecionados para baixo
moveDown.addEventListener('click', () => {
  const selItemAg = document.querySelector('.selected');
  if (selItemAg !== listT.lastChild && selItemAg) {
    selItemAg.nextSibling.after(selItemAg);
  }
});

sList.addEventListener('click', saveList);
rmIndividual.addEventListener('click', remComplete);
entradaDeTexto.addEventListener('change', criaTarefa);
botao.addEventListener('click', adicionaLista);

// referências
// A referência para criar a função 'clearAll.addEventListener' foi retirada deste site https://gomakethings.com/attaching-multiple-elements-to-a-single-event-listener-in-vanilla-js/
// E também https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/Arrow_functions
// Para elaborar 'moveUp.addEventListener' foram utilizadas referências encontradas no seguinte link https://www.w3schools.com/jsref/met_node_insertbefore.asp
// Houveram algumas refatorações de partes do código, e estas mesmas foram elaboradas durante os plantões. Agradecimentos ao Panta e Baêta!
// A função 'moveDown.addEventListener' foi elaborada juntamente com o Baêta(Pessoa instrutora da trybe).
