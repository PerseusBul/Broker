import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  SIMPLE_SKELETON_TEMPLATE,
  SkeletonComponentBase
} from 'projects/shared/components/skeleton/skeleton.component';
import { tryParseInt } from 'projects/shared/utils/various';

// TODO remove
export type HealthPolicyClaims = {
  property: string;
};

@Component({
  template: SIMPLE_SKELETON_TEMPLATE
})
export class HealthPolicyClaimViewSkeletonComponent extends SkeletonComponentBase {
  constructor(/*claimsService: ClaimsService, */ route: ActivatedRoute) {
    super();
    const claimId = tryParseInt(route.snapshot.paramMap.get('claimId'));

    if (claimId) {
      this.resolve(HealthPolicyClaimViewComponent, {
        claim: /*claimsService.get({
          claimId: claimId
        })*/ null
      });
    } else {
      this.resolve(HealthPolicyClaimViewComponent, { claim: null });
    }
  }
}

@Component({
  selector: 'crm-health-policy-claim-view',
  templateUrl: './health-policy-claim-view.component.html',
  styleUrls: ['./health-policy-claim-view.component.scss']
})
export class HealthPolicyClaimViewComponent implements OnInit {
  @Input() data!: {
    claim: HealthPolicyClaims | null;
  };
  constructor() {}

  ngOnInit(): void {
    return;
  }
}
