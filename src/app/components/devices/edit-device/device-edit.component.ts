import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-device-edit',
  templateUrl: './device-edit.component.html',
  styleUrls: ['./device-edit.component.css']
})
export class DeviceEditComponent implements OnInit {
  deviceForm: FormGroup;
  isDeviceDisabled: boolean = true;
  options: string[] = ['Water', 'Two', 'Three'];
  filteredOptions: any[] = [];

  constructor(private fb: FormBuilder, private deviceService: DeviceService,
    private toastr: ToastrService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.createDeviceForm();
    this.route.queryParams.subscribe(data => {
      this.bindForm(data);
    })
  }

  filterLabels(val: string) {
    this.filteredOptions = val && val != "" ? this.options.filter((s: any) => s.toLowerCase().indexOf(val.toLowerCase()) >= 0) : this.options;
  }

  bindForm(data: any){
    this.deviceForm.get("id").setValue(data.id);
    this.deviceForm.get("timestamp").setValue(data.id);
    this.deviceForm.get("deviceId").setValue(data.deviceId);
    this.deviceForm.get("name").setValue(data.name);
    this.deviceForm.get("type").setValue(data.type);
  }
  createDeviceForm() {
    this.deviceForm = this.fb.group({
      id: [""],
      timestamp: [""],
      deviceId: [""],
      name: ["", Validators.required],
      type: ["", Validators.required]
    });
  }
  updaeDevice() {
    this.deviceService.editDevice(this.deviceForm.value,this.deviceForm.get("id").value).subscribe(res => {
      this.toastr.success("Device updated successfully.");
      this.router.navigate(['/all-devices-list'])
    }, (err: HttpErrorResponse) => {
      this.toastr.success(err.message);
    })
  }

  get f() {
    return this.deviceForm.controls;
  }

}
