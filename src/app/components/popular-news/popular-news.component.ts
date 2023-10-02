import { NewsSortService } from './../../services/news-sort.service';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { NewsItem } from 'src/app/interfaces/news.interface';

@Component({
  selector: 'app-popular-news',
  templateUrl: './popular-news.component.html',
  styleUrls: ['./popular-news.component.css']
})
export class PopularNewsComponent {
  filteredApprovalList: NewsItem[] = [];

  constructor(
    private dataService: DataService,
    private newsSortService: NewsSortService,
  ) {}

  ngOnInit(): void {
    this.getAllNewsAndSort();
  }

  getAllNewsAndSort() {
    this.dataService.getData().subscribe((response) => {
      this.filteredApprovalList = this.newsSortService.sortByApprovalDesc(response.news);
    });
  }
}
