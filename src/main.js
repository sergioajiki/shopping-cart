import { searchCep } from './helpers/cepFunctions';
import {
  createProductElement,
  createCartProductElement,
  totalPrice,
} from './helpers/shopFunctions';
// import { totalPrice } from './helpers/shopFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { getSavedCartIDs } from './helpers/cartFunctions';
import './style.css';

function showLoading() {
  // console.log(fetchProductsList('computador'));
  const Newdiv = document.createElement('div');
  const labelCarregando = document.createElement('label');
  Newdiv.classList.add('loading');
  Newdiv.appendChild(labelCarregando);
  labelCarregando.innerText = 'Carregando...';
  document.querySelector('.container').appendChild(Newdiv);
}

function hideLoading() {
  const apagarloading = document.querySelector('.loading');
  if (apagarloading) {
    apagarloading.remove();
  }
}

function showError() {
  hideLoading();
  const Newdiv = document.createElement('div');
  const labelCarregando = document.createElement('label');
  Newdiv.classList.add('error');
  Newdiv.appendChild(labelCarregando);
  labelCarregando.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
  document.querySelector('.container').appendChild(Newdiv);
  console.log('Algum erro ocorreu, recarregue a página e tente novamente');
}

document.querySelector('.cep-button').addEventListener('click', searchCep);

const containerProdutos = document.querySelector('.products');

const buildProductsList = async () => {
  try {
    const produtosRecebidosdaAPI = await fetchProductsList('computador');
    produtosRecebidosdaAPI.forEach((item) => {
      const exibirProdutos = createProductElement(item);
      containerProdutos.appendChild(exibirProdutos);
    });
  } catch (error) {
    showError();
  } finally {
    hideLoading();
  }
};
// recuperar o localStorage
// const recuperaIdLocalStorage = JSON.parse(localStorage.getItem('cartProducts'))
// console.log(recuperaIdLocalStorage)
// console.log(getSavedCartIDs())
const recuperaIdLocalStorage = getSavedCartIDs();
// console.log(recuperaIdLocalStorage);
const recoverCartLocalStorage = () => {
  const containerCart = document.querySelector('.cart__products');
  recuperaIdLocalStorage.forEach(async (id) => {
    const adicionaProduto = await fetchProduct(id);
    containerCart.appendChild(createCartProductElement(adicionaProduto));
  });
};

window.onload = async () => {
  showLoading();
  await buildProductsList();
  await recoverCartLocalStorage();
  await totalPrice();
};
