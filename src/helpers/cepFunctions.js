const enderecoContainer = document.querySelector('.cart__address');

export const getAddress = async (CEP) => {
  const procuraCepAwesomeApi = `https://cep.awesomeapi.com.br/json/${CEP} `;
  const responseAwesomeApi = await (fetch(procuraCepAwesomeApi));
  const dataAwesomeApi = await responseAwesomeApi.json();

  const procuraCepBrasilApi = `https://brasilapi.com.br/api/cep/v2/${CEP}`;
  const responseBrasilApi = await (fetch(procuraCepBrasilApi));
  const dataBrasilApi = await responseBrasilApi.json();

  const respostaDaApi = await Promise.any([dataAwesomeApi, dataBrasilApi]);
  return respostaDaApi;
};

export const searchCep = async () => {
  try {
    const recebeCep = document.querySelector('.cep-input');
    // console.log(recebeCep);
    const resposta = await getAddress(recebeCep.value);
    console.log(resposta);
    // enderecoContainer.innerHTML = 'Rua - Bairro - Cidade - Estado';
    enderecoContainer.innerHTML = `${resposta.address} - 
    ${resposta.district} - ${resposta.city} - ${resposta.state}`;
  } catch (error) {
    enderecoContainer.innerHTML = 'CEP não encontrado';
  }
};
