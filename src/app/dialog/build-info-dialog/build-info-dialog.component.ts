import { Component, inject } from '@angular/core';
import { BuildInfoService } from '../../../service/build/build-info.service';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-build-info-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    DatePipe,
  ],
  templateUrl: './build-info-dialog.component.html',
  styleUrl: './build-info-dialog.component.scss',
})
export class BuildInfoDialogComponent {
  private buildInfoService = inject(BuildInfoService);
  buildInfo = toSignal(this.buildInfoService.getBuildInfo(), {
    initialValue: null,
  });
}
