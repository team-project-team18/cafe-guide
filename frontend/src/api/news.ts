// import { News } from "../types/News"
// import { client } from "../utils/fetchClient"
import newsjson from '../news.json';
import { News } from '../types/News';

export const getAllNews = (): News[] => {
  // return client.get<News[]>('/news');

  return newsjson;
}