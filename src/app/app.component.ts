import { Component, Injector, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sistema Marco de Lista';
  usuarioLogin:boolean=false;

  constructor(_injector: Injector) {     
  }    

  ngAfterViewInit() {    
  }

  ngOnInit(): void {
  }

}
