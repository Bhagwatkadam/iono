import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  deviceForm: FormGroup;
  options: string[] = ['Water', 'Two', 'Three'];
  filteredOptions: any[] = [];
  constructor(private fb: FormBuilder, private deviceService: DeviceService,
     private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.createDeviceForm();
  }
  filterLabels(val: string) {
    this.filteredOptions = val && val != "" ? this.options.filter((s: any) => s.toLowerCase().indexOf(val.toLowerCase()) >= 0) : this.options;
  }
  createDeviceForm() {
    this.deviceForm = this.fb.group({
      deviceId: [""],
      name: ["", Validators.required],
      type: ["", Validators.required],
      // vendorId: ["", Validators.required],
    });
  }
  saveDevice() {
    this.deviceService.addDevice(this.deviceForm.value).subscribe(res =>{
      this.toastr.success("Device type created successfully.");
      this.router.navigate(['/all-devices-list'])
    }, (err: HttpErrorResponse) => {
      this.toastr.success(err.message);
    })
  }

  get f() {
    return this.deviceForm.controls;
  }
}
