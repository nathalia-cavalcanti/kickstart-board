import List from '@/typings/list';
import { API_MOCK } from '@/service/mock';

export const deleteList = async function (this: any, listId: List['id']) {
  await API_MOCK.delete(`/api/lists/${listId}`);
  this.lists = this.lists.filter((item: List) => item.id !== listId);
  this.sortLists();
};
