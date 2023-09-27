import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NewsResponse } from 'src/app/interfaces/news.interface';

@Component({
  selector: 'app-big-card',
  templateUrl: './big-card.component.html',
  styleUrls: ['./big-card.component.css']
})
export class BigCardComponent{
  @Input() cardPicture:string = ''
  @Input() cardTitle:string = ''
  @Input() cardDescription:string = ''
  @Input() cardDate:string = ''
  @Input() cardAuthor:string = ''
}
