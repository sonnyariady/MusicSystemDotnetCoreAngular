import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DropdownActionModel } from 'src/app/_models/dropdown-view-model.model';
import { User } from 'src/app/_models/user.model';
//import { SearchEmployeePopupComponent } from 'src/app/_pages/Popups/search-employee-popup/search-employee-popup.component';
import { GeneralService } from 'src/app/_services/general.service';
import { TaskToDoService } from 'src/app/_services/task-to-do.service';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styles: [
  ]
})
export class MainHeaderComponent implements OnInit {
  currentUser : User;
  appName = environment.appName;
  actionList : string;
  action : string;
  ListAvailableAction : DropdownActionModel[] = [];
  MainViewBag_SubTitle : string;
  ActionType : string = "";
  IsNeedActionDDL : boolean = false;
  AdhocPayroll : string = '';
  AdhocName : string = '';
  doactionParent : string = "";
  IsOpenAdhocVisible : boolean = false;
  selectedTextAction : string;
  validationType : number;
  LabelAdhoc : string;
  constructor(
    protected router : Router,
    private service : TaskToDoService,
    private dialog: MatDialog
    ) { 
      this.LabelAdhoc = "Select Adhoc";

      this.service.ddlEvent.subscribe(res=>{
        if(res!=null){
          
          var UrlContain = ["AccCreateRequest","AccReview","TransCreateRequest","TransReview", "AccWSACreateRequest"];
          var totalmatch = 0;
          UrlContain.forEach(element => {
            if (router.url.indexOf(element) >= 0)
            {
                totalmatch++;
               
            }
  
          });
          this.IsNeedActionDDL = totalmatch > 0;
          this.ListAvailableAction = res.ListAvailableAction;
          this.MainViewBag_SubTitle = res.MainViewBag_SubTitle;
          this.ActionType = res.ActionType;
  
          if (this.ListAvailableAction.length == 0)
          {
            this.doactionParent = "";
            this.IsOpenAdhocVisible = false;
            this.AdhocName = "";
            this.AdhocPayroll = "";
            this.ActionType = "";
          }
          
        }
      })
    }

  ngOnInit(): void {
    if(localStorage.getItem('CurrentUser')!=null){
      this.currentUser = JSON.parse(atob(localStorage.getItem('CurrentUser')));
    }else{
      this.router.navigateByUrl('login');
    }
  }

  @HostListener('window:scroll',['$event'])
  onWindowScroll(e){
    if(window.screen.width >768){
      if(window.pageYOffset>116){
        document.getElementById('top-navbar').classList.add('bg-white');
        document.getElementById('nav-btn-logout').classList.remove('d-none');
        }else if(window.pageYOffset<116){
          document.getElementById('top-navbar').classList.remove('bg-white');
          document.getElementById('nav-btn-logout').classList.add('d-none');
          }
        }
    }

    OnChangeDDLAction(e)
    {
      console.log("On Change DDL Action : ",e);
      if (this.ListAvailableAction.length == 0)
      {
        return;
      }
      var filterobj = this.ListAvailableAction.filter(a => a.FieldValue == this.doactionParent)[0];
      console.log("FilterOBj hasil filter: ", filterobj);
     // this.ListAreas.filter(a => a.Code == this.srcArea)[0].Name
      this.selectedTextAction = e.target.options[e.target.options.selectedIndex].text;
      console.log("Aksi terpilih text: ", this.selectedTextAction);
      console.log("Tipe validasi: " + filterobj.ValidationType + " untuk " + this.selectedTextAction);
      this.validationType = filterobj.ValidationType;
      if (this.selectedTextAction.toLocaleLowerCase() == "adhoc" || this.selectedTextAction.toLocaleLowerCase() == "ad hoc need info") 
      {
        this.IsOpenAdhocVisible = true;
      }
      else
      {
        this.IsOpenAdhocVisible = false;
      }
    //  console.log("Text terbaca: " + text);
    }

 

  

  get get_AllRequestActions()
  {
    return this.ListAvailableAction;
  }

  get get_MainViewBag_SubTitle()
  {
    return this.MainViewBag_SubTitle;
  }

   
  saveSendRequest()
  {
    //alert("Send request dari parent untuk aksi : " + this.doactionParent);
   
if (this.doactionParent == "" || this.doactionParent == undefined)
{
  alert("Please select the action!");
  return;
}

if (this.IsOpenAdhocVisible && this.AdhocName == "")
{
  alert("Please select employee for adhoc!");
  return;
}

console.log("Terbaca actiontype: ", this.ActionType);
    //console.log("Isi request child ", this.child.requestData);
 
       if (this.ActionType == "Transportation")
       {


        this.service.fireActionEventTrigger({ ActionType : "Transportation", FieldValue : this.doactionParent, FieldText : this.selectedTextAction, AdhocPayroll : this.AdhocPayroll, AdhocName : this.AdhocName, ValidationType : this.validationType });
    

        //TransEditReviewComponent.fireEvent.next({ FieldValue : this.doactionParent, FieldText : this.selectedTextAction, AdhocPayroll : this.AdhocPayroll, AdhocName : this.AdhocName, ValidationType : this.validationType });
       }
       else
       {
         console.log("Kirim untuk accomodation: ");
        this.service.fireActionEventTrigger({ ActionType : "Accomodation", FieldValue : this.doactionParent, FieldText : this.selectedTextAction, AdhocPayroll : this.AdhocPayroll, AdhocName : this.AdhocName, ValidationType : this.validationType });
        
        //AccEditReviewComponent.fireEvent.next({ FieldValue : this.doactionParent, FieldText : this.selectedTextAction, AdhocPayroll : this.AdhocPayroll, AdhocName : this.AdhocName, ValidationType : this.validationType });
       }
       
     
      

  }

  openAdhocEmployee()
  {
  /*   const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "100%";
     var openFrom = "Adhoc";

    dialogConfig.data = { openFrom };
    this.dialog.open(SearchEmployeePopupComponent, dialogConfig).afterClosed().subscribe(res => {
      if (res.Payroll != "") {
        
          this.AdhocPayroll = res.Payroll;
          this.AdhocName = res.FullName;
         
       this.LabelAdhoc = "Adhoc To: " + this.AdhocName;
         

      }
    }); */
  }


  logout(){
    localStorage.removeItem('CurrentUser');
    this.router.navigateByUrl('login');
  }

}
