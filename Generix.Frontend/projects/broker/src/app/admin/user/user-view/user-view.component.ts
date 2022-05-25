import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  SIMPLE_SKELETON_TEMPLATE,
  SkeletonComponentBase
} from 'projects/shared/components/skeleton/skeleton.component';
import { tryParseInt } from 'projects/shared/utils/various';

// TODO remove
export type UserGet = {
  regionId: number;
  agentId: number;
  firstName: string;
  lastName: string;
  policies: string[];
};

@Component({
  template: SIMPLE_SKELETON_TEMPLATE
})
export class UserViewSkeletonComponent extends SkeletonComponentBase {
  constructor(/*usersService: RegionsService, */ route: ActivatedRoute) {
    super();
    const userId = tryParseInt(route.snapshot.paramMap.get('userId'));

    if (userId) {
      this.resolve(UserViewComponent, {
        user: /*usersService.get({
          userId: userId
        })*/ null
      });
    } else {
      this.resolve(UserViewComponent, { user: null });
    }
  }
}

@Component({
  selector: 'br-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  @Input() data!: {
    user: UserGet | null;
  };
  constructor() {}

  ngOnInit(): void {
    return;
  }
}
