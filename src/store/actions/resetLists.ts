import { API_MOCK } from '@/service/mock';

export const resetLists = async function (this: any) {
  await API_MOCK.delete('/api/lists');
  this.activeCard = {};
  this.cardModule = false;
  this.lists = [];
  this.showNotification('All lists were deleted', false);
};
