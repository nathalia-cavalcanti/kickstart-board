import List from '@/typings/list';
import { API_MOCK } from '@/service/mock';

export const resetCards = async function (this: any) {
  await API_MOCK.delete('/api/cards');
  this.activeCard = {};
  this.cardModule = false;
  this.lists.forEach((list: List) => {
    list.cards = [];
  });
  this.showNotification('All cards were deleted', false);
};
