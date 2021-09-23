import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Device } from '../interfaces/device';
import { CommonServiceService } from './common-service.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  url: string = "http://localhost:8084/api/";
  data: Device[] = [
    {
      deviceId: "123",
      id: 1,
      name: "Device 1",
      timestamp: "Aug 1, 2021, 11:10:48 AM",
      type: "Water",
      vendorId: "12"
    },
    {
      deviceId: "11",
      id: 1,
      name: "Device 2",
      timestamp: "Aug 3, 2021, 11:10:48 AM",
      type: "Water",
      vendorId: "121"
    }
  ];
  constructor(private commonService: CommonServiceService, private http: HttpClient) { }
  // getAllDevice(data){
  //   return this.commonService.postService('v1//api/v1/devicesList', data);
  // }

  // addDevice(data){
  //   return this.commonService.postService('v1/devices', data);
  // }

  // getAllDevice(){
  //   return this.commonService.getService('v1/devicesList');
  // }

  ///Mock Data

  getAllDevice() {
    return this.http.get(this.url + 'v1/devicesList');
  }

  addDevice(data) {
    return this.http.post(this.url + 'v1/devices', data);
  }

  deleteDevice(id: any) {
    return this.http.delete(this.url + 'v1/devices/' + id);
  }
  editDevice(data: Device, id: string) {
    return this.http.put(this.url + 'v1/devices/update/' + id, data);
  }


}
