import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from './services/auth.guard';
import { SideMenuComponent } from "./components/side-menu/side-menu.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { IdentityComponent } from "./components/identity/identity.component";
import { CartridgeComponent } from "./components/cartridge/cartridge.component";
import { DiscoveryComponent } from "./components/discovery/discovery.component";
import { LoginComponent } from "./components/login/login.component";
import { ProtocolComponent } from "./components/protocol/protocol.component";
import { DeviceTypeComponent } from "./components/device-type/device-type.component";
import { DeviceModelMappingComponent } from './components/device-model-mapping/device-model-mapping.component';
import { VendorDeviceMetadataComponent } from './components/vendor-device-metadata/vendor-device-metadata.component';
import { UserCreationComponent } from './components/user-creation/user-creation.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { AllUsersListComponent } from './components/all-users-list/all-users-list.component';
import { DashboardViewComponent } from './components/dashboard-view/dashboard-view.component';
import { AllCartridgesListComponent } from "./components/all-cartridges-list/all-cartridges-list.component";
import { DeviceTypeListComponent } from "./components/device-type-list/device-type-list.component";
import { DiscoveryScanListComponent } from "./components/discovery-scan-list/discovery-scan-list.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { DeviceComponent } from "./components/devices/add-device/device.component";
import { DeviceEditComponent } from "./components/devices/edit-device/device-edit.component";
import { AllDevicesComponent } from "./components/devices/all-devices/all-devices.component";
import { SignupComponent } from "./components/signup/signup.component";
import { DataPanalComponent } from "./components/data-panal/data-panal.component";

const routes: Routes = [
  // { path: "", redirectTo: "Sidemenu/Dashboard", pathMatch: "full" },
  { path: "", redirectTo: "client-login", pathMatch: "full" },
  { path: "client-login", component: LoginComponent },
  { path: "forgot-password", component: ForgotPasswordComponent },
  { path: "sign-up", component: SignupComponent },
  {
    path: "",
    component: SideMenuComponent, canActivate: [AuthGuard], children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "identity", component: IdentityComponent },
      { path: "cartridge-list", component: AllCartridgesListComponent },
      { path: "cartridge", component: CartridgeComponent },
      { path: "discovery-scan-list", component: DiscoveryScanListComponent },
      { path: "discovery", component: DiscoveryComponent },
      { path: "protocols", component: ProtocolComponent },
      { path: "device-type-list", component: DeviceTypeListComponent },
      { path: "device-types", component: DeviceTypeComponent },
      // { path: "device-mapping", component: DeviceModelMappingComponent },
      // { path: "vendor-device-metadeta", component: VendorDeviceMetadataComponent },
      { path: "user-management", component: UserCreationComponent },
      { path: "admin-profile", component: AdminProfileComponent },
      { path: "all-devices-list", component: AllDevicesComponent },
      { path: "device", component: DeviceComponent },
      { path: "edit-device", component: DeviceEditComponent },
      { path: "all-users-list", component: AllUsersListComponent },
      { path: "dashboard-view", component: DashboardViewComponent },
      { path: "data-panal", component: DataPanalComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
