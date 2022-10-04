// Valores padrão
const armazenaCor = ['rgb(0, 0, 0)'];
const pixBoa = 'pixel-board';
const genBoa = 'generate-board';

// Valores padrão
const listaCor = {
  0: armazenaCor,
  1: 'rgb(0, 255, 0)',
  2: 'rgb(0,0,255)',
  3: 'rgb(255,0,0)',
};

// A cada atualçização essa função gera novas cores rgb
function coresAleatoris() {
  const valorG = Math.floor(Math.random() * 255);
  listaCor[0] = armazenaCor;
  listaCor[1] = `rgb(50, ${valorG}, 0)`;
  listaCor[2] = `rgb(50, 0, ${valorG})`;
  listaCor[3] = `rgb(${valorG}, 0, 150)`;
}
coresAleatoris();
const elementPixelBoard = document.querySelector(`#${pixBoa}`);
const selectPaleta = document.querySelector('#color-palette');

// criar session dos valores de dimenção do quadro
sessionStorage.setItem('linCol', 5);

const linCol = JSON.parse(sessionStorage.getItem('linCol'));

// Carrega a paleta principal de 4 cores(Preto, Amarelo, azul e Vermelho) e adiciona
function carregaPaleta(lCor) {
  for (let index = 0; index <= 3; index += 1) {
    const criar = document.createElement('div');
    criar.id = index;
    criar.className = 'color';
    criar.style.backgroundColor = lCor[index];
    selectPaleta.appendChild(criar);
  }
  document.querySelectorAll('.color')[0].classList.add('selected');
}
carregaPaleta(listaCor);// Chama a função para ser carregada pela página

// Muda o valor do estilo width e corrige a altura e a largura proporcionalmente
function tamQuadro(val) {
  const tamEle = document.getElementById(pixBoa);
  tamEle.style.width = `${val}px`;
}
tamQuadro((linCol * 40) + (2 * linCol));

// Muda o valor do estilo width e corrige a altura e a largura proporcionalmente
function altrtamQuadro() {
  const linECol = JSON.parse(sessionStorage.getItem('linCol'));
  const calc = (linECol * 40) + (2 * linECol);
  const tamEle = document.getElementById(pixBoa);
  tamEle.style.width = `${calc}px`;
}
altrtamQuadro();

// Cria o quadro de acordo com a altura e a largura
function criarQuadro(linECol) {
  // const sVal5 = sessionStorage.getItem('linCol');
  // if (sVal5 === '5') {
  for (let i = 0; i < linECol; i += 1) {
    for (let ii = 0; ii < linECol; ii += 1) {
      const criar = document.createElement('div');
      criar.className = 'pixel limpar';
      criar.style.display = 'inline-block';
      elementPixelBoard.appendChild(criar);
    }
  }
  // }
}
criarQuadro(linCol);// Chama a função para ser carregada pela página

// Depois de criado o quadro esse função numera o quadro por id
function numerarQuadro() {
  const ids = document.querySelectorAll('.pixel');
  for (let key = 0; key < ids.length; key += 1) {
    ids[key].id = key;
  }
}
numerarQuadro();// Chama a função para ser carregada pela página

// Remove todas as classes que tem o nome selected

document.addEventListener('click', (event) => {
  const docQueSelAll = document.getElementsByClassName('color');
  for (let index = 0; index < docQueSelAll.length; index += 1) {
    if (event.target.className === 'color') {
      document.getElementsByClassName('color')[index].classList.remove('selected');
    }
  }
});// Escula o Mouse até que ele click

// Adiciona no elemento com class clickada o nome selected

document.addEventListener('click', (event) => {
  const lcId = event.target.id;
  if (event.target.className === 'color') {
    document.querySelectorAll('.color')[lcId].classList.add('selected');
  }
});// Escula o Mouse até que ele click

// Armazena valor da cor no objeto valor{}
document.addEventListener('click', (event) => {
  if (event.target.className === 'color selected') {
    armazenaCor.splice(0, 0, event.target.style.backgroundColor);// Altera o conteudo da lista
  }
});// Escula o Mouse até que ele click

// Função que pinta o quadro com as cores selecionadas
document.addEventListener('click', (event) => {
  const selecione = document.querySelectorAll('.pixel');
  if (event.target.classList[0] === 'pixel') {
    const arma = armazenaCor[0];
    selecione[event.target.id].style.backgroundColor = arma;
  }
});

// Limpa a peleta adicionando uma cor branca de fundo

document.addEventListener('click', (event) => {
  const select = document.querySelectorAll('.pixel');
  if (event.target.id === 'clear-board') {
    for (let key = 0; key < select.length; key += 1) {
      select[key].style.backgroundColor = '';
    }
  }
});// Escula o Mouse até que ele click

document.getElementById(genBoa).addEventListener('click', () => {
  const tagMain = document.querySelector('#conteudo');
  tagMain.children[0].remove();
  const tagSection = document.createElement('section');
  tagSection.id = pixBoa;
  tagSection.style.width = '210px';
  tagMain.appendChild(tagSection);
});

document.getElementById(genBoa).addEventListener('click', () => {
  const selecBoardSize = document.querySelector('#board-size');
  const sba = selecBoardSize.value;
  if (sba === '') {
    window.alert('Board inválido!');
  }
  if (sba < 5) {
    selecBoardSize.value = 5;
  }
  if (sba > 50) {
    selecBoardSize.value = 50;
  }
});

document.getElementById(genBoa).addEventListener('click', () => {
  const sba = document.querySelector('#board-size').value;
  if (sba >= 5 && sba <= 50) {
    sessionStorage.setItem('cond', true);
    sessionStorage.setItem('linCol', sba);
  }
});

document.getElementById(genBoa).addEventListener('click', () => {
  const sba = JSON.parse(sessionStorage.getItem('linCol'));
  // if (sba > 4 && sba < 51) {
  for (let i = 0; i < sba; i += 1) {
    for (let ii = 0; ii < sba; ii += 1) {
      const criar = document.createElement('div');
      criar.className = 'pixel limpar';
      criar.style.display = 'inline-block';
      document.querySelector(`#${pixBoa}`).appendChild(criar);
    }
  }
  // }
});

document.getElementById(genBoa).addEventListener('click', () => {
  const linEeCol = JSON.parse(sessionStorage.getItem('linCol'));
  const calc = (linEeCol * 40) + (2 * linEeCol);
  const tamEle = document.getElementById(pixBoa);
  tamEle.style.width = `${calc}px`;
  const ids = document.querySelectorAll('.pixel');
  for (let key = 0; key < ids.length; key += 1) {
    ids[key].id = key;
  }
});

window.onload = () => {
  const bod = document.getElementsByTagName('body');
  const v = Math.floor(Math.random() * 255);
  const va = `conic-gradient(rgb(0,0,${v}), rgb(${v},0,0), rgb(0,${v},0), rgb(0,${v},${v}))`;
  bod[0].style.backgroundImage = va;
  bod[0].style.backgroundRepeat = 'no-repeat';
  bod[0].style.backgroundAttachment = 'fixed';
};
