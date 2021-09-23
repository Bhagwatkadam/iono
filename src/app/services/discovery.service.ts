import { Injectable } from '@angular/core';
import { CommonServiceService } from './common-service.service';

@Injectable({
  providedIn: 'root'
})
export class DiscoveryService {

  constructor(
    private commonService :CommonServiceService,

  ) { }

  discoveryPost(data){
    return this.commonService.postService('v1/admin/discovery/scan', data)
  }
  getDiscovery(){
    return this.commonService.getService("v1/admin/discovery/list");
  }

  updateDiscovery(data, id){
    return this.commonService.putService(`v1/admin/discovery/scan/${id}`, data)
  }

  deleteDiscovery(id){
    return this.commonService.deleteService(`v1/admin/discovery/scan/${id}`)
  }

  runScan(scanId){
    return this.commonService.postService(`v1/admin/discovery/scan/run/${scanId}`, {});
  }
  getRunList(scanId){
    return this.commonService.getService(`v1/admin/discovery/scan/run/${scanId}`);
  }
}
