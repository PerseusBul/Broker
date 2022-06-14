import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faFilePrescription as fasFilePrescription } from '@fortawesome/free-solid-svg-icons/faFilePrescription';
import { faPen as fasPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { faSquarePlus as fasSquarePlus } from '@fortawesome/free-solid-svg-icons/faSquarePlus';
import { debounce, interval, Subscription, tap } from 'rxjs';
import { AGENTS_DATA, Sample } from 'src/app/admin/stub-data-store';

@Component({
  selector: 'br-broker-admin-regions',
  templateUrl: './broker-admin-regions.component.html',
  styleUrls: ['./broker-admin-regions.component.scss']
})
export class BrokerAdminRegionsComponent implements OnInit, AfterViewInit, OnDestroy {
  fasFilePrescription = fasFilePrescription;
  fasSquarePlus = fasSquarePlus;
  fasPen = fasPen;
  
  dataSource: MatTableDataSource<Sample>;
  subscription: Subscription = new Subscription();
  filterInUse: boolean = false;

  searchForm = this.fb.group({
    search: null
  });

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private fb: FormBuilder) {
    this.dataSource = new MatTableDataSource<Sample>(AGENTS_DATA.map((a) => new Sample(a)));
  }

  ngOnInit(): void {
    this.subscription.add(
      this.searchForm
        .get('search')
        ?.valueChanges.pipe(
          debounce(() => interval(500)),
          tap((value: string) => (this.dataSource.filter = value?.toLowerCase().trim()))
        )
        .subscribe()
    );

    return;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    const sortState: Sort = { active: '', direction: '' };
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
