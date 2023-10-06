import { DataService } from 'src/app/services/data.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { NewsItem } from 'src/app/interfaces/news.interface';
import { NewsSortService } from 'src/app/services/news-sort.service';


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


  constructor(private dataService: DataService, private newsSortService: NewsSortService) { }


  ngOnInit(): void {
    this.dataService.getData().subscribe((response) => {
      this.newsList = response.news;
      this.sortByApprovalDesc();
      this.sortByDateDesc();
      this.loadMoreNews();
    });
  }

  sortByApprovalDesc() {
    this.filteredApprovalList = this.newsSortService.sortByApprovalDesc(this.newsList);
  }


  sortByDateDesc() {
    this.filteredDateList = this.newsSortService.sortByDateDesc(this.newsList);
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


