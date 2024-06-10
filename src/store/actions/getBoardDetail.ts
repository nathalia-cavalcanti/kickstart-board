import { useRoute } from 'vue-router';

import Board from '@/typings/board';
import Card from '@/typings/card';
import List from '@/typings/list';
import { AxiosError } from 'axios';
import { API_MOCK } from '@/service/mock';

export const getBoardDetail = async function (this: any, id: Board['id']) {
  const route = useRoute();

  this.loading = true;

  try {
    const board = await API_MOCK.get(`/api/boards/${id}`);
    this.board = board.data;

    const lists = await API_MOCK.get(`/api/boards/${id}/lists`);
    
    lists.data.sort((a: List, b: List) => {
      return a.order - b.order;
    });

    lists.data.forEach((list: List) => {
      list.cards.sort((a: Card, b: Card) => {
        return a.order - b.order;
      });
    })

    this.lists = lists.data;
    if (lists.data.length) this.createListInput = false;

    const qs: any = route.query?.card;
    if (qs !== undefined) {
      this.showCardModule(qs, true);
    }
    this.loading = false;
  }
 catch (err) {
    const { response } = err as AxiosError<any>;
    this.loading = false;
    this.loadingError.show = true;
    this.loadingError.message = response?.data?.message;
    this.loadingError.status = response?.status;
  }
};
