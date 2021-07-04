import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ExceptionResponse } from '@models/entities';

interface ErrorDialogData {

  exception: ExceptionResponse;
}

@Component({
  selector: 'dma-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: [ './error-dialog.component.scss' ],
})
export class ErrorDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ErrorDialogData) {}

  get originString(): string {
    return `${this.data.exception.origin}-side`;
  }
}
