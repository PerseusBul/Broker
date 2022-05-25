import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  SIMPLE_SKELETON_TEMPLATE,
  SkeletonComponentBase
} from 'projects/shared/components/skeleton/skeleton.component';
import { tryParseInt } from 'projects/shared/utils/various';

// TODO remove
export type OfficeGet = {
  officeId: number;
  agentId: number;
  name: string;
  code: string;
  municipalities: string;
  users: string;
};

@Component({
  template: SIMPLE_SKELETON_TEMPLATE
})
export class OfficeViewSkeletonComponent extends SkeletonComponentBase {
  constructor(/*regionsService: RegionsService, */ route: ActivatedRoute) {
    super();
    const officeId = tryParseInt(route.snapshot.paramMap.get('officeId'));

    if (officeId) {
      this.resolve(OfficeViewComponent, {
        office: /*regionsService.get({
          officeId: officeId
        })*/ null
      });
    } else {
      this.resolve(OfficeViewComponent, { office: null });
    }
  }
}

@Component({
  selector: 'br-office-view',
  templateUrl: './office-view.component.html',
  styleUrls: ['./office-view.component.scss']
})
export class OfficeViewComponent implements OnInit {
  @Input() data!: {
    office: OfficeGet | null;
  };
  constructor() {}

  ngOnInit(): void {
    return;
  }
}
