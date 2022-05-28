import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NavigationExtras } from '@angular/router';

export interface SaveToken {
  done(success: boolean): void;
}

@Component({
  selector: 'br-editor-panel',
  templateUrl: './editor-panel.component.html'
})
export class EditorPanelComponent implements OnInit, OnChanges {
  @Input() editBtnHidden = false;
  @Input() editBtnDisabled = false;

  @Input() backBtnHidden = false;
  @Input() backBtnDisabled = false;
  @Input() backBtnRouteCommands: any[] = ['../'];
  @Input() backBtnRouteExtras: NavigationExtras | null = null;

  @Input() editable = false;
  @Output() editableChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<SaveToken>();

  @Input() isNew!: boolean;

  saveBtnDisabled = false;

  // used to know the undelying editable state
  localEditable!: boolean;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const editableChange = changes['editable'];

    if (!editableChange || editableChange.isFirstChange()) {
      // ngOnInit takes care of the initial
      // as it will account for the default as well
      return;
    }

    this.localEditable = editableChange.currentValue;
  }

  ngOnInit() {
    if (this.isNew == null) {
      throw new Error('Missing required input parameter isNew');
    }

    this.localEditable = this.editable;
  }
}
