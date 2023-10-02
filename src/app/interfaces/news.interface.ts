export interface NewsItem {
  id: number;
  author: string;
  date: string;
  title: string;
  description: string;
  picture: string;
  video: string;
  approval: number;
  fullNews: string;

}

export interface NewsResponse {
  news: NewsItem[];
}
