import { Component, OnInit } from '@angular/core';
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
import { tryParseInt } from 'projects/shared/utils/various';
import { AGENTS_DATA, Sample } from 'src/app/admin/stub-data-store';

@Component({
  template: SIMPLE_SKELETON_TEMPLATE
})
export class BrokerAdminUserViewSkeletonComponent extends SkeletonComponentBase {
  constructor(route: ActivatedRoute) {
    super();

    const userId = tryParseInt(route.snapshot.paramMap.get('id'));

    if (userId) {
      this.resolve(BrokerAdminUserViewComponent, {
        user: AGENTS_DATA.map((a) => new Sample(a)).filter((s) => s.id === userId)[0]
      });
    } else {
      this.resolve(BrokerAdminUserViewComponent, { user: null });
    }
  }
}

@Component({
  selector: 'br-broker-admin-user-view',
  templateUrl: './broker-admin-user-view.component.html',
  styleUrls: ['./broker-admin-user-view.component.scss']
})
export class BrokerAdminUserViewComponent implements OnInit {
  data!: {
    user: Sample | null;
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

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    if (this.data.user != null) {
      this.form.setValue({
        firstName: this.data.user.firstName,
        middleName: this.data.user.middleName,
        lastName: this.data.user.lastName,
        fullName: this.data.user.fullName
      });
    } else {
      this.editable = true;
    }
  }

  onSave(save: SaveToken) {
    const value = this.form.value;

    const brokerModel = {
      firstName: value.firstName,
      middleName: value.middleName,
      lastName: value.lastName,
      fullName: value.fullName
    };
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
  // }
}
