import { Observable, of } from 'rxjs';

export interface INomVO<I> {
  id: NonNullable<I>;
  name: string;
}

export type GetNomsByIdParams<I> = {
  ids: Array<NonNullable<I>>;
};

export type GetNomsByTermParams = {
  term?: string | null;
  offset?: number | null;
  limit?: number | null;
};

export enum YesNoValues {
  Yes = 'YES',
  No = 'NO'
}

export interface INomService<I, P extends object> {
  getNomsById(params: GetNomsByIdParams<I> & P): Observable<Array<INomVO<I>>>;
  getNomsByTerm(params: GetNomsByTermParams & P): Observable<Array<INomVO<I>>>;
}

export class NomServiceWithParams<I, P extends object> implements INomService<I, {}> {
  getNomsById: (params: GetNomsByIdParams<I>) => Observable<Array<INomVO<I>>>;
  getNomsByTerm: (params: GetNomsByTermParams) => Observable<Array<INomVO<I>>>;

  constructor(dataService: INomService<I, P>, params: P);
  constructor(dataService: INomService<I, P>, paramsFunc: () => P);
  constructor(
    getNomsById: (params: GetNomsByIdParams<I> & P) => Observable<Array<INomVO<I>>>,
    getNomsByTerm: (params: GetNomsByTermParams & P) => Observable<Array<INomVO<I>>>
  );
  constructor(arg1: any, arg2: any) {
    if (typeof arg2 === 'function' && (arg2 as Function).length > 0) {
      this.getNomsById = arg1;
      this.getNomsByTerm = arg2;
    } else {
      let paramsFunc: () => P;
      if (typeof arg2 === 'function') {
        paramsFunc = arg2;
      } else {
        paramsFunc = () => arg2 as P;
      }
      const dataService: INomService<I, P> = arg1;

      this.getNomsById = (nomParams) => dataService.getNomsById(Object.assign({}, paramsFunc(), nomParams));
      this.getNomsByTerm = (nomParams) => dataService.getNomsByTerm(Object.assign({}, paramsFunc(), nomParams));
    }
  }
}

export class NomServiceFromItems<I> implements INomService<I, {}> {
  constructor(private items: Array<INomVO<I>>) {}

  getNomsById(params: GetNomsByIdParams<I>): Observable<Array<INomVO<I>>> {
    return of(this.items.filter((i) => params.ids.indexOf(i.id) !== -1));
  }
  getNomsByTerm({ term }: GetNomsByTermParams): Observable<Array<INomVO<I>>> {
    if (!term) {
      return of(this.items);
    }
    return of(this.items.filter((i) => i.name.includes(term)));
  }
}

export class YesNoNomsService extends NomServiceFromItems<string> {
  constructor() {
    super([
      { id: YesNoValues.Yes, name: 'Да' },
      { id: YesNoValues.No, name: 'Не' }
    ]);
  }
}
