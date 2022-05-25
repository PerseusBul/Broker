import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faSpinner as fasSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
import { faTrash as fasTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import {
  SIMPLE_SKELETON_TEMPLATE,
  SkeletonComponentBase
} from 'projects/shared/components/skeleton/skeleton.component';
import { ActionService } from 'projects/shared/services/action-service/action.service';
import { tryParseInt } from 'projects/shared/utils/various';

// TODO remove
export type AgentGet = {
  agentId: number;
  pin: string;
  pinType: string;
  firstName: string;
  middleName: string;
  lastName: string;
  code: string;
};

@Component({
  template: SIMPLE_SKELETON_TEMPLATE
})
export class AgentViewSkeletonComponent extends SkeletonComponentBase {
  constructor(/*agentsService: AgentsService, */ route: ActivatedRoute) {
    super();
    const agentId = tryParseInt(route.snapshot.paramMap.get('agentId'));

    if (agentId) {
      this.resolve(AgentViewComponent, {
        agent: /*agentsService.get({
          agentId: agentId
        })*/ null
      });
    } else {
      this.resolve(AgentViewComponent, { agent: null });
    }
  }
}

@Component({
  selector: 'br-agent-view',
  templateUrl: './agent-view.component.html',
  styleUrls: ['./agent-view.component.scss']
})
export class AgentViewComponent implements OnInit {
  @Input() data!: {
    agent: AgentGet | null;
  };

  fasSpinner = fasSpinner;
  fasTrash = fasTrash;

  readonly form = this.fb.group({
    pinType: [null, Validators.required],
    pin: [null, Validators.required],
    firstName: [null, Validators.required],
    middleName: [null, Validators.required],
    lastName: [null, Validators.required],
    code: [null, Validators.required]
  });

  editable = false;
  removing = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private actionService: ActionService // private agentsService: AgentsService
  ) {}

  ngOnInit(): void {
    const agent = this.data.agent;
    if (agent !== null) {
      this.form.setValue({
        pinType: agent.pinType,
        pin: agent.pin,
        firstName: agent.firstName,
        middleName: agent.middleName,
        lastName: agent.lastName,
        code: agent.code
      });
    } else {
      this.editable = true;
    }
  }

  onDummy() {}

  // onSave(save: SaveToken) {
  //   const value = this.form.value;

  //   const agent = {
  //     pinType: value.pinType,
  //     pin: value.pin,
  //     firstName: value.firstName,
  //     middleName: value.middleName,
  //     lastName: value.lastName,
  //     code: value.code
  //   };
  //   this.actionService
  //     .execute({
  //       httpAction: () => {
  //         if (this.data.agent == null) {
  //           return this.agentsService
  //             .create({
  //               createAgentCommand: agent
  //             })
  //             .toPromise()
  //             .then((newAgentId) => {
  //               this.router.navigate(['../', newAgentId], { relativeTo: this.route });
  //             });
  //         } else {
  //           const updateArgs = {
  //             agentId: this.data.agent.agentId
  //           };
  //           return this.agentsService
  //             .update({
  //               updateAgentCommand: agent,
  //               ...updateArgs
  //             })
  //             .toPromise()
  //             .then(() => this.agentsService.get(updateArgs).toPromise())
  //             .then((newAgent) => {
  //               this.data.agent = newAgent;
  //             });
  //         }
  //       }
  //     })
  //     .then((success) => save.done(success));
  // }

  // onRemove() {
  //   if (!this.data.agent) {
  //     throw new Error('onRemove requires a agent to have been loaded.');
  //   }
  //   this.removing = true;
  //   const removeParams = {
  //     agentId: this.data.agent.agentId
  //   };
  //   this.actionService
  //     .execute({
  //       confirmMessage: 'Сигурни ли сте, че искате да изтриете посредника?',
  //       errorsMessage: 'Не може да изтриете посредника, защото:',
  //       httpAction: () => this.agentsService.remove(removeParams).toPromise()
  //     })
  //     .then((done) => {
  //       if (done) {
  //         this.router.navigate(['../'], { relativeTo: this.route });
  //       }
  //     })
  //     .finally(() => {
  //       this.removing = false;
  //     });
  // }
}
