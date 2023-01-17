import { searchCep } from './helpers/cepFunctions';
import { createProductElement } from './helpers/shopFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
// fetchProduct colocar depois
import './style.css';

function showLoading() {
  const Newdiv = document.createElement('div');
  const labelCarregando = document.createElement('label');
  Newdiv.classList.add('loading');
  Newdiv.appendChild(labelCarregando);
  labelCarregando.innerText = 'Carregando...';
  document.querySelector('.container').appendChild(Newdiv);
}
function hideLoading() {
  document.querySelector('.loading').remove();
}

window.onload = showLoading;
document.querySelector('.cep-button').addEventListener('click', searchCep);

const conteinerProdutos = document.querySelector('.products');
// console.log(conteinerProdutos);

const produtosRecebidosdaAPI = await fetchProductsList('computador');
// console.log(produtosRecebidosdaAPI);

const buildProductsList = () => {
  hideLoading();
  produtosRecebidosdaAPI.forEach((item) => {
    const exibirProdutos = createProductElement(item);
    conteinerProdutos.appendChild(exibirProdutos);
  });
};

buildProductsList();
