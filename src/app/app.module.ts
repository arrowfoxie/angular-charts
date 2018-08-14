import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules, Routes, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { BrandkitModule } from '@armor/brandkit';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxEchartsModule } from 'ngx-echarts';

import { AppComponent } from './app.component';
import { HeatMapComponent } from './heat-map/heat-map.component';
import { TopVmsComponent } from './top-vms/top-vms.component';
import { SourceIpsComponent } from './source-ips/source-ips.component';
import { MobileMapComponent } from './heat-map/mobile-map.component';
import { BothMapComponent } from './both-map/both-map.component';
import { ZeroStateComponent } from './zero-state/zero-state.component';

const desktop_routes: Routes = [
  { path: 'heat-map', component: BothMapComponent },
  { path: 'top-vms', component: TopVmsComponent },
  { path: 'source-ips', component: SourceIpsComponent },
  { path: 'zero-state', component: ZeroStateComponent },
  { path: '', redirectTo: 'heat-map', pathMatch: 'full' },
  { path: '**', redirectTo: 'heat-map', pathMatch: 'full' },
];


@NgModule({
  declarations: [
    AppComponent,
    HeatMapComponent,
    TopVmsComponent,
    SourceIpsComponent,
    MobileMapComponent,
    BothMapComponent,
    ZeroStateComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(desktop_routes, { preloadingStrategy: PreloadAllModules }),
    NgxEchartsModule,
    HttpClientModule,
    HttpModule,
    NgbModule,
    BrandkitModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
