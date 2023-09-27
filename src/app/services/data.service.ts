
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsResponse } from '../interfaces/news.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataUrl = 'assets/data.json';

  constructor(private http: HttpClient) { }

  getData(): Observable<NewsResponse> {
    return this.http.get<NewsResponse>(this.dataUrl);
  }
}
