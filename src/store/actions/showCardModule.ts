import Card from '@/typings/card';
import { API_MOCK } from '@/service/mock';

export const showCardModule = async function (this: any, cardId: Card['id'], flag: boolean) {
  if (flag) {
    await API_MOCK
      .get(`/api/cards/${cardId}`)
      .then(({ data }) => {
        this.activeCard = data;
        this.cardModule = true;
      })
      .catch(() => {
        this.activeCard = {};
        this.cardModule = false;
        this.showNotification(`Card with id: ${cardId} was not found`, true);
      });
  }
 else {
    this.activeCard = {};
    this.cardModule = false;
  }
};
