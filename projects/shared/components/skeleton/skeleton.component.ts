import { Type } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

export const SIMPLE_SKELETON_TEMPLATE =
  '<crm-simple-skeleton-template [component]="component" [inputs]="inputs"></crm-simple-skeleton-template>';

export const SIMPLE_TAB_SKELETON_TEMPLATE =
  '<crm-simple-tab-skeleton-template [component]="component" [inputs]="inputs"></crm-simple-tab-skeleton-template>';

export const SIMPLE_DIALOG_SKELETON_TEMPLATE =
  '<crm-simple-dialog-skeleton-template [component]="component" [inputs]="inputs"></crm-simple-dialog-skeleton-template>';

type DataType<T> = T extends { data: infer TData } ? TData : never;

type ObservableDictionary<T> = {
  [K in keyof T]: Observable<T[K]> | T[K];
};

export abstract class SkeletonComponentBase {
  component!: any;
  inputs!: any;

  resolve<TComponent extends { data: any }>(
    comp: Type<TComponent>,
    data: Observable<DataType<TComponent>> | ObservableDictionary<DataType<TComponent>>
  ) {
    if (data == null) {
      throw new Error('No data object provided');
    }

    let result$: Observable<TComponent>;
    if (data instanceof Observable) {
      result$ = data;
    } else {
      const obsDataEntries = Object.entries(data).filter(([k, v]) => v instanceof Observable);
      if (!obsDataEntries.length) {
        // synchronous path
        this.inputs = { data };
        this.component = comp;
        return;
      }

      const mapedData = Object.fromEntries(
        // pipe each observable in the data object through a take(1)
        // as forkJoin completes when the underlying observables complete
        // but we are interested in the first values only
        obsDataEntries.map(([k, v]) => [k, v as Observable<TComponent>])
      );
      // TODO: Huge possibility of issues
      result$ = forkJoin(mapedData)
        // merge the observable properties with the rest in the data object
        .pipe(map((obsData) => Object.assign({ data, obsData }))) as Observable<TComponent>;
    }
    result$.pipe(take(1)).subscribe((data) => {
      this.inputs = { data };
      this.component = comp;
    });
  }
}
