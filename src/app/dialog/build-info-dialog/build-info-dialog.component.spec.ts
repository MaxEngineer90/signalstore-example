import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildInfoDialogComponent } from './build-info-dialog.component';

describe('BuildDialogComponent', () => {
  let component: BuildInfoDialogComponent;
  let fixture: ComponentFixture<BuildInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildInfoDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BuildInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
