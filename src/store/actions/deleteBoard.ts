import Board from '@/typings/board';
import { API_MOCK } from '@/service/mock';

export const deleteBoard = async function (this: any, boardId: Board['id']) {
  await API_MOCK
    .delete(`/api/boards/${boardId}`)
    .then(() => {
      this.showNotification('Board was deleted', false);
    })
    .catch((e) => {
      console.log(e);
      this.showNotification('Board could not be deleted', true);
    });
};
