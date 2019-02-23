import { HeroService } from './../services/hero.service';
import { Component, OnInit, Input } from '@angular/core';
import { HeroesComponent } from '../heroes/heroes.component';

@Component({
  selector: 'side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit {
  @Input('selectedHero') selectedHero: any;

  hero = this.selectedHero

  constructor() { 

  }
  showCurrentHero(hero) {
    console.log('clicked')
    console.log(this.selectedHero)
    console.log(this.hero)
  }

  concatImageUrl(hero) {
    const imgPath = hero.thumbnail.path
    const imgExtension = hero.thumbnail.extension
    return imgPath.concat('.', imgExtension)
  }

  ngOnInit() {
  }

}
