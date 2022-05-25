import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonFormUiModule } from 'projects/shared/common-form-ui.module';
import { NomSelectModule } from 'projects/shared/components/nom-select/nom-select.module';
import { ActionServiceModule } from 'projects/shared/services/action-service/action-service.module';
import { AgentRoutingModule } from './agent-routing.module';
import { AgentViewComponent, AgentViewSkeletonComponent } from './agent-view/agent-view.component';
import { AgentComponent } from './agent/agent.component';

@NgModule({
  declarations: [AgentComponent, AgentViewComponent, AgentViewSkeletonComponent],
  imports: [CommonModule, AgentRoutingModule, CommonFormUiModule, ActionServiceModule, NomSelectModule]
})
export class AgentModule {}
