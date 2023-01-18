export const getAddress = async (CEP) => {
  try {
    const procuraCepAwesomeApi = `https://cep.awesomeapi.com.br/json/${CEP} `;
    const responseAwesomeApi = await (fetch(procuraCepAwesomeApi));
    const dataAwesomeApi = await responseAwesomeApi.json();

    const procuraCepBrasilApi = `https://brasilapi.com.br/api/cep/v2/${CEP}`;
    const responseBrasilApi = await (fetch(procuraCepBrasilApi));
    const dataBrasilApi = await responseBrasilApi.json();

    const respostaDaApi = await Promise.any([dataAwesomeApi, dataBrasilApi])

    console.log(respostaDaApi);
  } catch (error) {
    error.message;
    console.log('CEP não encontrado');
  }
};

export const searchCep = async () => {
  const recebeCep = document.querySelector('.cep-input');
  console.log(recebeCep);
  const resposta = await getAddress(recebeCep.value)
  
 // seu código aqui
};
