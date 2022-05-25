import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  SIMPLE_SKELETON_TEMPLATE,
  SkeletonComponentBase
} from 'projects/shared/components/skeleton/skeleton.component';
import { tryParseInt } from 'projects/shared/utils/various';

// TODO remove
export type RegionGet = {
  regionId: number;
  agentId: number;
  name: string;
  code: string;
  municipalities: string[];
};

@Component({
  template: SIMPLE_SKELETON_TEMPLATE
})
export class RegionViewSkeletonComponent extends SkeletonComponentBase {
  constructor(/*regionsService: RegionsService, */ route: ActivatedRoute) {
    super();
    const regionId = tryParseInt(route.snapshot.paramMap.get('regionId'));

    if (regionId) {
      this.resolve(RegionViewComponent, {
        region: /*regionsService.get({
          regionId: regionId
        })*/ null
      });
    } else {
      this.resolve(RegionViewComponent, { region: null });
    }
  }
}

@Component({
  selector: 'br-region-view',
  templateUrl: './region-view.component.html',
  styleUrls: ['./region-view.component.scss']
})
export class RegionViewComponent implements OnInit {
  @Input() data!: {
    region: RegionGet | null;
  };

  constructor() {}

  ngOnInit(): void {
    if (2 > 1) {
    }
  }
}
