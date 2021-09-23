import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TooltipModule } from 'ng2-tooltip-directive';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { IdentityComponent } from './components/identity/identity.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CartridgeComponent } from './components/cartridge/cartridge.component';
import { DiscoveryComponent } from './components/discovery/discovery.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { TableModule } from 'primeng-lts/table';
import { ProtocolComponent } from './components/protocol/protocol.component';
import { DeviceTypeComponent } from './components/device-type/device-type.component';
import { DeviceModelMappingComponent } from './components/device-model-mapping/device-model-mapping.component';
import { VendorDeviceMetadataComponent } from './components/vendor-device-metadata/vendor-device-metadata.component';
import { AutoCompleteModule } from 'primeng-lts/autocomplete';
import { ProgressSpinnerModule } from 'primeng-lts/progressspinner';
import { UserCreationComponent } from './components/user-creation/user-creation.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { AllUsersListComponent } from './components/all-users-list/all-users-list.component';
import { DashboardViewComponent } from './components/dashboard-view/dashboard-view.component';
import { MaterialModule } from './shared/material/material.module';
import { AllCartridgesListComponent } from './components/all-cartridges-list/all-cartridges-list.component';
import { DeviceTypeListComponent } from './components/device-type-list/device-type-list.component';
import { DeviceTypeListViewDialogComponent } from './components/device-type-list-view-dialog/device-type-list-view-dialog.component';
import { DiscoveryScanListComponent } from './components/discovery-scan-list/discovery-scan-list.component';
import { DiscoveryScanDialogComponent } from './components/discovery-scan-dialog/discovery-scan-dialog.component';
import { DiscoveryScanDevicesComponent } from './components/discovery-scan-devices/discovery-scan-devices.component';
import { AllDevicesDeleteDialogComponent } from './components/all-devices-delete-dialog/all-devices-delete-dialog.component';
import { AllDevicesViewDialogComponent } from './components/devices/all-devices-view-dialog/all-devices-view-dialog.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AdminChangePasswordDialogComponent } from './components/admin-change-password-dialog/admin-change-password-dialog.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CartridgeConfigViewDialogComponent } from './components/cartridge-config-view-dialog/cartridge-config-view-dialog.component';
import { DeviceComponent } from './components/devices/add-device/device.component';
import { DeviceEditComponent } from './components/devices/edit-device/device-edit.component';
import { AllDevicesComponent } from './components/devices/all-devices/all-devices.component';
import { ConformationComponent } from './components/shared/conformation/conformation.component';
import { SignupComponent } from './components/signup/signup.component';
import { DataPanalComponent } from './components/data-panal/data-panal.component';
import { SafePipe } from './safe.pipe';
import { JsonAppConfigService } from 'src/config/json-app-config.service';
import { AppConfig } from 'src/config/app.config';
export function initializerFn(jsonAppConfigService: JsonAppConfigService) {
  return () => {
    return jsonAppConfigService.load();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideMenuComponent,
    IdentityComponent,
    DashboardComponent,
    CartridgeComponent,
    DiscoveryComponent,
    LoginComponent,
    FooterComponent,
    ProtocolComponent,
    DeviceTypeComponent,
    DeviceModelMappingComponent,
    VendorDeviceMetadataComponent,
    UserCreationComponent,
    AdminProfileComponent,
    AllDevicesComponent,
    AllUsersListComponent,
    DashboardViewComponent,
    AllCartridgesListComponent,
    DeviceTypeListComponent,
    DeviceTypeListViewDialogComponent,
    DiscoveryScanListComponent,
    DiscoveryScanDialogComponent,
    DiscoveryScanDevicesComponent,
    AllDevicesDeleteDialogComponent,
    AllDevicesViewDialogComponent,
    ForgotPasswordComponent,
    AdminChangePasswordDialogComponent,
    CartridgeConfigViewDialogComponent,
    DeviceComponent,
    DeviceEditComponent,
    ConformationComponent,
    SignupComponent,
    DataPanalComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000
    }),
    TableModule,
    AutoCompleteModule,
    ProgressSpinnerModule,
    TooltipModule,
    Ng2SearchPipeModule,
    ChartsModule,
    NgxSpinnerModule,
    MaterialModule
  ],
  exports: [
    MaterialModule
  ],
  providers: [ThemeService, NgxSpinnerService, { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: AppConfig,
      deps: [HttpClient],
      useExisting: JsonAppConfigService
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [JsonAppConfigService],
      useFactory: initializerFn
    }],
  entryComponents: [
    DeviceTypeListViewDialogComponent,
    DiscoveryScanDialogComponent,
    DiscoveryScanDevicesComponent,
    AllDevicesDeleteDialogComponent,
    AllDevicesViewDialogComponent,
    AdminChangePasswordDialogComponent,
    CartridgeConfigViewDialogComponent,
    ConformationComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
