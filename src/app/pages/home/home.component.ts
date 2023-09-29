import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { NewsItem } from 'src/app/interfaces/news.interface';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedNews: NewsItem[] = [];
  readonly NEWS_CHUNK_SIZE = 4;
  isLoading:boolean = false;
  hasMoreContent:boolean = true;


  newsList: NewsItem[] = [];
  filteredApprovalList: NewsItem[] = [];
  filteredDateList: NewsItem[] = [];


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe((response) => {
      this.newsList = response.news;
      this.sortByApprovalDesc();
      this.sortByDateDesc();
      this.loadMoreNews();
    });
  }

  sortByApprovalDesc() {
    this.filteredApprovalList = [...this.newsList].sort((a, b) => b.approval - a.approval);
  }

  sortByDateDesc() {
    this.filteredDateList = [...this.newsList].sort((a, b) => {
      const dateA = new Date(a.date.split('/').reverse().join('-')).getTime();
      const dateB = new Date(b.date.split('/').reverse().join('-')).getTime();
      return dateB - dateA;
    });
  }


  loadMoreNews() {
    const currentLength = this.displayedNews.length;
    const itemsToAdd = this.filteredDateList.slice(currentLength, currentLength + this.NEWS_CHUNK_SIZE);
    this.displayedNews = [...this.displayedNews, ...itemsToAdd];
    if (this.displayedNews.length === this.filteredDateList.length) {
      this.hasMoreContent = false;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    const yOffset = window.pageYOffset;
    const yOffsetMax = document.documentElement.scrollHeight - window.innerHeight;
    if (yOffset >= yOffsetMax - 100 && !this.isLoading && this.hasMoreContent) {
      this.isLoading = true;
      setTimeout(() => {
        this.loadMoreNews();
        this.isLoading = false;
      }, 1000);
    }
  }

}


