import { MainModule } from "./main/main.module";
import { MessageService, ConfirmationService } from "primeng/api";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";

// PrimeNG Components for demos
import { AccordionModule } from "primeng/accordion";
import { AutoCompleteModule } from "primeng/autocomplete";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { CardModule } from "primeng/card";
import { CarouselModule } from "primeng/carousel";
import { ChartModule } from "primeng/chart";
import { CheckboxModule } from "primeng/checkbox";
import { ChipsModule } from "primeng/chips";
import { CodeHighlighterModule } from "primeng/codehighlighter";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ColorPickerModule } from "primeng/colorpicker";
import { ContextMenuModule } from "primeng/contextmenu";
import { DataViewModule } from "primeng/dataview";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { FieldsetModule } from "primeng/fieldset";
import { FileUploadModule } from "primeng/fileupload";
import { FullCalendarModule } from "primeng/fullcalendar";
import { GalleriaModule } from "primeng/galleria";
import { InplaceModule } from "primeng/inplace";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { InputSwitchModule } from "primeng/inputswitch";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { LightboxModule } from "primeng/lightbox";
import { ListboxModule } from "primeng/listbox";
import { MegaMenuModule } from "primeng/megamenu";
import { MenuModule } from "primeng/menu";
import { MenubarModule } from "primeng/menubar";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { MultiSelectModule } from "primeng/multiselect";
import { OrderListModule } from "primeng/orderlist";
import { OrganizationChartModule } from "primeng/organizationchart";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { PaginatorModule } from "primeng/paginator";
import { PanelModule } from "primeng/panel";
import { PanelMenuModule } from "primeng/panelmenu";
import { PasswordModule } from "primeng/password";
import { PickListModule } from "primeng/picklist";
import { ProgressBarModule } from "primeng/progressbar";
import { RadioButtonModule } from "primeng/radiobutton";
import { RatingModule } from "primeng/rating";
import { RippleModule } from "primeng/ripple";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { SelectButtonModule } from "primeng/selectbutton";
import { SidebarModule } from "primeng/sidebar";
import { SlideMenuModule } from "primeng/slidemenu";
import { SliderModule } from "primeng/slider";
import { SpinnerModule } from "primeng/spinner";
import { SplitButtonModule } from "primeng/splitbutton";
import { StepsModule } from "primeng/steps";
import { TabMenuModule } from "primeng/tabmenu";
import { TableModule } from "primeng/table";
import { TabViewModule } from "primeng/tabview";
import { TerminalModule } from "primeng/terminal";
import { TieredMenuModule } from "primeng/tieredmenu";
import { ToastModule } from "primeng/toast";
import { ToggleButtonModule } from "primeng/togglebutton";
import { ToolbarModule } from "primeng/toolbar";
import { TooltipModule } from "primeng/tooltip";
import { TreeModule } from "primeng/tree";
import { TreeTableModule } from "primeng/treetable";
import { VirtualScrollerModule } from "primeng/virtualscroller";

// Application Components
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppMainComponent } from "./app.main.component";
import { AppNotfoundComponent } from "./pages/app.notfound.component";
import { AppErrorComponent } from "./pages/app.error.component";
import { AppAccessdeniedComponent } from "./pages/app.accessdenied.component";
import { AppLoginComponent } from "./pages/app.login.component";
import { AppCrudComponent } from "./pages/app.crud.component";
import { AppCalendarComponent } from "./pages/app.calendar.component";
import { AppMenuComponent } from "./app.menu.component";
import { AppMenuitemComponent } from "./app.menuitem.component";
import { AppBreadcrumbComponent } from "./app.breadcrumb.component";
import { AppConfigComponent } from "./app.config.component";
import { AppRightPanelComponent } from "./app.rightpanel.component";
import { AppTopBarComponent } from "./app.topbar.component";
import { AppFooterComponent } from "./app.footer.component";

// Demo pages
import { DashboardDemoComponent } from "./demo/view/dashboarddemo.component";
import { FormLayoutDemoComponent } from "./demo/view/formlayoutdemo.component";
import { InputDemoComponent } from "./demo/view/inputdemo.component";
import { ButtonDemoComponent } from "./demo/view/buttondemo.component";
import { TableDemoComponent } from "./demo/view/tabledemo.component";
import { ListDemoComponent } from "./demo/view/listdemo.component";
import { TreeDemoComponent } from "./demo/view/treedemo.component";
import { PanelsDemoComponent } from "./demo/view/panelsdemo.component";
import { OverlaysDemoComponent } from "./demo/view/overlaysdemo.component";
import { MediaDemoComponent } from "./demo/view/mediademo.component";
import { MenusDemoComponent } from "./demo/view/menusdemo.component";
import { MessagesDemoComponent } from "./demo/view/messagesdemo.component";
import { MiscDemoComponent } from "./demo/view/miscdemo.component";
import { EmptyDemoComponent } from "./demo/view/emptydemo.component";
import { ChartsDemoComponent } from "./demo/view/chartsdemo.component";
import { FileDemoComponent } from "./demo/view/filedemo.component";
import { DocumentationComponent } from "./demo/view/documentation.component";
import { DisplayComponent } from "./utilities/display.component";
import { ElevationComponent } from "./utilities/elevation.component";
import { FlexboxComponent } from "./utilities/flexbox.component";
import { GridComponent } from "./utilities/grid.component";
import { IconsComponent } from "./utilities/icons.component";
import { SpacingComponent } from "./utilities/spacing.component";
import { TypographyComponent } from "./utilities/typography.component";
import { TextComponent } from "./utilities/text.component";
import { WidgetsComponent } from "./utilities/widgets.component";
import { OverlayModule } from "@angular/cdk/overlay";
import { DragDropModule } from "primeng/dragdrop";

// Demo services
// import { CountryService } from "./demo/service/countryservice";
// import { EventService } from "./demo/service/eventservice";
// import { NodeService } from "./demo/service/nodeservice";
// import { CustomerService } from "./demo/service/customerservice";
// import { PhotoService } from "./demo/service/photoservice";
// import { ProductService } from "./demo/service/productservice";
// import { IconService } from "./demo/service/iconservice";

// Application services
import { BreadcrumbService } from "./breadcrumb.service";
import { MenuService } from "./app.menu.service";
import { AppCodeModule } from "./app.code.component";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { SpinnerComponentComponent } from "./spinner-component/spinner-component.component";
import { ApiLoadingComponent } from "./components/api-loading/api-loading.component";
import { ChartWidgetComponent } from "./components/chart-widget/chart-widget.component";
import { ContactComponent } from "./components/contact/contact.component";
import { CreateButtonComponent } from "./components/create-button/create-button.component";
import { StickyNoteComponent } from "./components/sticky-note/sticky-note.component";
import { ApiInterceptor } from "./interceptors/api.interceptor";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { NgIdleKeepaliveModule } from "@ng-idle/keepalive";

const config = {
  apiKey: "F1312cd3123123YY1231122I41248o21412894H2G24h41829312312NKA132",
  authDomain: "drunbackend.herokuapp.com",
  projectId: "Drun",
  storageBucket: "drunbackend.herokuapp.com",
  messagingSenderId: "995912706561",
  appId: "1:995912706561:web:f7e52139b03e85fa45ae00",
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AppCodeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AccordionModule,
    AutoCompleteModule,
    BreadcrumbModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CarouselModule,
    ChartModule,
    CheckboxModule,
    ChipsModule,
    CodeHighlighterModule,
    ConfirmDialogModule,
    ColorPickerModule,
    ContextMenuModule,
    DataViewModule,
    DialogModule,
    DropdownModule,
    FieldsetModule,
    FileUploadModule,
    FullCalendarModule,
    GalleriaModule,
    InplaceModule,
    InputMaskModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    LightboxModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    OrderListModule,
    OrganizationChartModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    PickListModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    RippleModule,
    ScrollPanelModule,
    SelectButtonModule,
    SidebarModule,
    SlideMenuModule,
    SliderModule,
    SpinnerModule,
    SplitButtonModule,
    StepsModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TerminalModule,
    TieredMenuModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeTableModule,
    VirtualScrollerModule,
    ProgressBarModule,
    DragDropModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    OverlayModule,
    ReactiveFormsModule,
    MainModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    NgIdleKeepaliveModule.forRoot(),
    ProgressSpinnerModule,
  ],
  declarations: [
    AppComponent,
    AppMainComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    AppTopBarComponent,
    AppFooterComponent,
    AppRightPanelComponent,
    AppConfigComponent,
    AppBreadcrumbComponent,
    AppNotfoundComponent,
    AppErrorComponent,
    AppAccessdeniedComponent,
    AppLoginComponent,
    AppCrudComponent,
    AppCalendarComponent,
    DashboardDemoComponent,
    FormLayoutDemoComponent,
    InputDemoComponent,
    ButtonDemoComponent,
    TableDemoComponent,
    ListDemoComponent,
    TreeDemoComponent,
    PanelsDemoComponent,
    OverlaysDemoComponent,
    MediaDemoComponent,
    MenusDemoComponent,
    MessagesDemoComponent,
    MessagesDemoComponent,
    MiscDemoComponent,
    ChartsDemoComponent,
    EmptyDemoComponent,
    FileDemoComponent,
    DocumentationComponent,
    DisplayComponent,
    ElevationComponent,
    FlexboxComponent,
    GridComponent,
    IconsComponent,
    SpacingComponent,
    TypographyComponent,
    TextComponent,
    WidgetsComponent,
    SpinnerComponentComponent,
    ApiLoadingComponent,
    ChartWidgetComponent,
    ContactComponent,
    CreateButtonComponent,
    StickyNoteComponent,
  ],
  entryComponents: [ApiLoadingComponent],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    MenuService,
    BreadcrumbService,
    MessageService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
  exports: [ContactComponent, AppTopBarComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
