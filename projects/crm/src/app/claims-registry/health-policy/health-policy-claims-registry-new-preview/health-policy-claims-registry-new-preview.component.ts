import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HealthService } from 'projects/crm-api';
import {
  SIMPLE_SKELETON_TEMPLATE,
  SkeletonComponentBase
} from 'projects/shared/components/skeleton/skeleton.component';
import { Subscription } from 'rxjs';
import { ErrorMessage } from 'src/app/_enumerations/error-messages';
import { Message } from 'src/app/_models/message';
import { MessengerService } from 'src/app/_services/messenger.service';
import { ClaimsRegistryPreviewService } from '../../claims-registry-preview.service';
import { HealthPolicyClaimsRegistry } from '../../claims-registry-types';

@Component({
  template: SIMPLE_SKELETON_TEMPLATE
})
export class HealthPolicyClaimsRegistryNewPreviewSkeletonComponent extends SkeletonComponentBase {
  constructor(claimsRegistryPreviewService: ClaimsRegistryPreviewService) {
    super();

    this.resolve(HealthPolicyClaimsRegistryNewPreviewComponent, {
      claimRegistry: claimsRegistryPreviewService.setHealthPolicyClaimPreviewData()
    });
  }
}

@Component({
  selector: 'crm-health-policy-claims-registry-new-preview',
  templateUrl: './health-policy-claims-registry-new-preview.component.html',
  styleUrls: ['./health-policy-claims-registry-new-preview.component.scss']
})
export class HealthPolicyClaimsRegistryNewPreviewComponent implements OnInit, OnDestroy {
  @Input() data!: {
    claimRegistry: HealthPolicyClaimsRegistry;
  };

  hasApplicant: boolean = false;
  subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private claimsRegistryPreviewService: ClaimsRegistryPreviewService,
    private healthService: HealthService,
    private messengerService: MessengerService
  ) {}

  ngOnInit() {
    this.hasApplicant = this.claimsRegistryPreviewService.hasApplicant;
  }

  createClaimRegistryRequest() {
    const claimRequest = this.claimsRegistryPreviewService.getClaimRequestObject();
    this.subscriptions.add(
      this.healthService.healthClaimCreate(claimRequest).subscribe({
        next: (response) => {
          if (response.success) {
            this.messengerService.add(new Message('Вашата заявка успешно е приета за обработка.', true, 4000));
            this.claimsRegistryPreviewService.resetContainersData();
            this.router.navigate(['crm/health-policy']);
          }

          if (response.errors) {
            response.errors.forEach((err) => this.messengerService.add(new Message(err.description ?? '', false)));
          }
        },
        error: () => this.messengerService.add(new Message(ErrorMessage.TryAgain, false))
      })
    );
  }

  @HostListener('window:load')
  public redirectOnReload() {
    this.claimsRegistryPreviewService.redirectOnReload(this.router, 'crm/claims-registry/health-policy/request');
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
