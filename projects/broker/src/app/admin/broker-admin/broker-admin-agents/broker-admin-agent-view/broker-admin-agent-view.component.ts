import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArchive as fasArchive } from '@fortawesome/free-solid-svg-icons/faArchive';
import { faArrowAltCircleDown as fasArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons/faArrowAltCircleDown';
import { faArrowAltCircleUp as fasArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons/faArrowAltCircleUp';
import { faArrowLeft as fasArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faFile as fasFile } from '@fortawesome/free-solid-svg-icons/faFile';
import { faPlus as fasPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faSpinner as fasSpinnerThird } from '@fortawesome/free-solid-svg-icons/faSpinner';
import { faTrashAlt as fasTrashAlt } from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import { SaveToken } from 'projects/shared/components/editor-panel/editor-panel.component';
import {
  SIMPLE_SKELETON_TEMPLATE,
  SkeletonComponentBase
} from 'projects/shared/components/skeleton/skeleton.component';
import { ActionService } from 'projects/shared/services/action-service/action.service';
import { tryParseInt } from 'projects/shared/utils/various';
import { AGENTS_DATA, Sample } from 'src/app/admin/stub-data-store';

@Component({
  template: SIMPLE_SKELETON_TEMPLATE
})
export class BrokerAdminAgentViewSkeletonComponent extends SkeletonComponentBase {
  constructor(route: ActivatedRoute) {
    super();

    const agentId = tryParseInt(route.snapshot.paramMap.get('id'));

    if (agentId) {
      this.resolve(BrokerAdminAgentViewComponent, {
        agent: AGENTS_DATA.map((a) => new Sample(a)).filter((s) => s.id === agentId)[0]
      });
    } else {
      this.resolve(BrokerAdminAgentViewComponent, { agent: null });
    }
  }
}

@Component({
  selector: 'br-broker-admin-agent-view',
  templateUrl: './broker-admin-agent-view.component.html',
  styleUrls: ['./broker-admin-agent-view.component.scss']
})
export class BrokerAdminAgentViewComponent implements OnInit {
  @Input() data!: {
    agent: Sample | null;
  };

  readonly fasTrashAlt = fasTrashAlt;
  readonly fasSpinnerThird = fasSpinnerThird;
  readonly fasArrowLeft = fasArrowLeft;
  readonly fasArchive = fasArchive;
  readonly fasArrowAltCircleUp = fasArrowAltCircleUp;
  readonly fasArrowAltCircleDown = fasArrowAltCircleDown;
  readonly fasPlus = fasPlus;
  readonly fasFile = fasFile;

  readonly form = this.fb.group({
    firstName: [null, Validators.required],
    middleName: [null, Validators.required],
    lastName: [null, Validators.required],
    fullName: [null, Validators.required]
  });

  removing = false;
  editable = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private actionService: ActionService
  ) {}

  ngOnInit() {
    if (this.data.agent != null) {
      this.form.setValue({
        firstName: this.data.agent.firstName,
        middleName: this.data.agent.middleName,
        lastName: this.data.agent.lastName,
        fullName: this.data.agent.fullName
      });
    } else {
      this.editable = true;
    }
  }

  onSave(save: SaveToken) {
    const value = this.form.value;

    const agentModel = {
      firstName: value.firstName,
      middleName: value.middleName,
      lastName: value.lastName,
      fullName: value.fullName
    };
    // this.actionService
    //   .execute({
    //     httpAction: () => {
    //       if (this.data.publication == null) {
    //         return this.publicationsService
    //           .create({
    //             schoolYear: this.data.schoolYear,
    //             instId: this.data.instId,
    //             createPublicationCommand: publication
    //           })
    //           .toPromise()
    //           .then((newPublicationId) => {
    //             this.router.navigate(['../', newPublicationId], { relativeTo: this.route });
    //           });
    //       } else {
    //         const updateArgs = {
    //           schoolYear: this.data.schoolYear,
    //           instId: this.data.instId,
    //           publicationId: this.data.publication.publicationId
    //         };
    //         return this.publicationsService
    //           .update({
    //             updatePublicationCommand: publication,
    //             ...updateArgs
    //           })
    //           .toPromise()
    //           .then(() => this.publicationsService.get(updateArgs).toPromise())
    //           .then((newPublication) => {
    //             this.data.publication = newPublication;
    //           });
    //       }
    //     }
    //     })
    //     .then((success) => save.done(success));
  }

  // onRemove() {
  //   if (!this.data.publication) {
  //     throw new Error('onRemove requires a publication to have been loaded.');
  //   }
  //   this.removing = true;
  //   const removeParams = {
  //     schoolYear: this.data.schoolYear,
  //     instId: this.data.instId,
  //     publicationId: this.data.publication.publicationId
  //   };
  //   this.actionService
  //     .execute({
  //       confirmMessage: 'Сигурни ли сте, че искате да изтриете публикацията?',
  //       errorsMessage: 'Не може да изтриете публикацията, защото:',
  //       httpAction: () => this.publicationsService.remove(removeParams).toPromise()
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
