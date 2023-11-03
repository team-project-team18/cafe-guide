import { Cafe } from "../types/Cafe"
import { client } from "../utils/fetchClient"

export const getAllCafes = () => {
  return client.get<Cafe[]>('/products.json');
};

export const getCafeById = (id: string) => {
  const endpoint = `/products/${id}.json`;
  console.log('Fetching data from:', endpoint);

  return client.get<Cafe>(endpoint);
};