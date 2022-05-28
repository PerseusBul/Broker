import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'br-preview-card',
  templateUrl: './preview-card.component.html',
  styleUrls: ['./preview-card.component.scss']
})
export class PreviewCardComponent implements OnInit {
  @Input() title: string = '';
  @Input() data: Object = {};

  normalizedData: Record<string, string>[] = [];
  constructor() {}

  ngOnInit(): void {
    for (const [key, val] of Object.entries(this.data)) {
      this.normalizedData.push({ key, val });
    }
  }
}
