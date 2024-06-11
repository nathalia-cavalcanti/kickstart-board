import List from '@/typings/list';
import { API_MOCK } from '@/service/mock';
import Board from '@/typings/board';

export const deleteList = async function (this: any, listId: List['id'], boardId: Board['id']) {
  await API_MOCK.delete(`/api/boards/${boardId}/lists/${listId}`);
  this.lists = this.lists.filter((item: List) => item.id !== listId);
  this.sortLists();
};
