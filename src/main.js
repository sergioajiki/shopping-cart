import { searchCep } from './helpers/cepFunctions';
import { createProductElement } from './helpers/shopFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
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
// buildProductsList();
window.onload = async () => {
  showLoading();
  await buildProductsList();
};
