import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonServiceService } from './common-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private commonService :CommonServiceService,
    private httpClient: HttpClient
  ) { }

  createUser(data){
    return this.commonService.userPostService('v1/users', data)
  }
  getUser(){
    return this.commonService.userGetService('v1/users')
  }
  getUserById(id){
    return this.commonService.userGetService('v1/users/byUserId/'+id);
  }
  updateUserById(updatedata,id){
    return this.commonService.userUpdateService(`v1/users/${id}`, updatedata) 
   }
  deleteUser(id){
    return this.commonService.userDeleteService(`v1/users/${id}`);
  }

  forgotPassword(id){
    return this.commonService.userGetService('v1/users/forgotPassword/'+id);
  }

  changePassword(data: any){
    //return this.commonService.userPostService('v1/users/changePassword', data)
    let passwords ={"oldPassword": data.old_password,"newPassword": data.password};
    return this.httpClient.put('/api/user/password', passwords);
  }
}
