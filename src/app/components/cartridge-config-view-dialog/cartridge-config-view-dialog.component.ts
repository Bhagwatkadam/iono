import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cartridge-config-view-dialog',
  templateUrl: './cartridge-config-view-dialog.component.html',
  styleUrls: ['./cartridge-config-view-dialog.component.css']
})
export class CartridgeConfigViewDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CartridgeConfigViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
