import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { CartridgeService } from "./../../services/cartridge.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-device-type",
  templateUrl: "./device-type.component.html",
  styleUrls: ["./device-type.component.css"],
})
export class DeviceTypeComponent implements OnInit {

  myControl = new FormControl();
  labelList: string[] = [];
  filteredOptions: any[] = []

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private cartridgeService: CartridgeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createDeviceTypeForm();
    this.addParameter();
    this.getUiLabels();
    this.getParamValueTypes();
    this.getDeviceTypes();
    this.onActivate(event);
  }

  onActivate(event) {
    window.scroll(0, 0);
  }

  deviceTypeForm: FormGroup;
  createDeviceTypeForm() {
    this.deviceTypeForm = this.fb.group({
      name: ["", Validators.required],
      parameters: this.fb.array([]),
    });
  }

  getDeviceParams(event) {
    this.cartridgeService
      .getTempDeviceTypeParameters(event.data.name)
      .subscribe((resp: any) => {
        event.data.parameters = resp;
      });
  }

  get f() {
    return this.deviceTypeForm.controls;
  }
  get parameters() {
    return this.deviceTypeForm.get("parameters") as FormArray;
  }

  isAddAttempted = false;
  addParameter() {
    if (this.parameters.invalid) {
      this.toastr.error(
        "Please fill all the mandatory fields of all the parameters"
      );
      this.isAddAttempted = true;
      return;
    }
    this.parameters.push(this.createParameter());
  }
  validateParameters(params) {
    let isValid = true;
    params.map((param) => {
      if (!param.value || !param.value.trim()) {
        isValid = false;
      }
    });
    return isValid;
  }
  removeParameter(index: number) {
    if (this.parameters.length !== 1) {
      this.parameters.removeAt(index);
    }
  }
  createParameter() {
    return this.fb.group({
      deviceLabel: ["", Validators.required],
      uiLabel: ["", Validators.required],
      valueType: ["", Validators.required],
      isStaticOrDynamic: ["", Validators.required],
      minValue: [""],
      maxValue: [""],
      isFilter: false
    });
  }

  checkBox() {
    console.log(this.parameters);
  }

  deviceTypes: any = [];
  getDeviceTypes() {
    this.cartridgeService.getTempDeviceTypes().subscribe((resp: any) => {
      this.deviceTypes = resp;
    });
  }

  submitted = false;
  saveDevice() {
    this.submitted = true;
    const dataToSend = this.createDeviceTypeData();
    console.log(dataToSend);
    this.cartridgeService.createDeviceType(dataToSend).subscribe(
      (resp: any) => {
        this.createDeviceTypeForm();
        this.addParameter();
        this.submitted = false;
        this.toastr.success("Device type created successfully.");
        this.router.navigate(['/device-type-list'])
        this.getDeviceTypes();
      },
      (err: HttpErrorResponse) => {
        this.submitted = false;
        this.toastr.success(err.message);
      }
    );
  }

  createDeviceTypeData() {
    const dataToSend: any = {};
    dataToSend.name = this.deviceTypeForm.value.name;
    dataToSend.deviceGroup = "0";
    const parameters = this.deviceTypeForm.value.parameters.map((param) => {
      return {
        deviceLabel: param.deviceLabel,
        uiLabel: param.uiLabel.id.toString(),
        valueType: param.valueType.toString(),
        isStaticOrDynamic: param.isStaticOrDynamic,
        isFilter: param.isFilter,
        // units: param.units,
        // maxValue: param.maxValue,
        // minValue: param.minValue
      };
    });
    dataToSend.parameters = parameters;
    return dataToSend;
  }

  deleteDeviceName: string;
  uiLabels: any = [];
  getUiLabels() {
    this.cartridgeService.getUiLabels().subscribe((data: any) => {
      this.uiLabels = data;
      console.log(this.uiLabels);
      this.labelList = data;
      console.log(this.labelList);
    });
  }

  onFocus(i) {
    console.log(i)
  }

  filterLabels(val: string) {
    console.log(val);
    this.filteredOptions = val && val != "" ? this.labelList.filter((s: any) => s.name.toLowerCase().indexOf(val.toLowerCase()) >= 0) : this.labelList;
  }

  onTypeSelect(eve) {
    console.log(eve);
    console.log(this.deviceTypeForm.value.parameters)
  }

  selectedclient(event) {
    console.log(event.option.value);
  }

  getOptionText(option) {
    return option.name;
  }

  private _filter(value: any) {
    console.log(value);
    const filterValue = value.toLowerCase();
    console.log(this.labelList.filter((option: any) => option.name.toLowerCase().includes(filterValue)));
    return this.labelList.filter((option: any) => option.name.toLowerCase().includes(filterValue));
  }

  paramValueTypes: any = [];
  getParamValueTypes() {
    this.cartridgeService.getParamValueTypes().subscribe((data: any) => {
      this.paramValueTypes = data;
    });
  }

  filteredLabels: any = [];
  searchLabels(event) {
    let query = event.query;
    this.filteredLabels = this.filterCountry(query, this.uiLabels);
    console.log(this.filteredLabels);
  }

  filterCountry(query, uiLabels: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < uiLabels.length; i++) {
      let uiLabel = uiLabels[i];
      if (uiLabel.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(uiLabel);
      }
    }
    return filtered;
  }

  deleteDeviceType() {
    this.cartridgeService
      .deleteTempDeviceTypes(this.deleteDeviceName)
      .subscribe((resp: any) => {
        this.getDeviceTypes();
      });
  }

  spaceNotAllowed(event) {
    if (event.keyCode === 32) {
      return false;
    }
  }

}
