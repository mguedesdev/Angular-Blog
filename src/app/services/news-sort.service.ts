import { Injectable } from '@angular/core';
import { NewsItem } from 'src/app/interfaces/news.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsSortService {

  constructor() { }

  sortByApprovalDesc(newsList: NewsItem[]): NewsItem[] {
    return [...newsList].sort((a, b) => b.approval - a.approval);
  }

  sortByDateDesc(newsList: NewsItem[]): NewsItem[] {
    return [...newsList].sort((a, b) => {
      const dateA = new Date(a.date.split('/').reverse().join('-')).getTime();
      const dateB = new Date(b.date.split('/').reverse().join('-')).getTime();
      return dateB - dateA;
    });
  }
}
