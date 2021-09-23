import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CartridgeService } from 'src/app/services/cartridge.service';
import { DeviceService } from 'src/app/services/device.service';
import { IdentityService } from 'src/app/services/identity.service';

@Component({
  selector: 'app-all-devices-delete-dialog',
  templateUrl: './all-devices-delete-dialog.component.html',
  styleUrls: ['./all-devices-delete-dialog.component.css']
})
export class AllDevicesDeleteDialogComponent implements OnInit {
  constructor(
    private identityService: IdentityService,
    private toastr: ToastrService,
    private deviceService: DeviceService,
    public dialogRef: MatDialogRef<AllDevicesDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit(): void {
    console.log(this.data);
  }

  delete() {
    if (this.data.deviceId) {
      // this.identityService.deleteIdetities(this.data.deviceId).subscribe((data: any) => {
      //   this.toastr.success('Deleted successfully');
      //   this.dialogRef.close();
      // }, error => {
      //   // this.toastr.error(error.error.error.message);
      // });
      this.deviceService.deleteDevice(this.data.deviceId).subscribe((data: any) => {
        this.toastr.success('Deleted successfully');
        this.dialogRef.close();
      }, error => {
        // this.toastr.error(error.error.error.message);
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

}
