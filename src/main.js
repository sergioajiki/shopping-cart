import { searchCep } from './helpers/cepFunctions';
import { createProductElement } from './helpers/shopFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
// fetchProduct colocar depois
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const conteinerProdutos = document.querySelector('.products');
// console.log(conteinerProdutos);

const produtosRecebidosdaAPI = await fetchProductsList('computador');
// console.log(produtosRecebidosdaAPI);

produtosRecebidosdaAPI.forEach((item) => {
  const exibirProdutos = createProductElement(item);
  conteinerProdutos.appendChild(exibirProdutos);
});
