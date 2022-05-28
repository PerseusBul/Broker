import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TooltipPosition, TooltipTouchGestures, TooltipVisibility } from '@angular/material/tooltip';
import { faInfo as fasInfo } from '@fortawesome/free-solid-svg-icons/faInfo';
import { infoIconDefaultClass, tooltipDefaultCSS } from 'projects/shared/utils/various';
import { RequiredFileTypes } from 'src/app/claims-registry/claims-registry-types';
import { Base64File } from 'src/app/_models/base64File';

@Component({
  selector: 'upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {
  @Input() title: string = '';
  @Input() infoIconClass: string = infoIconDefaultClass;
  @Input() requiredFileTypes: string = RequiredFileTypes;
  @Input() maxParentFilesSize: number = 30;
  @Input() parentFilesSize: number = 0;
  @Input() maxFileSize: number = 6;
  @Input() presetFiles: Base64File[] = [];
  @Output() public onFilesSelected: EventEmitter<Base64File[]> = new EventEmitter();
  @Input() tooltipVisibility: TooltipVisibility = 'hidden';
  @Input() tooltipContent: string = '';
  @Input() tooltipPosition: TooltipPosition = 'right';
  @Input() tooltipClass: string = tooltipDefaultCSS;
  @Input() tooltipTouchGestures: TooltipTouchGestures = 'auto';
  @Input() tooltipHideDelay: number = 0;
  @Input() tooltipShowDelay: number = 0;
  @Input() tooltipDisabled: boolean = false;

  @ViewChild('fileUploadControl')
  fileUploadControl: ElementRef = {} as any;
  files: Base64File[] = [];
  errors: string[] = [];
  fileSetSize?: number;

  fasInfo = fasInfo;

  ngOnInit() {
    this.files = [...this.presetFiles];
  }

  runOnFilesSelected(event: any): void {
    this.convertFile(event.target.files);
    this.reset();
  }

  convertFile(files: FileList) {
    this.errors = [];
    const length = files.length;
    const selectedFilesSize =
      Object.values(files)
        .map((f) => f.size)
        .reduce((prev, curr) => prev + curr, 0) /
      1024 /
      1024;

    if (this.parentFilesSize + selectedFilesSize > this.maxParentFilesSize) {
      this.errors.push(
        `Общият размер на всички избрани от вас файлове на страницата е по-голям от допустимият - 30MB.`
      );
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (this.validateFile(file)) {
        const fileBase = {
          fileName: file.name,
          fileSize: file.size / (1024 * 1024),
          fileType: file.type
        } as Base64File;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          fileBase.fileContent = reader.result?.toString() ?? '';
          if (!this.isExist(fileBase)) {
            this.files.push(fileBase);
          }

          if (i === length - 1) {
            this.onFilesSelected.emit(this.files);
            this.calculateFileSetSize();
          }
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      }
    }
  }

  reset() {
    this.fileUploadControl.nativeElement.value = '';
  }

  removeFile(fileName: string) {
    this.files = this.files.filter((f) => f.fileName !== fileName);
    this.errors = [];
    this.onFilesSelected.emit(this.files);
    this.calculateFileSetSize();
  }

  validateFile(file: File | null): boolean {
    if (file && !this.requiredFileTypes.includes(file.type)) {
      this.errors.push(`Приложението не приема файлове с формат ${file.type}.`);
      return false;
    }

    if (file && file.size / (1024 * 1024) > this.maxFileSize) {
      this.errors.push(`Размерът на файла ${file.name} е по-голям от допустимият - 6MB.`);
      return false;
    }

    return true;
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

  calculateFileSetSize() {
    this.fileSetSize = this.files.map((f) => Number(f.fileSize.toFixed(1))).reduce((prev, curr) => prev + curr, 0);
  }

  isExist(file: Base64File | null) {
    if (file) {
      return this.files.map((f) => f.fileName).includes(file.fileName);
    }

    return false;
  }
}
