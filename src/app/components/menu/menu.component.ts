import { Component, Injector, OnInit } from '@angular/core';
import { LoginService } from 'src/auth/services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(_injector: Injector,private loginService: LoginService) { }

  ngOnInit(): void {
  }
  logout(){
    this.loginService.logout();
  }
}
