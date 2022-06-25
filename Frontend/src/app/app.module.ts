import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule,APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import * as $ from "jquery";

//RootModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSoapModule, NgxSoapService } from 'ngx-soap';
import { ToastrModule } from "ngx-toastr";
import { FaultErrorInterceptor } from './_interceptor/faulterror.interceptor';
import { FormsModule, NG_VALIDATORS, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { DataTablesModule } from 'angular-datatables';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';

//RootService
import { GeneralService } from 'src/app/_services/general.service';

//RootComponent
import { HomeComponent } from './_pages/home/home.component';
import { MainLayoutComponent } from './main-layout/main-layout/main-layout.component';
import { MainHeaderComponent } from './main-layout/main-header/main-header.component';
import { MainSidebarComponent } from './main-layout/main-sidebar/main-sidebar.component';
import { MainFooterComponent } from './main-layout/main-footer/main-footer.component';
import { LoginLayoutComponent } from './login-layout/login-layout/login-layout.component';
import { LoginHeaderComponent } from './login-layout/login-header/login-header.component';
import { LoginFooterComponent } from './login-layout/login-footer/login-footer.component';
import { LoginComponent } from './_pages/login/login.component';
 
 

//EntryComponent
 
import { ForbiddenComponent } from './_pages/forbidden/forbidden.component';
import { NotFoundComponent } from './_pages/not-found/not-found.component';
 
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UserService } from './_services/user.service';
import { FormPopulatorService } from './_services/form-populator.service';
import { TaskToDoService } from './_services/task-to-do.service';
import { PinjamListComponent } from './_pages/Pinjam/pinjam-list/pinjam-list.component';
import { BukuListComponent } from './_pages/Buku/buku-list/buku-list.component';
import { PinjamCreateComponent } from './_pages/Pinjam/pinjam-create/pinjam-create.component';
import { BukuLookupComponent } from './_pages/Popups/buku-lookup/buku-lookup.component';
import { AnggotaListComponent } from './_pages/Anggota/anggota-list/anggota-list.component';
import { AnggotaCreateComponent } from './_pages/Anggota/anggota-create/anggota-create.component';
import { BukuCreateComponent } from './_pages/Buku/buku-create/buku-create.component';
import { MusicListComponent } from './_pages/Artist/music-list/music-list.component';
import { MusicCreateComponent } from './_pages/Artist/music-create/music-create.component';
import { PlayMusicLookupComponent } from './_pages/Popups/play-music-lookup/play-music-lookup.component';
 
 
//import { SearchEmployeePopupComponent } from './_pages/Popups/search-employee-popup/search-employee-popup.component';
//import { OccupantRoomDetailListComponent } from './_pages/Accomodation/occupant-room-detail-list/occupant-room-detail-list.component';
//import { OccupantPopupComponent } from './_pages/Popups/occupant-popup/occupant-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainLayoutComponent,
    MainHeaderComponent,
    MainSidebarComponent,
    MainFooterComponent,
    LoginLayoutComponent,
    LoginHeaderComponent,
    LoginFooterComponent,
    
    LoginComponent,
   
   
    ForbiddenComponent,
    NotFoundComponent,
    PinjamListComponent,
    BukuListComponent,
    PinjamCreateComponent,
    BukuLookupComponent,
    AnggotaListComponent,
    AnggotaCreateComponent,
    BukuCreateComponent,
    MusicListComponent,
    MusicCreateComponent,
    PlayMusicLookupComponent,
 
   
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatDialogModule,
    DataTablesModule,
    HttpClientModule,
    NgxSoapModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot() ,
    NgHttpLoaderModule.forRoot(),
    ToastrModule.forRoot({
      enableHtml:true
    }),
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    FormPopulatorService,
   
    UserService,
    
    TaskToDoService,
    
    DatePipe, CurrencyPipe,
    {
      provide: LOCALE_ID,
      useValue: 'en' // 'de' for Germany, 'fr' for France ...
     },
  ],entryComponents:[
    BukuLookupComponent,
    PlayMusicLookupComponent
 
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
/* 
export function loadClientUserService(service: UserService): Function 
{
  return () => { return service.loadClient() }; 
}

export function loadClientFormPopulatorService(service: FormPopulatorService): Function 
{
  return () => { return service.loadClient() }; 
}

export function loadClientTaskToDoService(service: TaskToDoService): Function 
{
  return () => { return service.loadClient() }; 
} */