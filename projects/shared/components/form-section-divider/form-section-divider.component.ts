import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'br-form-section-divider',
  templateUrl: './form-section-divider.component.html',
  styleUrls: ['./form-section-divider.component.scss']
})
export class FormSectionDividerComponent implements OnInit {
  @Input() title: string = '';
  @Input() class: string = '';
  constructor() {}

  ngOnInit(): void {}
}
