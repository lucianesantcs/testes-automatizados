import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { UniqueIdService } from '../../services/unique-id/unique-id.service';

@Component({
  selector: 'app-like-widget',
  templateUrl: './like-widget.component.html',
  styleUrls: ['./like-widget.component.scss']
})
export class LikeWidgetComponent implements OnInit {
  @Output() public liked = new EventEmitter<void>();
  @Input() public likes = 0;
  @Input() public id: string = null;

  public faIcon = { faThumbsUp };

  constructor(private uniqueIdService: UniqueIdService) { }

  public like(): void {
    this.liked.emit();
  }

  public ngOnInit(): void {
    if(!this.id) {
      this.uniqueIdService.generateUniqueIdWithPrefix('like-widget');
    }
  }

}
