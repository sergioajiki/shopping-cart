const enderecoContainer = document.querySelector('.cart__address');
const erroCep = 'CEP não encontrado';
export const getAddress = async (CEP) => {
  // const procuraCepAwesomeApi = `https://cep.awesomeapi.com.br/json/${CEP} `;
  // const responseAwesomeApi = await (fetch(procuraCepAwesomeApi));
  // const dataAwesomeApi = await responseAwesomeApi.json();
  // const procuraCepBrasilApi = `https://brasilapi.com.br/api/cep/v2/${CEP}`;
  // const responseBrasilApi = await (fetch(procuraCepBrasilApi));
  // const dataBrasilApi = await responseBrasilApi.json();
  // const respostaDaApi = await Promise.any([dataAwesomeApi, dataBrasilApi]);
  // return respostaDaApi;
  try {
    const procuraCepAwesomeApi = `https://cep.awesomeapi.com.br/json/${CEP}`;
    const responseAwesomeApi = (fetch(procuraCepAwesomeApi));

    const procuraCepBrasilApi = `https://brasilapi.com.br/api/cep/v2/${CEP}`;
    const responseBrasilApi = (fetch(procuraCepBrasilApi));

    const respostaDaApi = await Promise.any([responseAwesomeApi, responseBrasilApi]);
    const data = respostaDaApi.json();
    // console.log(data)
    return data;
  } catch (error) {
    enderecoContainer.innerHTML = erroCep;
  }
};

export const searchCep = async () => {
  try {
    const recebeCep = document.querySelector('.cep-input');
    // console.log(recebeCep);
    // console.log(recebeCep.value)
    if (recebeCep.value === '') {
      // throw new Error('CEP não encontrado')
      enderecoContainer.innerHTML = erroCep;
      return false;
    }
    const resposta = await getAddress(recebeCep.value);
    console.log(resposta);
    if ('status' in resposta || 'errors' in resposta) {
      // throw new Error('CEP não encontrado')
      enderecoContainer.innerHTML = erroCep;
      return false;
    }
    // enderecoContainer.innerHTML = 'Rua - Bairro - Cidade - Estado';
    const part1 = `${resposta.address || resposta.street}`;
    const part2 = `${resposta.district || resposta.neigborhood}`;
    const respostas = `${part1} - ${part2} - ${resposta.city} - ${resposta.state}`;
    enderecoContainer.innerHTML = respostas;
  } catch (error) {
    enderecoContainer.innerHTML = erroCep;
  }
};
