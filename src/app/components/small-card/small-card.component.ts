import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.css']
})
export class SmallCardComponent {
  @Input() cardPicture:string = ''
  @Input() cardTitle:string = ''
  @Input() cardDate:string = ''
  @Input() cardApproval:number = 0
  @Input() cardId:number = 0
}
