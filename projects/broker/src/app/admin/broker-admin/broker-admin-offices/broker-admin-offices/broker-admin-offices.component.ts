import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faFilePrescription as fasFilePrescription } from '@fortawesome/free-solid-svg-icons/faFilePrescription';
import { faUserPlus as fadUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus';
import { catchError, debounce, distinctUntilChanged, finalize, interval, merge, Subscription, tap } from 'rxjs';
import { Sample } from 'src/app/admin/stub-data-store';
import { BrokerAdminOfficesService } from './broker-admin-offices.service';

@Component({
  selector: 'br-broker-admin-offices',
  templateUrl: './broker-admin-offices.component.html',
  styleUrls: ['./broker-admin-offices.component.scss']
})
export class BrokerAdminOfficesComponent implements OnInit, AfterViewInit, OnDestroy {
  fasFilePrescription = fasFilePrescription;
  fadUserPlus = fadUserPlus;
  dataSource = new MatTableDataSource<Sample>();
  samples: Sample[] = [];
  subs: Subscription = new Subscription();
  queryLength: number = 0;

  loading: boolean = false;
  filterInUse: boolean = false;

  searchForm = this.fb.group({
    firstName: null,
    middleName: null,
    lastName: null,
    fullName: null
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private brokerAdminOfficesService: BrokerAdminOfficesService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage() {
    this.loading = true;
    const filter = <Partial<Sample>>this.searchForm.value;

    this.subs.add(
      this.brokerAdminOfficesService
        .getPageData({
          sortBy: this.sort?.active ?? '',
          sortDirection: this.sort?.direction ?? '',
          pageIndex: this.paginator?.pageIndex ?? 0,
          pageSize: this.paginator?.pageSize ?? 12,
          firstName: filter?.firstName,
          middleName: filter?.middleName,
          lastName: filter?.lastName,
          fullName: filter?.fullName
        })
        .pipe(
          tap((res) => {
            this.dataSource.data = res.result;
            this.queryLength = res.length;
          }),
          catchError((err) => {
            alert(err);
            throw Error;
          }),
          finalize(() => (this.loading = false))
        )
        .subscribe()
    );
  }

  toggleFilter() {
    this.filterInUse = !this.filterInUse;
    this.searchForm.reset();
  }

  ngAfterViewInit() {
    this.subs.add(
      merge(
        this.sort.sortChange,
        this.searchForm.valueChanges.pipe(
          debounce(() => interval(400)),
          distinctUntilChanged(
            (value1: Sample, value2: Sample) =>
              value1.firstName === value2.firstName &&
              value1.middleName === value2.middleName &&
              value1.lastName === value2.lastName &&
              value1.fullName === value2.fullName
          )
        )
      )
        .pipe(tap(() => (this.paginator.pageIndex = 0)))
        .subscribe()
    );

    this.subs.add(
      merge(
        this.paginator.page,
        this.sort.sortChange,
        this.searchForm.valueChanges.pipe(
          debounce(() => interval(500)),
          distinctUntilChanged(
            (value1: Sample, value2: Sample) =>
              value1.firstName === value2.firstName &&
              value1.middleName === value2.middleName &&
              value1.lastName === value2.lastName &&
              value1.fullName === value2.fullName
          )
        )
      )
        .pipe(tap(() => this.loadPage()))
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
