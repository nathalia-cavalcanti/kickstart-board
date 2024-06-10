import { API_MOCK } from '@/service/mock';

export const searchCard = async function (this: any, query: string) {
  const { data } = await API_MOCK.get(`/api/cards?name=${query}`);
  this.searchResults = data;
};
