
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { NewsItem, NewsResponse } from '../interfaces/news.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataUrl = 'assets/data.json';

  constructor(private http: HttpClient) { }

  getData(): Observable<NewsResponse> {
    return this.http.get<NewsResponse>(this.dataUrl);
  }

  getNewsById(id: number): Observable<NewsItem> {
    return this.getData().pipe(
      map((response: { news: any[]; }) => response.news.find((newsItem: { id: number; }) => newsItem.id === id))
    );
  }

}
