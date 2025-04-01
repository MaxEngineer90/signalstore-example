import { Component, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { BuildInfoDialogComponent } from '../../dialog/build-info-dialog/build-info-dialog.component';
import { MatListItem, MatNavList } from '@angular/material/list';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-nav-bar',
  imports: [
    MatToolbar,
    RouterLinkActive,
    RouterLink,
    MatListItem,
    MatNavList,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatIcon,
    MatIconButton,
    MatButtonToggleModule,
    RouterOutlet,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  private dialog = inject(MatDialog);
  private readonly titleService = inject(Title);
  appTitle = this.titleService.getTitle();

  openBuildInfoDialog(): void {
    this.dialog.open(BuildInfoDialogComponent, { width: '400px' });
  }
}
