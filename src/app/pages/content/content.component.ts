import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { NewsItem } from 'src/app/interfaces/news.interface';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  newsDetail: NewsItem | null = null;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.getNewsDetail(id);
    });
  }

  getNewsDetail(id: number): void {
    this.dataService.getNewsById(id).subscribe(data => {
      this.newsDetail = data;
    });
  }
}
