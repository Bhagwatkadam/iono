import { Injectable } from '@angular/core';
import { CommonServiceService } from './common-service.service';

@Injectable({
  providedIn: 'root'
})
export class CartridgeService {

  constructor(
    private commonService :CommonServiceService,
  ) { }

  cartridgePost(data){
    return this.commonService.postService('v1/admin/cartridge', data)
  }
  getCartridge(){
    return this.commonService.getService("v1/admin/cartridges");
  }
  updateCatridge(id,data){
    return this.commonService.putService("v1/admin/cartridge/"+id,data);
  }
  deleteCatridge(id){
    return this.commonService.deleteService("v1/admin/cartridge/"+id);
  }
  getConnectivityProtocols(){
    return this.commonService.getService("v1/admin/cartridge/lookupCodes?lkupType=CONNECTIVITY&lkupSubType=PROTOCOL");
  }
  getConnectivityProtocolParameters(protocol){
    return this.commonService.getService(`v1/admin/cartridge/lookupValues?lkupType=CONNECTIVITY&lkupSubType=PROTOCOL&lkupCode=${protocol}`);
  }
  getDeviceTypes(){
    return this.commonService.getService("v1/admin/cartridge/lookupCodes?lkupType=DEVICEMODELING&lkupSubType=DEVICETYPE");
  }
  getDeviceTypeParameters(deviceType){
    return this.commonService.getService(`v1/admin/cartridge/lookupValues?lkupType=DEVICEMODELING&lkupSubType=DEVICETYPE&lkupCode=${deviceType}`);
  }
  getCartridgeById(id){
    return this.commonService.getService(`v1/admin/cartridge/${id}`);
  }

  getUiLabels(){
    return this.commonService.tempCartridgeGetService(`v1/uiLabels`);
  }

  getParamValueTypes(){
    return this.commonService.tempCartridgeGetService(`v1/paramValueTypes`);
  }

  createDeviceType(data){
    return this.commonService.tempCartridgePostService(`v1/deviceTypes`, data);
  }

  getTempDeviceTypes(){
    return this.commonService.tempCartridgeGetService(`v1/deviceTypes`);
  }

  deleteTempDeviceTypes(deviceName){
    return this.commonService.tempCartridgeDeleteService(`v1/deviceTypes/${deviceName}`);
  }

  getTempDeviceTypeParameters(deviceType){
    return this.commonService.tempCartridgeGetService(`v1/deviceTypes/${deviceType}`);
  }

  getTempProtocols(){
    return this.commonService.tempCartridgeGetService(`v1/protocols`);
  }

  getProtocolParameters(protocol){
    return this.commonService.tempCartridgeGetService(`v1/protocolParams/byProtocol/${protocol}`);
  }

  getMandatoryProtocolParameters(protocol){
    return this.commonService.tempCartridgeGetService(`v1/protocolParams/mandatoryParams/${protocol}`);
  }
}
