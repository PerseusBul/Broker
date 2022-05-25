import { Component, Input, Type } from '@angular/core';
import { InputsType } from 'ng-dynamic-component';

const template = `
  <ndc-dynamic *ngIf="inputs" [ndcDynamicComponent]="component" [ndcDynamicInputs]="inputs"></ndc-dynamic>
  <div *ngIf="!inputs" class="relative h-96">
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Затвори</button>
    </mat-dialog-actions>
    <mat-dialog-content class="w-96">
      <mat-spinner [diameter]="80" class="absolute top-1/2 left-1/2 -mt-10 -ml-10"></mat-spinner>
    </mat-dialog-content>
  </div>
`;

@Component({
  selector: 'br-simple-dialog-skeleton-template',
  template
})
export class SimpleDialogSkeletonTemplateComponent {
  @Input() component!: Type<any>;
  @Input() inputs!: InputsType;
}
