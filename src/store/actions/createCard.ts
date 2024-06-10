import Card from '@/typings/card';
import List from '@/typings/list';
import { API_MOCK } from '@/service/mock';

export const createCard = async function (this: any, card: Partial<Card>) {
  const listIndex = this.lists.findIndex((list: List) => list.id === card.listId);
  const cardsInList = this.lists[listIndex].cards;
  const order = cardsInList.length;

  await API_MOCK
    .post('/api/cards', { order, ...card })
    .then(({ data }) => {
      this.lists[listIndex].cards.push(data);
    })
    .catch((e) => {
      this.showNotification('Card was not created', true);
    });
};
