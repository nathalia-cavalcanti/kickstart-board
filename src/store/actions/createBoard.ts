import Board from '@/typings/board';
import { API_MOCK } from '@/service/mock';

export const createBoard = async function (this: any, name: Board['name']) {
  if (!name) {
    return;
  }
  const data = await API_MOCK
    .post('/api/boards', { name })
    .then(({ data }) => {
      this.redirectBoardId = data.id;
      return data;
    })
    .catch((e) => {
      console.log(e);
      this.showNotification('There was an error creating board', true);
    });
  return data;
};
