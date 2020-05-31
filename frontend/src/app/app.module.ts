import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { VisualizerModule } from './visualizer/visualizer.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    VisualizerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
