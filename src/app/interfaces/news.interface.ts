export interface NewsItem {
  id: number;
  author: string;
  date: string;
  title: string;
  description: string;
  picture: string;
  video: string;
  approval: number;

}

export interface NewsResponse {
  news: NewsItem[];
}
