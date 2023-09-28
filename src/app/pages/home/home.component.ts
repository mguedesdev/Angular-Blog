import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { NewsItem } from 'src/app/interfaces/news.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newsList: NewsItem[] = [];
  filteredList: NewsItem[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe((response) => {
      console.log(response);

      this.newsList = response.news;
      this.sortByApprovalDesc();
    });
  }

  sortByApprovalDesc() {
    this.filteredList = [...this.newsList].sort((a, b) => b.approval - a.approval);
  }


}
