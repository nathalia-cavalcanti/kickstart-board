import Card from '@/typings/card';
import List from '@/typings/list';
import { API_MOCK } from '@/service/mock';

export const deleteCard = async function (this: any, card: Card) {
  const { id, listId } = card;
  await API_MOCK.delete(`/api/cards/${id}`);
  const listIndex = this.lists.findIndex((list: List) => list.id === listId);
  this.lists[listIndex].cards = this.lists[listIndex].cards.filter((item: Card) => item.id !== id);
  this.activeCard = {};
  this.cardModule = false;
  this.showNotification('Card was deleted', false);
};
