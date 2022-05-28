import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  SIMPLE_SKELETON_TEMPLATE,
  SkeletonComponentBase
} from 'projects/shared/components/skeleton/skeleton.component';

@Component({
  template: SIMPLE_SKELETON_TEMPLATE
})
export class ErrorSkeletonComponent extends SkeletonComponentBase {
  constructor(route: ActivatedRoute) {
    super();

    const message = route.snapshot.queryParamMap.get('message');
    this.resolve(ErrorComponent, { message: message });
  }
}

@Component({
  selector: 'br-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  @Input() data!: {
    message: string | null;
  };

  constructor() {}

  ngOnInit(): void {}
}
