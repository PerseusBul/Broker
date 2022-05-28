import { CdkColumnDef, CdkTable } from '@angular/cdk/table';
import { AfterContentInit, Component, ContentChildren, Input, QueryList, Self, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableDataSource } from './table-datasource';

export const hostMatSortProviderFactory = (host: TableComponent<any>) => host.sort;

@Component({
  selector: 'crm-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [{ provide: MatSort, deps: [[new Self(), TableComponent]], useFactory: hostMatSortProviderFactory }]
})
export class TableComponent<T> implements AfterContentInit {
  @Input() dataSource!: TableDataSource<T>;
  @Input() displayedColumns!: string[];

  @ViewChild(CdkTable, { static: true }) table!: CdkTable<T>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ContentChildren(CdkColumnDef) columnDefs!: QueryList<CdkColumnDef>;

  ngAfterContentInit() {
    this.columnDefs.forEach((columnDef) => this.table.addColumnDef(columnDef));

    this.dataSource.attachPaginator(this.paginator.page);
    this.dataSource.attachSort(this.sort.sortChange);
  }
}
