import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeatMapComponent } from './heat-map/heat-map.component';
import { TopVmsComponent } from './top-vms/top-vms.component';
import { SourceIpsComponent } from './source-ips/source-ips.component';
import { RouterModule } from '@angular/router';





@NgModule({
  declarations: [
    AppComponent,
    HeatMapComponent,
    TopVmsComponent,
    SourceIpsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'heat-map', component: HeatMapComponent },
      { path: 'top-vms', component: TopVmsComponent },
      { path: 'source-ips', component: SourceIpsComponent},
      { path: '', redirectTo: 'heat-map', pathMatch: 'full' },
      { path: '**', redirectTo: 'heat-map', pathMatch: 'full' },
    ])
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
