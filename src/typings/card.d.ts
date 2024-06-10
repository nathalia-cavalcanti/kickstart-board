interface Card {
  boardId: number;
  listId: number;
  name: string;
  description: string;
  id: number;
  image: { name: string; url: string } | null;
  created: string;
  deadline: string;
  completed: boolean;
  order: number;
}

export default Card;
