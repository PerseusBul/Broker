import { DataSource } from '@angular/cdk/collections';
import { GlobalErrorHandler } from 'projects/shared/other/global-error-handler';
import { asyncScheduler, BehaviorSubject, combineLatest, Observable, of, Subscription } from 'rxjs';
import { catchError, map, observeOn, startWith, switchMap, tap } from 'rxjs/operators';

export interface TableResult<T> {
  result: T[];
  length: number;
}

export interface Page {
  pageIndex: number;
  pageSize: number;
}

export interface Sort {
  active: string;
  direction: string;
}

export type ElementType<TResult> = TResult extends TableResult<infer T> ? T : never;

export const DEFAULT_PAGE_SIZE = 10;

export function mapTableResult<T, U>(
  { length, result }: TableResult<T>,
  callbackfn: (value: T, index: number, array: T[]) => U,
  thisArg?: any
): TableResult<U> {
  return {
    length,
    result: result.map(callbackfn, thisArg)
  };
}

export class TableDataSource<TResult> extends DataSource<ElementType<TResult>> {
  private page$ = new BehaviorSubject<Page>({ pageIndex: 0, pageSize: DEFAULT_PAGE_SIZE });
  private sort$ = new BehaviorSubject<Sort>({ active: '', direction: '' });
  private _pending$ = new BehaviorSubject<number>(0);
  private _length$ = new BehaviorSubject<number>(0);
  private _empty$ = new BehaviorSubject<boolean>(true);
  private pageSubscription?: Subscription;
  private sortSubscription?: Subscription;

  public pending$ = this._pending$.asObservable();
  public length$ = this._length$.asObservable();
  public empty$ = this._empty$.asObservable();

  constructor(
    private fetch: (
      sortBy: string,
      sortDirection: string,
      offset: number,
      limit?: number
    ) => Observable<TableResult<ElementType<TResult>>>
  ) {
    super();
  }

  connect(): Observable<ElementType<TResult>[]> {
    return combineLatest([this.page$, this.sort$]).pipe(
      observeOn(asyncScheduler), // we must not change pending$ synchronously on connect() as it trips angular change detection
      switchMap(([page, sort]) => {
        this.incrementPending();

        return this.fetch(sort.active, sort.direction, page.pageIndex * page.pageSize, page.pageSize).pipe(
          tap((r) => {
            this._length$.next(r.length);
            this._empty$.next(r.length === 0);
            this.decrementPending();
          }),
          map((r) => r.result),
          catchError((err) => {
            GlobalErrorHandler.instance.handleError(err);
            this._length$.next(0);
            this._empty$.next(true);
            this.decrementPending();
            return of([]);
          })
        );
      }),
      startWith([]) // immediately return an empty
    );
  }

  disconnect() {
    if (this.pageSubscription) {
      this.pageSubscription.unsubscribe();
    }
    if (this.sortSubscription) {
      this.sortSubscription.unsubscribe();
    }

    this._pending$.complete();
    this._length$.complete();
  }

  reload() {
    const { pageSize } = this.page$.getValue();
    this.page$.next({ pageIndex: 0, pageSize });
  }

  attachPaginator(paginator$: Observable<Page>) {
    if (this.pageSubscription) {
      this.pageSubscription.unsubscribe();
    }
    this.pageSubscription = paginator$.subscribe(this.page$);
  }

  attachSort(sort$: Observable<Sort>) {
    if (this.sortSubscription) {
      this.sortSubscription.unsubscribe();
    }
    this.sortSubscription = sort$.subscribe(this.sort$);
  }

  private incrementPending = () => this._pending$.next(this._pending$.value + 1);

  private decrementPending = () => this._pending$.next(Math.max(0, this._pending$.value - 1)); // TODO fix loading of filtered fetch items
}
