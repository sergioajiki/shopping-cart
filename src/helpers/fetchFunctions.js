export const fetchProduct = () => {
  // seu código aqui
};

export const fetchProductsList = async (item) => {
  if (!item) {
    throw new Error('Termo de busca não informado');
  }

  const apiMB = `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;
  const response = await (fetch(apiMB));
  const data = await response.json();
  // console.log(data)
  return data;
};
