import { Cafe } from "../types/Cafe";
import { client } from "../utils/fetchClient"

export const getAllCafes = () => {
  return client.get<Cafe[]>('/cafes');
};
