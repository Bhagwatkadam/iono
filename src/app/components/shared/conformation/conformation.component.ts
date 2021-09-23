import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-conformation',
  templateUrl: './conformation.component.html',
  styleUrls: ['./conformation.component.css']
})
export class ConformationComponent implements OnInit {
  dialogMessage?: string;
  constructor( @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<any>) { 
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.dialogMessage = this.data.dialogMessage;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
