import { HeroService } from './services/hero.service';
import { DataService } from './services/data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent
  ],
  imports: [
    HttpModule,
    BrowserModule
  ],
  providers: [
    DataService,
    HeroService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
