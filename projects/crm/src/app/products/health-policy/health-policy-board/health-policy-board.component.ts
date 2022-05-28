import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HealthService } from 'projects/crm-api';
import {
  SIMPLE_SKELETON_TEMPLATE,
  SkeletonComponentBase
} from 'projects/shared/components/skeleton/skeleton.component';
import { first, Subscription } from 'rxjs';
import { MessengerService } from 'src/app/_services/messenger.service';
import { InsuranceContract, ListContractsResponse } from '../../../../../../crm-api/model/models';

@Component({
  template: SIMPLE_SKELETON_TEMPLATE
})
export class HealthPolicySkeletonComponent extends SkeletonComponentBase implements OnDestroy {
  readonly subscriptions: Subscription = new Subscription();

  constructor(private healthService: HealthService) {
    super();

    const healtContracts = healthService
      .healthContracts()
      .pipe(first())
      .subscribe((data) => {
        this.resolve(HealthPolicyBoardComponent, { healthList: data });
      });

    this.subscriptions.add(healtContracts);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

@Component({
  selector: 'crm-health-policy-board',
  templateUrl: './health-policy-board.component.html',
  styleUrls: ['./health-policy-board.component.scss']
})
export class HealthPolicyBoardComponent implements OnInit {
  @Input() data!: {
    healthList: ListContractsResponse;
  };

  checked: boolean = false;
  items: InsuranceContract[] = [];
  expandedIndex = 0;

  constructor(private messengerService: MessengerService) { }

  onShowChecked() {
    this.checked = !this.checked;

    const contracts = this.data.healthList?.contracts as InsuranceContract[];
    if (!contracts) {
      // Handle errors display
      return;
    }

    if (this.checked) {
      this.items = contracts;
    } else {
      this.items = contracts.filter((x) => x.insuranceStatusCode === 'A');
    }
  }

  ngOnInit(): void {
    const contracts = this.data.healthList?.contracts as InsuranceContract[];
    if (!contracts) {
      // Handle errors display
      return;
    }
    this.items = contracts.filter((x) => x.insuranceStatusCode === 'A');
  }
}
