import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {
  HealthClaimResponse,
  HealthMedicalDocument,
  HealthMedicalDocumentFile,
  HealthService,
  ListClaimsResponse,
  UsersService
} from 'projects/crm-api';
import { ClaimDocumentsBody } from 'projects/crm-api/model/claimDocumentsBody';
import { UploadClaimDocumentsRequest } from 'projects/crm-api/model/uploadClaimDocumentsRequest';
import {
  SIMPLE_SKELETON_TEMPLATE,
  SkeletonComponentBase
} from 'projects/shared/components/skeleton/skeleton.component';
import { finalize, first, Subscription } from 'rxjs';
import {
  DocData,
  HealthPolicyClaimRegistryDialogData,
  HealthPolicyDocumentFiles,
  MedicalDocsData
} from 'src/app/claims-registry/claims-registry-types';
import { HealthPolicyClaimsRegistryAddFilesDialogComponent } from 'src/app/claims-registry/health-policy/health-policy-claims-registry-add-files-dialog/health-policy-claims-registry-add-files-dialog.component';
import { ErrorMessage } from 'src/app/_enumerations/error-messages';
import { HealthClaimDocumentFileType } from 'src/app/_enumerations/health-claim-document-file-type';
import { Message } from 'src/app/_models/message';
import { DocumentsService } from 'src/app/_nomServices/documents.service';
import { MessengerService } from 'src/app/_services/messenger.service';

@Component({
  template: SIMPLE_SKELETON_TEMPLATE
})
export class HealthPolicyClaimsBoardComponentSkeletonComponent extends SkeletonComponentBase implements OnDestroy {
  readonly subscriptions: Subscription = new Subscription();
  loading: boolean = false;

  constructor(
    route: ActivatedRoute,
    healthService: HealthService,
    userService: UsersService,
    messengerService: MessengerService
  ) {
    super();

    const cardNumber = route.snapshot.paramMap.get('cardNumber');

    if (cardNumber) {
      const claims = healthService
        .healthClaimsCardNumber(cardNumber)
        .pipe(first())
        .subscribe({
          next: (data) => {
            this.subscriptions.add(
              userService.userGet().subscribe({
                next: (response) => {
                  this.resolve(HealthPolicyClaimsBoardComponent, {
                    healthClaims: data,
                    pin: response.user?.pin!,
                    pinType: response.user?.pinType!
                  });
                },
                error: () => messengerService.add(new Message(ErrorMessage.TryAgain, false))
              })
            );
          },
          error: () => messengerService.add(new Message(ErrorMessage.TryAgain, false))
        });

      this.subscriptions.add(claims);
    } else {
      const claims = healthService
        .healthClaims()
        .pipe(first())
        .subscribe({
          next: (data) => {
            this.subscriptions.add(
              userService.userGet().subscribe({
                next: (response) => {
                  this.resolve(HealthPolicyClaimsBoardComponent, {
                    healthClaims: data,
                    pin: response.user?.pin!,
                    pinType: response.user?.pinType!
                  });
                },
                error: () => messengerService.add(new Message(ErrorMessage.TryAgain, false))
              })
            );
          },
          error: () => messengerService.add(new Message(ErrorMessage.TryAgain, false))
        });

      this.subscriptions.add(claims);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

@Component({
  selector: 'crm-health-policy-claims-board',
  templateUrl: './health-policy-claims-board.component.html',
  styleUrls: ['./health-policy-claims-board.component.scss']
})
export class HealthPolicyClaimsBoardComponent implements OnInit, OnDestroy {
  @Input() data!: {
    healthClaims: ListClaimsResponse;
    pin: string;
    pinType: string;
  };
  minApprovedDate: Date = new Date(1899, 11, 31);
  items: HealthClaimResponse[] = [];
  checked: boolean = false;
  loading: boolean = false;
  private pin: string = '';
  private pinType: string = '';

  docData: DocData = {
    number: null,
    date: null,
    description: null
  };

  HealthClaimDocumentFileType = HealthClaimDocumentFileType;
  readonly subscriptions: Subscription = new Subscription();

  constructor(
    private dialog: MatDialog,
    private documentsService: DocumentsService,
    private messengerService: MessengerService
  ) { }

  ngOnInit(): void {
    const claims = this.data.healthClaims?.claims as HealthClaimResponse[];
    if (!claims) {
      return;
    }

    this.items = claims;
    this.pin = this.data.pin;
    this.pinType = this.data.pinType;
  }

  hasApprovedDate(approvedDate: Date): boolean {
    const currentDate = new Date(approvedDate);
    if (approvedDate && currentDate > this.minApprovedDate) return true;
    else return false;
  }

  onShowChecked() {
    this.checked = !this.checked;

    const claims = this.data.healthClaims?.claims as HealthClaimResponse[];
    if (!claims) {
      return;
    }
  }

  openDialog(claimNumber: string, canUpload: boolean) {
    this.loading = true;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = 'first-tabbable';
    dialogConfig.panelClass = 'panel-size';
    dialogConfig.maxHeight = '90vh';
    dialogConfig.maxWidth = '95vw';
    dialogConfig.minWidth = '50vw';

    this.subscriptions.add(
      this.documentsService
        .getClaimDocuments({
          claimNumber: claimNumber,
          pin: this.pin,
          pinType: this.pinType
        } as ClaimDocumentsBody)
        .pipe(
          first(),
          finalize(() => (this.loading = false))
        )
        .subscribe({
          next: (response) => {
            if (response.success) {
              dialogConfig.data = {
                files: {
                  invoiceFiles: [],
                  receiptFiles: [],
                  ambulatoryFiles: [],
                  labTestFiles: [],
                  cardTherapyFiles: []
                } as HealthPolicyDocumentFiles,
                medicalDocsData: {
                  invoiceFile: { ...this.docData },
                  receiptFile: { ...this.docData },
                  ambulatoryFile: { ...this.docData },
                  labTestFile: { ...this.docData },
                  cardTherapyFile: { ...this.docData }
                } as MedicalDocsData,
                documents: response.documents ?? [],
                utils: { claimNumber, canUpload }
              };
              const dialogRef = this.dialog.open(HealthPolicyClaimsRegistryAddFilesDialogComponent, dialogConfig);

              this.subscriptions.add(
                dialogRef.afterClosed().subscribe({
                  next: (data: HealthPolicyClaimRegistryDialogData) => {
                    if (!data) {
                      return;
                    }
                    const request: UploadClaimDocumentsRequest = {
                      claimNumber: claimNumber,
                      pin: this.pin,
                      pinType: this.pinType,
                      medicalDocuments: this.getDocuments(data)
                    };
                    this.subscriptions.add(
                      this.documentsService.uploadFilesByClaimNumber(request).subscribe({
                        next: (response) => {
                          if (!response.success) {
                            // TODO: Specify behavior
                            response.errors?.forEach((err) =>
                              this.messengerService.add(new Message(err.description ?? '', false))
                            );
                          }
                        },
                        error: () => this.messengerService.add(new Message(ErrorMessage.TryAgain, false))
                      })
                    );
                  },
                  error: () => this.messengerService.add(new Message(ErrorMessage.TryAgain, false))
                })
              );
            } else {
              response.errors?.forEach((err) => this.messengerService.add(new Message(err.description ?? '', false)));
            }
          },
          error: () => this.messengerService.add(new Message(ErrorMessage.TryAgain, false))
        })
    );
  }

  private getDocuments(data: HealthPolicyClaimRegistryDialogData): HealthMedicalDocument[] {
    const documents: HealthMedicalDocument[] = [];
    if (data?.docsFiles.ambulatoryFiles?.length > 0) {
      const document: HealthMedicalDocument = {
        claimDocumentType: HealthClaimDocumentFileType.AmbulatoryFile,
        documentNumber: data.medicalDocsData.ambulatoryFile.number ?? '',
        documentDate: data.medicalDocsData.ambulatoryFile.date ?? new Date(),
        documentDescription: 'Description',
        documentFiles: data?.docsFiles.ambulatoryFiles.map<HealthMedicalDocumentFile>((f) => ({
          originalFileName: f.fileName,
          fileData: f.fileContent
        }))
      };

      documents.push(document);
    }
    if (data?.docsFiles.invoiceFiles?.length > 0) {
      const document: HealthMedicalDocument = {
        claimDocumentType: HealthClaimDocumentFileType.InvoiceFile,
        documentNumber: data.medicalDocsData.invoiceFile.number ?? '',
        documentDate: data.medicalDocsData.invoiceFile.date ?? new Date(),
        documentDescription: 'Description',
        documentFiles: data?.docsFiles.invoiceFiles.map<HealthMedicalDocumentFile>((f) => ({
          originalFileName: f.fileName,
          fileData: f.fileContent
        }))
      };

      documents.push(document);
    }
    if (data?.docsFiles.receiptFiles?.length > 0) {
      const document: HealthMedicalDocument = {
        claimDocumentType: HealthClaimDocumentFileType.ReceiptFile,
        documentNumber: data.medicalDocsData.receiptFile.number ?? '',
        documentDate: data.medicalDocsData.receiptFile.date ?? new Date(),
        documentDescription: 'Description',
        documentFiles: data?.docsFiles.receiptFiles.map<HealthMedicalDocumentFile>((f) => ({
          originalFileName: f.fileName,
          fileData: f.fileContent
        }))
      };

      documents.push(document);
    }
    if (data?.docsFiles.labTestFiles?.length > 0) {
      const document: HealthMedicalDocument = {
        claimDocumentType: HealthClaimDocumentFileType.AmbulatoryFile,
        documentNumber: data.medicalDocsData.labTestFile.number ?? '',
        documentDate: data.medicalDocsData.labTestFile.date ?? new Date(),
        documentDescription: 'Description',
        documentFiles: data?.docsFiles.labTestFiles.map<HealthMedicalDocumentFile>((f) => ({
          originalFileName: f.fileName,
          fileData: f.fileContent
        }))
      };

      documents.push(document);
    }
    if (data?.docsFiles.cardTherapyFiles?.length > 0) {
      const document: HealthMedicalDocument = {
        claimDocumentType: HealthClaimDocumentFileType.AmbulatoryFile,
        documentNumber: data.medicalDocsData.cardTherapyFile.number ?? '',
        documentDate: data.medicalDocsData.cardTherapyFile.date ?? new Date(),
        documentDescription: 'Description',
        documentFiles: data?.docsFiles.cardTherapyFiles.map<HealthMedicalDocumentFile>((f) => ({
          originalFileName: f.fileName,
          fileData: f.fileContent
        }))
      };

      documents.push(document);
    }

    return documents;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
