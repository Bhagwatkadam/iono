import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { format } from 'url';
import { IdentityService } from 'src/app/services/identity.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';


class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.css']
})
export class IdentityComponent implements OnInit {
  nodeValues = true;
  identityForm: FormGroup;
  submitted: Boolean = false;
  identitivalues: any;
  nodeFrom: FormGroup;
  editId: any;
  config: any;
  nodesSubmitted: boolean = false;
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  // dtInstance: DataTables.Api;

  constructor(
    private fb: FormBuilder,
    private identityService: IdentityService,
    private toastr: ToastrService

  ) { }
  deleteId: string = '';
  unique:boolean=false;
  ngOnInit() {
    this.createentityFromGroup();
    this.createNodeForm();
    this.getIdentityList(); 
  }

  getDatatableOptions() {
    return {
      pageLength: 10,
      lengthMenu: [5, 10, 25, 50, 100],
      displayLength: 5,
    };
  }
  createentityFromGroup() {
    this.identityForm = this.fb.group({
      entityId: ['', Validators.required],
      version: ['', Validators.required],
      type: [''],      
      nodes: this.fb.array([])
    });
  }
  
  get f() {
    return this.identityForm.controls;
  }
  get nodes() {
    return this.identityForm.get('nodes') as FormArray;
  }
  createNodeForm() {
    this.nodeFrom = this.fb.group({
      nodeId: ['', Validators.required],
      version: ['', Validators.required],
      type: [''],
      nodes: this.fb.array([])

    });
  }

  addMoreNodes() {
    return this.fb.group({
      nodeId: ['', Validators.required],
      version: ['', Validators.required],
      type: [''],
    });
  }

  addItem() {
    this.nodeValues = false;
    this.nodes.push(this.addMoreNodes());
  }
  removeItem(index: any) {
    this.nodes.removeAt(index);
    console.log(this.nodes)
  }


  submitidentityForm(form: FormGroup) {
    this.submitted = true;
    if (form.valid) {
      let reqData = form.value;
      console.log("reqData", reqData);
      this.identityService.identityPost(reqData).subscribe((resp: any) => {
        this.getIdentityList();
        this.createentityFromGroup();
        this.toastr.success('Submitted successfully');
        this.submitted =false;
      });
    } else {
      console.log('invalid');
    }
  }

  identityList: any = [];

  getIdentityList() {
    this.dtOptions = this.getDatatableOptions();
    this.identityService.getIdetities().subscribe((resp: any) => {
      this.identityList = resp.identities;
      this.identityList.map((identity, i)=>{
        identity.sno = i+1;
      })
    });
  }

  nodeList = [];
  showNodes(item: any) {
    this.nodeList = item.nodes;
  }

  ngOnDestroy(): void {
    
  }
  ngAfterViewInit(): void {
    
  }
  identityAddUpdate = false;
  edidIdentity(id) {
    this.editId = id;
    this.createentityFromGroup();
    let editRecord = this.identityList.filter((identity) => {
      return identity.entityId == id;
    });
    if (editRecord.length > 0) {
      if (editRecord[0].nodes.length > 0) {
        this.nodeValues = false;
      }
      let values = editRecord[0];
      values.nodes.forEach((ele, index) => {
        this.nodes.push(
          this.addMoreNodes()
        )
      })
      this.identityForm.patchValue(values)
      this.identityAddUpdate = true;
    }
  }
  clearidentity() {
    this.createentityFromGroup();
    this.nodeValues = true;
    this.identityAddUpdate = false;
  }
  updateidentity(id, form: FormGroup) {
    if (form.valid) {
      let reqData = form.value;
      console.log("reqData", reqData);
      this.identityService.updateIdetities(id, reqData).subscribe((data: any) => {
        this.getIdentityList();
        this.toastr.success('Updated successfully');
        this.submitted =false;
        this.createentityFromGroup();
        this.nodeValues = true;
        this.identityAddUpdate = false;
      });
    } else {

    }
  }
  deleteIdentityValue(id) {
    if (id) {
      this.identityService.deleteIdetities(id).subscribe((data: any) => {
        this.toastr.success('Deleted successfully');
        this.getIdentityList();
      }, error => {
      });
    }
  }
}


