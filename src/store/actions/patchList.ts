import List from '@/typings/list';
import { API_MOCK } from '@/service/mock';

export const patchList = async function (this: any, list: List, changes: Partial<List>) {
  const { id } = list;
  await API_MOCK.put(`/api/lists/${id}`, changes).then(({ data }) => {
    const patchedListIndex: number = this.lists.findIndex((c: List) => c.id === id);
    data.cards = this.lists[patchedListIndex].cards;
    this.lists[patchedListIndex] = data;
  });
  changes.hasOwnProperty('name') && this.showNotification('List was renamed', false);
};
