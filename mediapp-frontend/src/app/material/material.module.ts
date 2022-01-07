import { MatPaginatorImpl } from './mat-paginator';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSortModule, MatPaginatorModule, MatCardModule, MatSnackBarModule, MatSidenavModule, MatMenuModule, MatToolbarModule, MatDividerModule, MatDialogModule, MatPaginatorIntl, MatCheckboxModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE, MatExpansionModule, MatAutocompleteModule, MatStepperModule, MatSlideToggleModule, MatGridListModule, MatProgressBarModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatDividerModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatProgressBarModule
  ],exports:[
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatDividerModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatProgressBarModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorImpl},
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ]
})
export class MaterialModule { }
