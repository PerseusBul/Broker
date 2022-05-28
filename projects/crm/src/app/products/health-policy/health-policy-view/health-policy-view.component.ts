import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  SIMPLE_SKELETON_TEMPLATE,
  SkeletonComponentBase
} from 'projects/shared/components/skeleton/skeleton.component';
import { tryParseInt } from 'projects/shared/utils/various';

// TODO remove
export type HealthPolicy = {
  property: string;
};

@Component({
  template: SIMPLE_SKELETON_TEMPLATE
})
export class HealthPolicyViewSkeletonComponent extends SkeletonComponentBase {
  constructor(/*policiesService: PoliciesService, */ route: ActivatedRoute) {
    super();
    const policyId = tryParseInt(route.snapshot.paramMap.get('policyId'));

    if (policyId) {
      this.resolve(HealthPolicyViewComponent, {
        policy: /*policiesService.get({
          policyId: policyId
        })*/ null
      });
    } else {
      this.resolve(HealthPolicyViewComponent, { policy: null });
    }
  }
}

@Component({
  selector: 'crm-health-policy-view',
  templateUrl: './health-policy-view.component.html',
  styleUrls: ['./health-policy-view.component.scss']
})
export class HealthPolicyViewComponent implements OnInit {
  @Input() data!: {
    policy: HealthPolicy | null;
  };
  constructor() {}

  ngOnInit(): void {
    return;
  }
}
