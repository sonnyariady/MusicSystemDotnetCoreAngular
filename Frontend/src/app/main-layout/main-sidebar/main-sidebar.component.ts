import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user.model';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styles: [
  ]
})
export class MainSidebarComponent implements OnInit {
  currentUser : User;
  constructor() { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(){
    if(localStorage.getItem('CurrentUser')){
      this.currentUser = JSON.parse(atob(localStorage.getItem('CurrentUser')));      
    }
  }

}
