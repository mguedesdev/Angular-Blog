import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NewsResponse } from 'src/app/interfaces/news.interface';

@Component({
  selector: 'app-big-card',
  templateUrl: './big-card.component.html',
  styleUrls: ['./big-card.component.css']
})
export class BigCardComponent implements OnInit{
  cardPicture:string = ''
  cardTitle:string = ''
  cardDescription:string = ''
  cardDate:string = ''
  cardAuthor:string = ''

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe((response: NewsResponse) => {
      console.log(response);

      const firsNews = response.news[0];
      this.cardDescription = firsNews.description;
      this.cardPicture = firsNews.picture;
      this.cardTitle = firsNews.title;
      this.cardDate = firsNews.date;
      this.cardAuthor = firsNews.author;
    });
  }
}
