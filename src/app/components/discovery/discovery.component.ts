import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from "@angular/forms";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";
import { delay, filter } from "rxjs/operators";
import { IdentityService } from "src/app/services/identity.service";
import { CartridgeService } from "./../../services/cartridge.service";
import { DiscoveryService } from "./../../services/discovery.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-discovery",
  templateUrl: "./discovery.component.html",
  styleUrls: ["./discovery.component.css"],
})
export class DiscoveryComponent implements OnInit {
  discoveryForm: FormGroup;
  submitted: boolean = false;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  // dtInstance: DataTables.Api;
  constructor(
    private fb: FormBuilder,
    private identityService: IdentityService,
    private toastr: ToastrService,
    private cartridgeService: CartridgeService,
    private discoveryService: DiscoveryService,
    private route:Router
  ) {}

  ngOnInit() {
    this.createDiscoveryForm();
    // this.addFilter();
    this.getIdentityList();
    this.getCartridgeList();
    this.getDiscoveryList();
    this.availableFilterKeys = [...this.masterFilterKeys];
    this.onActivate(event);

  }
  onActivate(event) {
    window.scroll(0, 0);
  }
  createDiscoveryForm() {
    this.discoveryForm = this.fb.group({
      // entityId: ["", Validators.required],
      cartridgeId: ["", Validators.required],
      protocol: ["", Validators.required],
      filterName: [""],
      filterLocation: [""],
      deviceType: ["", Validators.required],
      protocolParameters: this.fb.array([]),
      deviceParameters: this.fb.array([]),
      // filters: this.fb.array([]),
    });
  }

  selectedCartridgeInfo: any = {};
  getCartridgeInfo() {
    this.cartridgeService
      .getCartridgeById(this.discoveryForm.value.cartridgeId)
      .subscribe(
        (resp: any) => {
          this.selectedCartridgeInfo = resp;
          this.protocolParametersControl.clear();
          // this.deviceParametersControl.clear();
          this.buildDiscoveryFormParametersData();
        },
        (err: any) => {}
      );
  }

  activePage = 1;
  toggleActiveScreen(screenId: number) {
    if (screenId === 1) {
      this.activePage = 2;
    } else if (screenId === 2) {
      this.activePage = 1;
    }
  }

  deviceParametersLabels: any = [];
  protocolParametersLabels: any = [];
  mandatoryProtocolParams: any = [];
  buildDiscoveryFormParametersData() {
    this.cartridgeService
      .getMandatoryProtocolParameters(
        this.selectedCartridgeInfo.config.connectivity.protocol
      )
      .subscribe((resp: any) => {
        this.mandatoryProtocolParams = resp;
        this.deviceParametersLabels = [];
        this.protocolParametersLabels = [];
        for (let key in this.selectedCartridgeInfo.config.connectivity
          .parameters) {
          this.protocolParametersLabels.push(key);
        }
        for (let key in this.selectedCartridgeInfo.config.deviceModeling
          .parameters) {
          this.deviceParametersLabels.push(key);
        }
        this.protocolParametersLabels.map((param) => {
          if (resp.indexOf(param) >= 0) {
            this.protocolParametersControl.push(
              this.fb.group({
                value: ["", Validators.required],
              })
            );
          } else {
            this.protocolParametersControl.push(
              this.fb.group({
                value: [""],
              })
            );
          }
        });
        this.deviceParametersLabels.map((param) => {
          this.deviceParametersControl.push(
            this.fb.group({
              value: [""],
            })
          );
        });
        this.discoveryForm.patchValue({
          protocol: this.selectedCartridgeInfo.config.connectivity.protocol,
          deviceType: this.selectedCartridgeInfo.config.deviceModeling
            .deviceType,
        });
      });
  }

  currentDiscoveryToEdit: any = {};
  isEdit = false;
  buildEditDiscoveryFormParametersData(discovery) {
    this.isEdit = true;
    this.createDiscoveryForm();
    this.currentDiscoveryToEdit = JSON.parse(JSON.stringify(discovery));
    this.deviceParametersLabels = [];
    this.protocolParametersLabels = [];
    const deviceParameterValues = [];
    const protocolParameterValues = [];
    for (let key in this.currentDiscoveryToEdit.config.connectivity
      .parameters) {
      this.protocolParametersLabels.push(key);
      protocolParameterValues.push(
        this.currentDiscoveryToEdit.config.connectivity.parameters[key]
      );
    }
    for (let key in this.currentDiscoveryToEdit.config.deviceModeling
      .parameters) {
      this.deviceParametersLabels.push(key);
      deviceParameterValues.push(
        this.currentDiscoveryToEdit.config.deviceModeling.parameters[key]
      );
    }
    this.protocolParametersLabels.map((param, i) => {
      this.protocolParametersControl.push(
        this.fb.group({
          value: [protocolParameterValues[i], Validators.required],
        })
      );
    });
    this.deviceParametersLabels.map((param, i) => {
      this.deviceParametersControl.push(
        this.fb.group({
          value: [deviceParameterValues[i], Validators.required],
        })
      );
    });
    this.discoveryForm.patchValue({
      protocol: this.currentDiscoveryToEdit.config.connectivity.protocol,
      deviceType: this.currentDiscoveryToEdit.config.deviceModeling.deviceType,
      cartridgeId: this.currentDiscoveryToEdit.cartridgeId,
      entityId: this.currentDiscoveryToEdit.entityId,
    });
  }

  submitDiscoveryEditForm() {
    this.isSubmitted = true;
    const dataToSubmit = this.createDiscoveryDataToSubmit(
      this.discoveryForm.value
    );
    console.log(dataToSubmit);
    console.log(this.currentDiscoveryToEdit.id);
    this.discoveryService
      .updateDiscovery(dataToSubmit, this.currentDiscoveryToEdit.id)
      .subscribe(
        (resp: any) => {
          this.getDiscoveryList();
          this.createDiscoveryForm();
          this.toastr.success("Updated successfully");
          this.route.navigate(['/discovery-scan-list']);
          this.isSubmitted = false;
          this.activePage = 1;
          this.deviceParametersLabels = [];
          this.protocolParametersLabels = [];
          this.currentDiscoveryToEdit = {};
          this.isEdit = false;
        },
        (err: any) => {
          this.isSubmitted = false;
        }
      );
  }

  deleteId: any;
  deleteDiscoveryRecord() {
    this.discoveryService.deleteDiscovery(this.deleteId).subscribe(
      (resp: any) => {
        this.getDiscoveryList();
        this.createDiscoveryForm();
        this.toastr.success("Deleted successfully");
        this.isSubmitted = false;
        this.activePage = 1;
        this.deviceParametersLabels = [];
        this.protocolParametersLabels = [];
        this.currentDiscoveryToEdit = {};
        this.isEdit = false;
      },
      (err: any) => {
        this.isSubmitted = false;
      }
    );
  }

  clearEditData() {
    this.createDiscoveryForm();
    this.activePage = 1;
    this.deviceParametersLabels = [];
    this.protocolParametersLabels = [];
    this.currentDiscoveryToEdit = {};
    this.isEdit = false;
  }

  get f() {
    return this.discoveryForm.controls;
  }
  get protocolParametersControl() {
    return this.discoveryForm.get("protocolParameters") as FormArray;
  }
  get deviceParametersControl() {
    return this.discoveryForm.get("deviceParameters") as FormArray;
  }
  isSubmitted = false;
  submitDiscoveryForm() {
    this.isSubmitted = true;
    const dataToSubmit = this.createDiscoveryDataToSubmit(
      this.discoveryForm.value
    );
    this.discoveryService.discoveryPost(dataToSubmit).subscribe(
      (resp: any) => {
        this.getDiscoveryList();
        this.createDiscoveryForm();
        this.toastr.success("Submitted successfully");
        this.route.navigate(['/discovery-scan-list'])
        this.isSubmitted = false;
        this.activePage = 1;
        this.deviceParametersLabels = [];
        this.protocolParametersLabels = [];
      },
      (err: any) => {
        this.isSubmitted = false;
      }
    );
  }
  createDiscoveryDataToSubmit(discovery) {
    const discoveryInfo: any = {
      config: {
        connectivity: {
          parameters: {},
        },
        deviceModeling: {
          parameters: {},
        },
      },
    };
    discovery.protocolParameters.map((param, i) => {
      discoveryInfo.config.connectivity.parameters[
        this.protocolParametersLabels[i]
      ] = param.value;
    });
    discovery.deviceParameters.map((param, i) => {
      discoveryInfo.config.deviceModeling.parameters[
        this.deviceParametersLabels[i]
      ] = param.value;
    });
    discoveryInfo.config.connectivity.protocol = discovery.protocol;
    discoveryInfo.config.deviceModeling.deviceType = discovery.deviceType;
    discoveryInfo.cartridgeId = discovery.cartridgeId;
    discoveryInfo.entityId = "yitsol-demo-gateway001";
    const cartridge = this.cartridgeList.filter(
      (cartridge) => discovery.cartridgeId == cartridge.id
    );
    discoveryInfo.cartridgeName = cartridge[0].name;
    discoveryInfo.filter = {
      location: "bangalore",
    };

    return discoveryInfo;
  }

  availableFilterKeys = [];
  masterFilterKeys = [
    {
      label: "Device type",
      value: "deviceType",
    },
    {
      label: "Location",
      value: "location",
    },
    {
      label: "Device name",
      value: "deviceName",
    },
    {
      label: "Other",
      value: "other",
    },
  ];

  getDatatableOptions() {
    return {
      pageLength: 10,
      lengthMenu: [5, 10, 25, 50, 100],
      displayLength: 5,
      // buttons: ["print", "excel", "pdf"],
    };
  }

  identityList: any = [];
  getIdentityList() {
    this.identityService.getIdetities().subscribe((resp: any) => {
      this.identityList = resp.identities;
    });
  }

  cartridgeList: any = [];
  getCartridgeList() {
    this.cartridgeService.getCartridge().subscribe((resp: any) => {
      this.cartridgeList = resp;
    });
  }

  discoveryList: any = [];
  getDiscoveryList() {
    this.dtOptions = this.getDatatableOptions();
    this.discoveryService.getDiscovery().subscribe((resp: any) => {
      console.log(resp);
      this.discoveryList = resp;
      // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      //   dtInstance.destroy();
      //   this.dtTrigger.next();
      // });
    });
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  showSpinner = false;
  runScan(id) {
    this.showSpinner = true;
    this.discoveryService.runScan(id).subscribe((resp: any) => {
      this.toastr.success("Scan completed successfully");
      this.getDiscoveryList();
      this.showSpinner = false;
    });
  }

  runList: any = [];
  getRunList(scanId) {
    this.discoveryService.getRunList(scanId).subscribe((resp: any) => {
      this.runList = resp;
    });
  }

  devicesList: any = [];
  deviceTableColumns: any = [];
  deviceTableData: any = [];
  showDeviceList(scan) {
    this.deviceTableColumns = [];
    this.deviceTableData = [];
    this.cartridgeService
      .getTempDeviceTypeParameters(scan.config.deviceModeling.deviceType).pipe(delay(1000*3))
      .subscribe(
        (resp: any) => {
          const parametersList = resp;
          this.deviceTableColumns = [
            {
              header: "Device Id",
              field: "id",
            },
            {
              header: "Device Type",
              field: "type",
            },
            {
              header: "Version",
              field: "version",
            },
          ];
          this.deviceTableData = [];
          scan.devices.map((device, i) => {
            const data: any = {};
            data.id = device.id;
            data.type = device.type;
            data.version = device.version;
            for (let key in device.resources) {
              data[key] = device.resources[key];
            }
            if (i === 0) {
              const parameters = [];
              for (let key in device.resources) {
                parameters.push(key);
              }
              console.log(parameters);
              parameters.map((param) => {
                const matchingLabel = parametersList.filter(
                  (label) => param === label.device_label
                )[0];
                if(matchingLabel){
                  this.deviceTableColumns.push({
                    header: matchingLabel.ui_label,
                    field: matchingLabel.device_label,
                  });
                }
              });
            }
            this.deviceTableData.push(data);
          });
          console.log(this.deviceTableColumns);
          console.log(this.deviceTableData);
        },
        (err: any) => {}
      );
  }
}
