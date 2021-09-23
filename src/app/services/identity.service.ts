import { Injectable } from '@angular/core';
import { CommonServiceService } from './common-service.service';


CommonServiceService
@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  constructor(
    private commonService :CommonServiceService,
  ) { }

  identityPost(data){
    return this.commonService.postService('v1/admin/identity', data)
  }
  getIdetities(){
    return this.commonService.getService("v1/admin/identities");
  }
  updateIdetities(id,data){
    return this.commonService.putService("v1/admin/identity/"+id,data);
  }
  deleteIdetities(id){
    return this.commonService.deleteService("v1/admin/identity/"+id);
  }
}
