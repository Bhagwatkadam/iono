import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { CartridgeService } from "./../../services/cartridge.service";
import { format } from "url";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
@Component({
  selector: "app-cartridge",
  templateUrl: "./cartridge.component.html",
  styleUrls: ["./cartridge.component.css"],
})
export class CartridgeComponent implements OnInit {
  cartridgeForm: FormGroup;
  submitted: Boolean = false;
  cartridgeValues: any;
  editId: any;

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  dtInstance: DataTables.Api;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cartridgeService: CartridgeService,
    private toastr: ToastrService
  ) { }
  deleteId: string = "";
  configData: any;
  ngOnInit() {
    this.createCartridgeForm();
    this.getCartridgeList();
    this.addParameter();
    this.getConnectivityProtocols();
    this.getDeviceTypes();
    this.onActivate(event);
  }
  getDatatableOptions() {
    return {
      pageLength: 10,
      lengthMenu: [5, 10, 25, 50, 100],
      displayLength: 5,
      // buttons: ["print", "excel", "pdf"],
    };
  }
  onActivate(event) {
    window.scroll(0, 0);
  }

  protocols: any = [];
  getConnectivityProtocols() {
    this.cartridgeService.getTempProtocols().subscribe(
      (resp: any) => {
        this.protocols = resp;
        console.log(this.protocols)
      },
      (err: any) => { }
    );
  }
  protocolParameters: any = [];
  getProtocolParameters() {
    let protocol = "";
    if (this.isEdit) {
      protocol = this.cartridgeFormData.protocol;
    } else {
      protocol = this.cartridgeForm.value.protocol;
    }
    this.cartridgeService.getProtocolParameters(protocol).subscribe(
      (resp: any) => {
        this.protocolParameters = resp;
        console.log(this.protocolParameters);
      },
      (err: any) => { }
    );
  }
  deviceTypes: any = [];
  getDeviceTypes() {
    this.cartridgeService.getTempDeviceTypes().subscribe(
      (resp: any) => {
        this.deviceTypes = resp;
      },
      (err: any) => { }
    );
  }
  deviceTypeParameters: any = [];
  getDeviceTypeParameters() {
    let deviceTye = "";
    if (this.isEdit) {
      deviceTye = this.cartridgeFormData.deviceType;
    } else {
      deviceTye = this.cartridgeForm.value.deviceType;
    }
    this.cartridgeService.getTempDeviceTypeParameters(deviceTye).subscribe(
      (resp: any) => {
        this.deviceTypeParameters = resp;
      }
    );
  }
  activeFormId = 1;
  toggleActiveScreen(screenId: number) {
    if (screenId === 1) {
      this.activeFormId = 2;
    } else if (screenId === 2) {
      this.activeFormId = 1;
    }
  }
  createCartridgeForm() {
    this.cartridgeForm = this.fb.group({
      name: ["", Validators.required],
      protocol: ["", Validators.required],
      deviceType: ["", Validators.required],
      customParameters: this.fb.array([]),
      // config: ["", Validators.required],
    });
  }
  get f() {
    return this.cartridgeForm.controls;
  }
  get customParameters() {
    return this.cartridgeForm.get("customParameters") as FormArray;
  }
  createParameter() {
    return this.fb.group({
      value: [""],
    });
  }

  addParameter() {
    if (this.customParameters.value && this.customParameters.value.length > 0) {
      if (!this.validateCustomParameters(this.customParameters.value)) {
        this.toastr.error("Please fill previous parametrs before adding.");
        return;
      }
    }
    this.customParameters.push(this.createParameter());
  }
  validateCustomParameters(params) {
    let isValid = true;
    params.map((param) => {
      if (!param.value || !param.value.trim()) {
        isValid = false;
      }
    });
    return isValid;
  }
  removeParameter(index: number) {
    if (this.customParameters.length !== 1) {
      this.customParameters.removeAt(index);
    }
  }
  createCatridge() {
    this.submitted = true;
    const cartridgeInfo = this.createCartridgeDataToSubmit(
      this.cartridgeForm.value
    );
    this.cartridgeService.cartridgePost(cartridgeInfo).subscribe(
      (resp: any) => {
        this.getCartridgeList();
        // this.createCartridgeForm();
        this.toastr.success("Submitted successfully");
        this.activeFormId = 1;
        this.submitted = false;
        this.router.navigate(['/cartridge-list'])
      },
      (err: any) => {
        this.submitted = false;
      }
    );
  }
  createCartridgeDataToSubmit(cartridge) {
    const cartridgeInfo: any = {
      config: {
        connectivity: {
          parameters: {},
        },
        deviceModeling: {
          parameters: {},
        },
      },
    };
    this.protocolParameters.map((param) => {
      cartridgeInfo.config.connectivity.parameters[param.parameter] = "";
    });
    const customParams = cartridge.customParameters
      .map((param) => param.value)
      .filter((value) => value);
    let deviceTypeParams = [...this.deviceTypeParameters];
    if (customParams.length > 0) {
      deviceTypeParams = [...deviceTypeParams, ...customParams];
    }
    deviceTypeParams.map((param) => {
      cartridgeInfo.config.deviceModeling.parameters[param.device_label] = "";
    });
    cartridgeInfo.config.connectivity.protocol = cartridge.protocol;
    cartridgeInfo.config.deviceModeling.deviceType = cartridge.deviceType;
    cartridgeInfo.name = cartridge.name;
    return cartridgeInfo;
  }
  submitCartridgeForm(form: FormGroup) {
    this.submitted = true;
    if (form.valid) {
      let reqData = form.value;
      let config = JSON.parse(reqData.config);
      reqData.config = config;
      this.cartridgeService.cartridgePost(reqData).subscribe((resp: any) => {
        this.getCartridgeList();
        this.createCartridgeForm();
        this.toastr.success("Submitted successfully");
        this.submitted = false;
      });
    } else {
      console.log("invalid");
    }
  }

  cartridgeList: any = [];

  getCartridgeList() {
    this.dtOptions = this.getDatatableOptions();
    this.cartridgeService.getCartridge().subscribe((resp: any) => {
      this.cartridgeList = resp;
    });
  }
  ngOnDestroy(): void {
    // this.dtTrigger.unsubscribe();
  }
  ngAfterViewInit(): void {
    // this.dtTrigger.next();
  }

  isEdit = false;
  cartridgeToEdit: any = {};
  editCartridge(cartridge) {
    this.isEdit = true;
    this.cartridgeToEdit = JSON.parse(JSON.stringify(cartridge));
    this.prepareCartridgeDataToEdit();
  }

  cartridgeFormData: any = {};
  prepareCartridgeDataToEdit() {
    this.cartridgeFormData.name = this.cartridgeToEdit.name;
    this.cartridgeFormData.protocol = this.cartridgeToEdit.config.connectivity.protocol;
    this.cartridgeFormData.deviceType = this.cartridgeToEdit.config.deviceModeling.deviceType;
    this.getDeviceTypeParameters();
    this.getProtocolParameters();
  }

  clearEditCartridgeData() {
    this.createCartridgeForm();
    this.cartridgeFormData = {};
    this.cartridgeToEdit = {};
    this.addParameter();
    this.activeFormId = 1;
    this.isEdit = false;
  }

  updateCartridge() {
    this.submitted = true;
    const cartridgeInfo = this.createCartridgeDataToSubmit(
      this.cartridgeForm.value
    );
    this.cartridgeService
      .updateCatridge(this.cartridgeToEdit.id, cartridgeInfo)
      .subscribe(
        (data: any) => {
          this.getCartridgeList();
          this.toastr.success("Updated successfully");
          this.submitted = false;
          this.createCartridgeForm();
          this.clearEditCartridgeData();
        },
        (err: any) => {
          this.submitted = false;
        }
      );
  }
  deleteCartridgeValue(id) {
    if (id) {
      this.cartridgeService.deleteCatridge(id).subscribe((data: any) => {
        this.toastr.success("Deleted successfully");
        this.getCartridgeList();
      });
    }
  }
}
