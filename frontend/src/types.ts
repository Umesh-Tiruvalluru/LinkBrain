export type CardData = {
  _id: string;
  title: string
  description?: string;
  link: string;
  tags: tag[];
  type: string;
  timestamp: string;
  userId: user
}

type tag = {
  _id: string,
  tag: string
}

type user = {
  _id: string,
  email: string,
}
