import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeatMapComponent } from './heat-map/heat-map.component';
import { TopVmsComponent } from './top-vms/top-vms.component';
import { SourceIpsComponent } from './source-ips/source-ips.component';
import { RouterModule, PreloadAllModules, Routes, Router } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

const desktop_routes: Routes = [
{ path: 'heat-map', component: HeatMapComponent },
{ path: 'top-vms', component: TopVmsComponent },
{ path: 'source-ips', component: SourceIpsComponent },
{ path: '', redirectTo: 'heat-map', pathMatch: 'full' },
{ path: '**', redirectTo: 'heat-map', pathMatch: 'full' },
];

const mobile_routes: Routes = [
  {path: 'map-bar', component: HeatMapComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeatMapComponent,
    TopVmsComponent,
    SourceIpsComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(desktop_routes, {preloadingStrategy: PreloadAllModules}),
    NgxEchartsModule,
    HttpClientModule,
    HttpModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
