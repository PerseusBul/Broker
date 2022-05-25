import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AgentDS, Region } from '../../_models';
import { RegionsService } from '../../_services/regions.service';

@Component({ templateUrl: './region-example.component.html' })
export class RegionExampleComponent implements OnInit {
  regionForm: FormGroup = {} as any;
  loading = false;
  submitted = false;
  returnUrl: string = '/regions';
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private regionService: RegionsService
  ) {}

  Agents: AgentDS[] = [
    { id: 1, fullName: 'Amarant' },
    { id: 2, fullName: 'SDI' },
    { id: 3, fullName: 'Karoll' },
    { id: 4, fullName: 'I&G' },
    { id: 5, fullName: 'Broko' }
  ];

  changeAgent(e: any) {
    this.f.agentId.setValue(e.target.value.id, {
      onlySelf: true
    });
  }

  ngOnInit() {
    this.regionForm = this.formBuilder.group({
      agentId: ['', Validators.required],
      name: ['', Validators.required],
      code: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.regionForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    //stop here if form is invalid
    if (this.regionForm.invalid) {
      return;
    }

    var region = new Region(this.regionForm.value);
    this.loading = true;
    this.regionService
      .post(region)
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
  }
}
