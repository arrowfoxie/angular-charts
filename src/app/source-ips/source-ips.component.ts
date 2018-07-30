import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-source-ips',
  templateUrl: './source-ips.component.html',
  styleUrls: ['./source-ips.component.css']
})
export class SourceIpsComponent implements OnInit {

  public ips = 'ips will show here';

  constructor() { }

  ngOnInit() {
  }

}
