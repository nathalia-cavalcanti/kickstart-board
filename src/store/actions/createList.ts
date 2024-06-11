import Board from '@/typings/board';
import { API_MOCK } from '@/service/mock';

export const createList = async function (this: any, boardId: Board['id'], name: string) {
  const order = this.lists[this.lists.length - 1].order + 1;

  await API_MOCK
    .post('/api/lists', { boardId, name, order })
    .then(({ data }) => {
      data.cards = [];
      this.lists.push(data);
    })
    .catch(() => {
      this.showNotification('List was not created', true);
    });
};
