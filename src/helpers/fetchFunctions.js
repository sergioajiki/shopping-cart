export const fetchProduct = async (item) => {
  if (!item) {
    throw new Error('ID não informado');
  }
  try {
    const apiMBproduto = `https://api.mercadolibre.com/items/${item}`;
    const response = await (fetch(apiMBproduto));
    const data = await response.json();
    // console.log(data)
    return data;
  } catch (error) {
    return error.message;
  }
};

export const fetchProductsList = async (grupo) => {
  if (!grupo) {
    throw new Error('Termo de busca não informado');
  }

  try {
    const apiMB = `https://api.mercadolibre.com/sites/MLB/search?q=${grupo}`;
    const response = await (fetch(apiMB));
    const data = await response.json();
    // console.log(data)
    return data.results;
  } catch (error) {
    return error.message;
  }
};
