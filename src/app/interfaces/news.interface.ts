export interface NewsItem {
  id: number;
  author: string;
  date: string;
  title: string;
  description: string;
  picture: string;
  video: string;
}

export interface NewsResponse {
  news: NewsItem[];
}
