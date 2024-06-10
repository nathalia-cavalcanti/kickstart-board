import { API_MOCK } from '@/service/mock';

export const resetBoards = async function (this: any) {
  await API_MOCK
    .delete('/api/boards')
    .then(() => {
      this.activeCard = {};
      this.board = {};
      this.boardList.all = [];
      this.cardModule = false;
      this.lists = [];
      this.showNotification('All boards were deleted', false);
    })
    .catch((e) => {
      console.log(e);
      this.showNotification('Boards could not be deleted', true);
    });
};
