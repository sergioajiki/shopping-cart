const enderecoContainer = document.querySelector('.cart__address');
const erroCep = 'CEP não encontrado';
export const getAddress = async (CEP) => {
  try {
    const procuraCepAwesomeApi = `https://cep.awesomeapi.com.br/json/${CEP}`;
    const responseAwesomeApi = (fetch(procuraCepAwesomeApi));

    const procuraCepBrasilApi = `https://brasilapi.com.br/api/cep/v2/${CEP}`;
    const responseBrasilApi = (fetch(procuraCepBrasilApi));

    const respostaDaApi = await Promise.any([responseAwesomeApi, responseBrasilApi]);
    const data = await respostaDaApi.json();
    return data;
  } catch (error) {
    enderecoContainer.innerHTML = erroCep;
  }
};

export const searchCep = async () => {
  try {
    const recebeCep = document.querySelector('.cep-input');
    if (recebeCep.value === '') {
      enderecoContainer.innerHTML = erroCep;
      return false;
    }
    const resposta = await getAddress(recebeCep.value);
    console.log(resposta);
    if ('status' in resposta || 'errors' in resposta) {
      enderecoContainer.innerHTML = erroCep;
      return false;
    }
    const part1 = `${resposta.address || resposta.street}`;
    const part2 = `${resposta.district || resposta.neigborhood}`;
    const respostas = `${part1} - ${part2} - ${resposta.city} - ${resposta.state}`;
    enderecoContainer.innerHTML = respostas;
  } catch (error) {
    enderecoContainer.innerHTML = erroCep;
  }
};
