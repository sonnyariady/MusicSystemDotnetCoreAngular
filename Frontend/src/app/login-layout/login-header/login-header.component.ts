import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styles: [
  ]
})
export class LoginHeaderComponent implements OnInit {
  appName = environment.appName;
  
  constructor() { }

  ngOnInit(): void {
  }

}
