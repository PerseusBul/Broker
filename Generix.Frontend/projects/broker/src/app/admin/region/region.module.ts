import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonFormUiModule } from 'projects/shared/common-form-ui.module';
import { DateFieldModule } from 'projects/shared/components/date-field/date-field.module';
import { NomSelectModule } from 'projects/shared/components/nom-select/nom-select.module';
import { ActionServiceModule } from 'projects/shared/services/action-service/action-service.module';
import { RegionRoutingModule } from './region-routing.module';
import { RegionViewComponent, RegionViewSkeletonComponent } from './region-view/region-view.component';
import { RegionComponent } from './region/region.component';

@NgModule({
  declarations: [RegionComponent, RegionViewComponent, RegionViewSkeletonComponent],
  imports: [
    CommonModule,
    RegionRoutingModule,
    CommonFormUiModule,
    ActionServiceModule,
    NomSelectModule
  ]
})
export class RegionModule {}
