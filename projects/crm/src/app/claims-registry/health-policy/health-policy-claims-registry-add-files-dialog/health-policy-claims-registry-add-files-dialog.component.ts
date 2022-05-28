import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClaimDocumentType } from 'projects/crm-api/model/claimDocumentType';
import { Document } from 'projects/crm-api/model/document';
import { GetClaimDocumentFileResponse } from 'projects/crm-api/model/getClaimDocumentFileResponse';
import { Subscription } from 'rxjs';
import { ErrorMessage } from 'src/app/_enumerations/error-messages';
import {
  HealthClaimDocumentFileType,
  HealthClaimDocumentFileTypeName
} from 'src/app/_enumerations/health-claim-document-file-type';
import { InfoMessages } from 'src/app/_enumerations/info-messages';
import { Base64File } from 'src/app/_models/base64File';
import { Message } from 'src/app/_models/message';
import { DocumentsService } from 'src/app/_nomServices/documents.service';
import { MessengerService } from 'src/app/_services/messenger.service';
import { ClaimsRegistryPreviewService } from '../../claims-registry-preview.service';
import { HealthPolicyClaimRegistryDialogData, MaxAllFilesSizeMB, RequiredFileTypes } from '../../claims-registry-types';

@Component({
  selector: 'crm-health-policy-claims-registry-add-files-dialog',
  templateUrl: './health-policy-claims-registry-add-files-dialog.component.html',
  styleUrls: ['./health-policy-claims-registry-add-files-dialog.component.scss']
})
export class HealthPolicyClaimsRegistryAddFilesDialogComponent implements OnInit, OnDestroy {
  readonly subscriptions: Subscription = new Subscription();
  dialogData: HealthPolicyClaimRegistryDialogData;
  allFilesSize: number = 0;
  documentTypes: ClaimDocumentType[];
  existingDocuments = {
    invoices: [] as Document[],
    receipts: [] as Document[],
    ambulatories: [] as Document[],
    labTests: [] as Document[],
    cardTherapies: [] as Document[]
  };

  maxDate: Date = new Date();
  minDate: Date = new Date(this.maxDate.getFullYear() - 1, this.maxDate.getMonth());
  edit: boolean = false;

  maxAllFilesSize: number = MaxAllFilesSizeMB;
  InfoMessages = InfoMessages;
  HealthClaimDocumentFileType = HealthClaimDocumentFileType;
  HealthClaimDocumentFileTypeName = HealthClaimDocumentFileTypeName;
  RequiredFileTypes: string = RequiredFileTypes;

  form: FormGroup = this.fb.group({
    ambulatoryDocNumber: [null],
    ambulatoryDocDate: [null],

    invoiceDocNumber: [null],
    invoiceDocDate: [null],

    receiptDocNumber: [null],
    receiptDocDate: [null],

    labTestDocNumber: [null],
    labTestDocDate: [null],

    cardTherapyDocNumber: [null],
    cardTherapyDocDate: [null]
  });

  constructor(
    private dialogRef: MatDialogRef<HealthPolicyClaimsRegistryAddFilesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HealthPolicyClaimRegistryDialogData,
    private claimsRegistryPreviewService: ClaimsRegistryPreviewService,
    private fb: FormBuilder,
    private documentsService: DocumentsService,
    private messengerService: MessengerService
  ) {
    this.dialogData = {
      docsFiles: { ...data.docsFiles },
      medicalDocsData: { ...data.medicalDocsData },
      documents: [...data.documents],
      utils: { ...data.utils }
    };

    this.documentTypes = this.claimsRegistryPreviewService.getClaimRegistryUtils()?.documentTypes ?? [];

    this.existingDocuments = {
      invoices:
        this.dialogData.documents.filter((d) => d.documentTypeId === HealthClaimDocumentFileType.InvoiceFile) ?? [],
      receipts:
        this.dialogData.documents.filter((d) => d.documentTypeId === HealthClaimDocumentFileType.ReceiptFile) ?? [],
      ambulatories:
        this.dialogData.documents.filter((d) => d.documentTypeId === HealthClaimDocumentFileType.AmbulatoryFile) ?? [],
      labTests:
        this.dialogData.documents.filter((d) => d.documentTypeId === HealthClaimDocumentFileType.LabTestFile) ?? [],
      cardTherapies:
        this.dialogData.documents.filter((d) => d.documentTypeId === HealthClaimDocumentFileType.CardTherapyFile) ?? []
    };
  }

  downloadFile(fileName: string, base64String: string) {
    let fileArray = fileName.split('.');
    let fileType = fileArray[fileArray.length - 1]?.toLowerCase() ?? 'pdf';
    let source = '';
    switch (fileType) {
      case 'pdf': {
        source = `data:application/pdf;base64,${base64String}`;
        break;
      }
      case 'jpeg': {
        source = `data:image/jpeg;base64,${base64String}`;
        break;
      }
      case 'jpg': {
        source = `data:image/jpg;base64,${base64String}`;
        break;
      }
      case 'png': {
        source = `data:image/png;base64,${base64String}`;
        break;
      }
    }
    const link = document.createElement('a');
    link.href = source;
    link.download = `${fileName}`;
    link.click();
  }

  onClickDownloadFile(claimNumber: string, fileId: number) {
    this.subscriptions.add(
      this.documentsService.getFileByClaimNumberAndFileId(claimNumber, fileId).subscribe({
        next: (response: GetClaimDocumentFileResponse) => {
          this.downloadFile(response.file?.originalFileName!, response.file?.fileData!);
        },
        error: () => this.messengerService.add(new Message(ErrorMessage.TryAgain, false))
      })
    );
  }

  ngOnInit(): void {
    if (true) {
    }
  }

  getFileMaxSize(fileType: HealthClaimDocumentFileType): number {
    return this.documentTypes?.find((doc) => doc.externalDocumentTypeId === fileType)?.maxFileSize ?? 6;
  }

  onFilesSelected(event: any, documentTypeId: number) {
    const selectedFiles = [...(event as Base64File[])];

    if (documentTypeId === HealthClaimDocumentFileType.AmbulatoryFile) {
      this.dialogData.docsFiles.ambulatoryFiles = selectedFiles;
      const ambulatoryDocNumberControl = this.form.controls['ambulatoryDocNumber'];
      const ambulatoryDocDateControl = this.form.controls['ambulatoryDocDate'];

      this.setDocDataValidators(
        ambulatoryDocNumberControl as FormControl,
        ambulatoryDocDateControl as FormControl,
        this.dialogData.docsFiles.ambulatoryFiles.length > 0
      );
    } else if (documentTypeId === HealthClaimDocumentFileType.InvoiceFile) {
      this.dialogData.docsFiles.invoiceFiles = selectedFiles;
      const invoiceDocNumberControl = this.form.controls['invoiceDocNumber'];
      const invoiceDocDateControl = this.form.controls['invoiceDocDate'];

      this.setDocDataValidators(
        invoiceDocNumberControl as FormControl,
        invoiceDocDateControl as FormControl,
        this.dialogData.docsFiles.invoiceFiles.length > 0
      );
    } else if (documentTypeId === HealthClaimDocumentFileType.ReceiptFile) {
      this.dialogData.docsFiles.receiptFiles = selectedFiles;
      const receiptDocNumberControl = this.form.controls['receiptDocNumber'];
      const receiptDocDateControl = this.form.controls['receiptDocDate'];

      this.setDocDataValidators(
        receiptDocNumberControl as FormControl,
        receiptDocDateControl as FormControl,
        this.dialogData.docsFiles.receiptFiles.length > 0
      );
    } else if (documentTypeId === HealthClaimDocumentFileType.LabTestFile) {
      this.dialogData.docsFiles.labTestFiles = selectedFiles;
      const labTestDocNumberControl = this.form.controls['labTestDocNumber'];
      const labTestDocDateControl = this.form.controls['labTestDocDate'];

      this.setDocDataValidators(
        labTestDocNumberControl as FormControl,
        labTestDocDateControl as FormControl,
        this.dialogData.docsFiles.labTestFiles.length > 0
      );
    } else if (documentTypeId === HealthClaimDocumentFileType.CardTherapyFile) {
      this.dialogData.docsFiles.cardTherapyFiles = selectedFiles;
      const cardTherapyDocNumberControl = this.form.controls['cardTherapyDocNumber'];
      const cardTherapyDocControl = this.form.controls['cardTherapyDocDate'];

      this.setDocDataValidators(
        cardTherapyDocNumberControl as FormControl,
        cardTherapyDocControl as FormControl,
        this.dialogData.docsFiles.cardTherapyFiles.length > 0
      );
    }

    this.allFilesSize = Object.values(this.dialogData.docsFiles)
      .flat()
      .map((f) => f.fileSize)
      .reduce((prev, curr) => prev + curr, 0);
  }

  showAddBtn() {
    this.edit = true;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const fv = this.form.value;

    this.dialogData.medicalDocsData.ambulatoryFile.number = fv.ambulatoryDocNumber;
    this.dialogData.medicalDocsData.ambulatoryFile.date = fv.ambulatoryDocDate;
    this.dialogData.medicalDocsData.invoiceFile.number = fv.invoiceDocNumber;
    this.dialogData.medicalDocsData.invoiceFile.date = fv.invoiceDocDate;
    this.dialogData.medicalDocsData.receiptFile.number = fv.receiptDocNumber;
    this.dialogData.medicalDocsData.receiptFile.date = fv.receiptDocDate;
    this.dialogData.medicalDocsData.labTestFile.number = fv.labTestDocNumber;
    this.dialogData.medicalDocsData.labTestFile.date = fv.labTestDocDate;
    this.dialogData.medicalDocsData.cardTherapyFile.number = fv.cardTherapyDocNumber;
    this.dialogData.medicalDocsData.cardTherapyFile.date = fv.cardTherapyDocDate;

    this.dialogRef.close(this.dialogData);
  }

  close() {
    this.dialogRef.close();
  }

  formatFileName(fileName: string) {
    let normalizedName = fileName;
    const pointPos = fileName.lastIndexOf('.');
    const fileType = fileName.slice(pointPos);
    const name = fileName.slice(0, pointPos + 1);

    if (name.length > 32) {
      normalizedName = name.substring(0, 30).concat(...['..', fileType]);
    }

    return normalizedName;
  }

  private setDocDataValidators(numberControl: FormControl, dateControl: FormControl, hasFile: boolean) {
    if (hasFile) {
      numberControl.setValidators(Validators.required);
      numberControl.updateValueAndValidity();

      dateControl.setValidators(Validators.required);
      dateControl.updateValueAndValidity();
    } else {
      numberControl.clearValidators();
      numberControl.updateValueAndValidity();

      dateControl.clearValidators();
      dateControl.updateValueAndValidity();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
