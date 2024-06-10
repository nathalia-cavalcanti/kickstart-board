import Board from '@/typings/board';
import { API_MOCK } from '@/service/mock';

export const patchBoard = async function (this: any, board: Board, payload: object) {
  const patchedBoard = await API_MOCK.put(`/api/boards/${board.id}`, payload);
  const boardIndex = this.boardList.all.findIndex((board: Board) => board.id === board.id);
  this.board = patchedBoard.data;
  this.boardList.all[boardIndex] = patchedBoard.data;
};
