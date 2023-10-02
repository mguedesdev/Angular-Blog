import { NewsSortService } from './../../services/news-sort.service';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { NewsItem } from 'src/app/interfaces/news.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  newsDetail: NewsItem | null = null;
  filteredApprovalList: NewsItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private NewsSortService: NewsSortService,
    private sanitizer: DomSanitizer
  ) {}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.getNewsDetail(id);
      this.getAllNewsAndSort();
    });
  }

  getAllNewsAndSort() {
    this.dataService.getData().subscribe((response) => {
      this.filteredApprovalList = this.NewsSortService.sortByApprovalDesc(response.news);
    });
  }

  getNewsDetail(id: number): void {
    this.dataService.getNewsById(id).subscribe(data => {
      this.newsDetail = data;
    });
  }

  getSafeUrl(url: string): SafeResourceUrl {
    const videoId = this.extractVideoID(url);
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  extractVideoID(url: string): string {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  }

  
}
