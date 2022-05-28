import { Component, Input, Type } from '@angular/core';
import { InputsType } from 'ng-dynamic-component';

const template = `
  <ndc-dynamic *ngIf="inputs" [ndcDynamicComponent]="component" [ndcDynamicInputs]="inputs"></ndc-dynamic>
  <div *ngIf="!inputs" class="relative h-96">
    <mat-spinner [diameter]="80" class="absolute top-1/2 left-1/2 -mt-10 -ml-10"></mat-spinner>
  </div>
`;

@Component({
  selector: 'crm-simple-tab-skeleton-template',
  template
})
export class SimpleTabSkeletonTemplateComponent {
  @Input() component!: Type<any>;
  @Input() inputs!: InputsType;
}
