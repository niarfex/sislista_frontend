import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input, OnChanges, Injector } from '@angular/core';
import MetisMenu from 'metismenujs';
import { EventService } from 'src/shared/services/event.service';
import { Router, NavigationEnd } from '@angular/router';

import { HttpClient } from '@angular/common/http';

//import { MENU } from './Menu';
import { MenuItemGetDto } from 'src/app/models/MenuItem';
import { UsuarioServiceProxy } from 'src/shared/service-proxies/usuario-proxies';
import { finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

/**
 * Sidebar component
 */
export class SidebarComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('componentRef') scrollRef;
  @Input() isCondensed = false;
  menu: any;
  data: any;

  menuItems: MenuItemGetDto[] = [];

  @ViewChild('sideMenu') sideMenu: ElementRef;
  private usuarioServiceProxy: UsuarioServiceProxy;
  constructor(private eventService: EventService
    ,_injector: Injector
    , private spinner: NgxSpinnerService
    , private router: Router
    , private http: HttpClient) {
    this.usuarioServiceProxy = _injector.get(UsuarioServiceProxy);
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        //this._activateMenuDropdown();
        //this._scrollElement();
      }
    });
  }

  ngOnInit() {
    this.initialize();
    //this._scrollElement();   
    //this.menu = new MetisMenu(this.sideMenu.nativeElement);
  }

  ngAfterViewInit() {
    this.menu = new MetisMenu(this.sideMenu.nativeElement);
    //this._activateMenuDropdown();
  }

  toggleMenu(event) {
    //console.log("toggleMenu(event)");
    event.currentTarget.nextElementSibling.classList.toggle('mm-show');
  }

  ngOnChanges() {
    //console.log("ngOnChanges()");
    /*
    if (!this.isCondensed && this.sideMenu || this.isCondensed) {
      setTimeout(() => {
        this.menu = new MetisMenu(this.sideMenu.nativeElement);
      });
    } else if (this.menu) {
      this.menu.dispose();
    }*/
  }
  _scrollElement() {
    setTimeout(() => {
      if (document.getElementsByClassName("mm-active").length > 0) {
        const currentPosition = document.getElementsByClassName("mm-active")[0]['offsetTop'];
        if (currentPosition > 500)
          if (this.scrollRef.SimpleBar !== null)
            this.scrollRef.SimpleBar.getScrollElement().scrollTop =
              currentPosition + 300;
      }
      this.menu = new MetisMenu(this.sideMenu.nativeElement);
    }, 1000);
  }

  /**
   * remove active and mm-active class
   */
  /*_removeAllClass(className) {
    const els = document.getElementsByClassName(className);
    while (els[0]) {
      els[0].classList.remove(className);
    }
  }*/

  /**
   * Initialize
   */
  initialize(): void {
    //this.menuItems = MENU;
    this.usuarioServiceProxy.GetMenuItemxUsuario()
    .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
    .subscribe({
      next: (result) => {
        if (result.success) {
          //console.log(result);
          this.menuItems=result.datos;

          this._scrollElement(); 
          
        }


        //this.menu = new MetisMenu(this.sideMenu.nativeElement);


      }
      
    });
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItemGetDto) {
    //console.log(item.subItems !== undefined ? (item.subItems.length > 0) : false);
    return item.subItems !== undefined ? (item.subItems.length > 0) : false;
  }
}
