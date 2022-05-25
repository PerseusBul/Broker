import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentViewSkeletonComponent } from './agent-view/agent-view.component';
import { AgentComponent } from './agent/agent.component';

const routes: Routes = [
  { path: '', component: AgentComponent },
  { path: 'new', component: AgentViewSkeletonComponent },
  { path: ':agentId', component: AgentViewSkeletonComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule {}
