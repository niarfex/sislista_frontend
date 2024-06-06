import { Component, Injector, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class AuthComponent implements OnInit { 

    public constructor(injector: Injector,private _router: Router) {

    }

    ngOnInit(): void {
        
    }   
}
