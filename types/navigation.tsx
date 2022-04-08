export type Article = {
  title: string;
  author: string;
  url: string;
  urlToImage: string;
};

export type RootStackParamList = {
  Home: undefined;
  Clip: undefined;
  Article: { article: Article };
};

export type User = {
  clips: Article[];
};
