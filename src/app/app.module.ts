import { SidePanelComponent } from './side-panel/side-panel.component';
import { HeroService } from './services/hero.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { FormsModule }   from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    SidePanelComponent
  ],
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule,
    InfiniteScrollModule
  ],
  providers: [ HeroService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
