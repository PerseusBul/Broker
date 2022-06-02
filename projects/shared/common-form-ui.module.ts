import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CardSectionModule } from './components/card-section/card-section.module';
import { CardModule } from './components/card/card.module';
import { CheckboxModule } from './components/checkbox/checkbox.module';
import { EditorPanelModule } from './components/editor-panel/editor-panel.module';
import { FormSectionDividerModule } from './components/form-section-divider/form-section-divider.module';
import { MessengerModule } from './components/messenger/messenger.module';
import { SelectFieldModule } from './components/select-field/select-field.module';
import { SimpleSkeletonTemplateModule } from './components/skeleton/simple-skeleton-template.module';
import { TableModule } from './components/table/table.module';
import { TextFieldModule } from './components/text-field/text-field.module';
import { FontAwesomeWithConfigModule } from './font-awesome-with-config.module';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    CardModule,
    CardSectionModule,
    CdkTableModule,
    CommonModule,
    EditorPanelModule,
    FontAwesomeWithConfigModule,
    MatButtonModule,
    MatInputModule,
    MatSortModule,
    ReactiveFormsModule,
    SimpleSkeletonTemplateModule,
    TableModule,
    MatTableModule,
    MatPaginatorModule,
    TextFieldModule,
    MessengerModule,
    SelectFieldModule,
    CheckboxModule,
    FormSectionDividerModule
  ]
})
export class CommonFormUiModule {}
