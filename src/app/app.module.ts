import { SidePanelComponent } from './side-panel/side-panel.component';
import { FilterService } from './services/filter.service';
import { HeroService } from './services/hero.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { FilterComponent } from './filter/filter.component';
import { FormsModule }   from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    HeroesComponent,
    SidePanelComponent
  ],
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule,
    InfiniteScrollModule
  ],
  providers: [
    FilterService, 
    HeroService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
