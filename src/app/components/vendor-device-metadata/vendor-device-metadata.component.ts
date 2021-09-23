import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";

@Component({
  selector: 'app-vendor-device-metadata',
  templateUrl: './vendor-device-metadata.component.html',
  styleUrls: ['./vendor-device-metadata.component.css']
})
export class VendorDeviceMetadataComponent implements OnInit {
  vedorForm: FormGroup;
  parmValues = false;
  showhidepregnant: boolean;

  constructor(
    private fb: FormBuilder,

  ) { }

  ngOnInit() {
    this.createVedorForm();
  }

  createVedorForm() {
    this.vedorForm = this.fb.group({
      name: ["", Validators.required],
      protocol: ["", Validators.required],
      deviceType: ["", Validators.required],
      Params: this.fb.array([]),
      DeviceParams: this.fb.array([]),
    });
  }
  get f() {
    return this.vedorForm.controls;
  }
  //Params
  get Params() {
    return this.vedorForm.get('Params') as FormArray;
  }

  addMoreParams() {
    return this.fb.group({
      key: [''],
      value: [''],
    });
  }
  addParams() {
    this.parmValues = false;
    this.Params.push(this.addMoreParams());
  }
  removeParams(index: any) {
    this.Params.removeAt(index);
  }

  // metadata params
  get DeviceParams() {
    return this.vedorForm.get('DeviceParams') as FormArray;
  }
  addMetadataParams() {
    return this.fb.group({
      key: [''],
      value: [''],
    });
  }
  addDeviceParams() {
    this.parmValues = false;
    this.DeviceParams.push(this.addMoreParams());
  }
  removeDeviceParams(index: any) {
    this.DeviceParams.removeAt(index);
  }
  activeFormId = 1;
  toggleActiveScreen(screenId: number) {
    if (screenId === 1) {
      this.activeFormId = 2;
    } else if (screenId === 2) {
      this.activeFormId = 1;
    }
  }
}
