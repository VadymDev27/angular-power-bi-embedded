import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/model/menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  sidebar_menu?: any[];

  constructor() { }

  ngOnInit() {
    this.sidebar_menu = new Menu().data;
  }

}
