import { MainRoutingModule } from "./main-routing.module";
import { MainComponent } from "./main.component";
import { TreeTableModule } from "primeng/treetable";
import { ChipsModule } from "primeng/chips";
import { ChipModule } from "primeng/chip";
import { CarouselModule } from "primeng/carousel";
import { StepsModule } from "primeng/steps";
import { NgModule } from "@angular/core";
import {
  CommonModule,
  CurrencyPipe,
  DatePipe,
  NgSwitch,
} from "@angular/common";

import { ProgressBarModule } from "primeng/progressbar";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { TabViewModule } from "primeng/tabview";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { SpinnerModule } from "primeng/spinner";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { DialogModule } from "primeng/dialog";
import { LoadingComponent } from "../components/loading/loading.component";
import { TooltipModule } from "primeng/tooltip";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { InputSwitchModule } from "primeng/inputswitch";
import { RadioButtonModule } from "primeng/radiobutton";
import { FileUploadModule } from "primeng/fileupload";
import { CardModule } from "primeng/card";
import { MultiSelectModule } from "primeng/multiselect";
import { TreeModule } from "primeng/tree";
import { KeyFilterModule } from "primeng/keyfilter";
import { ContactComponent } from "../components/contact/contact.component";
import { PanelModule } from "primeng/panel";
import { ChartModule } from "primeng/chart";
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from "primeng/dynamicdialog";
import { FieldsetModule } from "primeng/fieldset";
import { CalendarModule } from "primeng/calendar";
import { PickListModule } from "primeng/picklist";
import { TabMenuModule } from "primeng/tabmenu";
import { InputTextareaModule } from "primeng/inputtextarea";
import { AutoCompleteModule } from "primeng/autocomplete";
import { RatingModule } from "primeng/rating";
import { InputNumberModule } from "primeng/inputnumber";
import { DragDropModule } from "primeng/dragdrop";
import { HumanizePipe } from "../custom-pipes/humanize";
import { TimeoutComponent } from "../components/timeout/timeout.component";
import { CheckboxModule } from "primeng/checkbox";
import { SliderModule } from "primeng/slider";
import { SplitterModule } from "primeng/splitter";
import { DataViewModule } from "primeng/dataview";
import { MessageModule } from "primeng/message";
import { InputMaskModule } from "primeng/inputmask";
import { ConfirmationService } from "primeng/api";
import { NodeService } from "../demo/service/nodeservice";
import { ProductService } from "../demo/service/productservice";
import { AccordionModule } from "primeng/accordion";
import { AvatarModule } from "primeng/avatar";
import { AvatarGroupModule } from "primeng/avatargroup";
import { EventService } from "../demo/service/eventservice";
import { ToggleButtonModule } from "primeng/togglebutton";
import { KnobModule } from "primeng/knob";
import { FullCalendarModule } from "primeng/fullcalendar";
import { ToolbarModule } from "primeng/toolbar";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CustomerOnboardingComponent } from './customer/customer-onboarding/customer-onboarding.component';
import { CustomerOrderingComponent } from './customer/customer-ordering/customer-ordering.component';
import { CustomerReportingComponent } from './customer/customer-reporting/customer-reporting.component';
import { ProductSetupComponent } from './setup/product-setup/product-setup.component';
import { RoleSetupComponent } from './setup/role-setup/role-setup.component';
import { CustomerOrderApprovalComponent } from './customer/customer-ordering/customer-order-approval/customer-order-approval.component';
import { CustomerOrderViewComponent } from './customer/customer-ordering/customer-order-view/customer-order-view.component';
import { UserRoleSetupComponent } from './setup/user-role-setup/user-role-setup.component';
import { ProfileComponent } from './profile/profile.component';
import { UserSetupComponent } from './setup/user-setup/user-setup.component';
import { InventorySetupComponent } from './inventory/inventory-setup/inventory-setup.component';
import { InventoryItemRequestComponent } from './inventory/inventory-item-request/inventory-item-request.component';
import { InventoryItemApprovalComponent } from './inventory/inventory-item-approval/inventory-item-approval.component';
import { InventoryItemStoreComponent } from './inventory/inventory-item-store/inventory-item-store.component';

@NgModule({
  declarations: [
    MainComponent,
    LoadingComponent,
    HumanizePipe,
    TimeoutComponent,
    DashboardComponent,
    CustomerOnboardingComponent,
    CustomerOrderingComponent,
    CustomerReportingComponent,
    ProductSetupComponent,
    RoleSetupComponent,
    CustomerOrderApprovalComponent,
    CustomerOrderViewComponent,
    UserRoleSetupComponent,
    ProfileComponent,
    UserSetupComponent,
    InventorySetupComponent,
    InventoryItemRequestComponent,
    InventoryItemApprovalComponent,
    InventoryItemStoreComponent,
  ],
  imports: [
    AvatarModule,
    AvatarGroupModule,
    CommonModule,
    MainRoutingModule,
    ProgressBarModule,
    ButtonModule,
    InputNumberModule,
    ToolbarModule,
    InputMaskModule,
    KnobModule,
    RippleModule,
    TabViewModule,
    ToggleButtonModule,
    AccordionModule,
    CalendarModule,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule,
    FormsModule,
    TableModule,
    ToastModule,
    SpinnerModule,
    ProgressSpinnerModule,
    DialogModule,
    TooltipModule,
    ConfirmDialogModule,
    InputSwitchModule,
    RadioButtonModule,
    FileUploadModule,
    CardModule,
    MultiSelectModule,
    TreeModule,
    KeyFilterModule,
    PanelModule,
    ChartModule,
    FieldsetModule,
    CalendarModule,
    PickListModule,
    TabMenuModule,
    InputTextareaModule,
    AutoCompleteModule,
    RatingModule,
    DragDropModule,
    StepsModule,
    CheckboxModule,
    SliderModule,
    SplitterModule,
    DataViewModule,
    InputSwitchModule,
    CarouselModule,
    ChipsModule,
    ChipModule,
    TreeTableModule,
    MessageModule,
    FullCalendarModule,
  ],
  exports: [],
  providers: [
    DialogService,
    NgSwitch,
    DynamicDialogConfig,
    DynamicDialogRef,
    ConfirmationService,
    NodeService,
    ProductService,
    CurrencyPipe,
    DatePipe,
    EventService,
  ],
  entryComponents: [TimeoutComponent],
})
export class MainModule {}
