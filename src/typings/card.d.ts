interface Card {
  boardId: number;
  listId: number;
  name: string;
  description: string;
  id: number;
  file: { name: string; url: string; type: Blob['type'] } | null;
  created: string;
  deadline: string;
  completed: boolean;
  order: number;
}

export default Card;
