import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NavStateService, IQuickNavOption, QuickNavOption, BreadcrumbComponent } from '@armor/brandkit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  constructor(private navStateService: NavStateService, protected router: Router) {
    this.navStateService.setNavState('collapsed');
  }

  public title = 'DYNAMIC THREAT BLOCKING';

  @ViewChild('breadcrumb')
  public breadcrumb: BreadcrumbComponent;

  public quickNavOptions = [
    new QuickNavOption('Geolocation Heat Map', 'heat-map'),
    new QuickNavOption('Top Ten VMs', 'top-vms'),
    new QuickNavOption('Top Ten Source Ips', 'source-ips'),
    new QuickNavOption('Zero State View', 'zero-state'),
  ];

  public ngAfterViewInit(): void {
    this.breadcrumb.quickNavSelectionChanged$.subscribe(async (selected: any) => {
      await this.router.navigateByUrl(selected);
    });
  }
}
