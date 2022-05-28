import { Component, Input, Type } from '@angular/core';
import { InputsType } from 'ng-dynamic-component';

const template = `
  <ndc-dynamic *ngIf="inputs" [ndcDynamicComponent]="component" [ndcDynamicInputs]="inputs"></ndc-dynamic>
  <crm-card *ngIf="!inputs">
    <ng-container card-body>
      <div class="relative h-96">
        <mat-spinner [diameter]="80" class="absolute top-1/2 left-1/2 -mt-10 -ml-10"></mat-spinner>
      </div>
    </ng-container>
  </crm-card>
`;

@Component({
  selector: 'crm-simple-skeleton-template',
  template
})
export class SimpleSkeletonTemplateComponent {
  @Input() component!: Type<any>;
  @Input() inputs!: InputsType;
}
