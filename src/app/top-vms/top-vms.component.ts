import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-vms',
  templateUrl: './top-vms.component.html',
  styleUrls: ['./top-vms.component.css']
})
export class TopVmsComponent implements OnInit {

  public vms = 'VMs will show here';

  constructor() { }

  ngOnInit() {
  }

}
