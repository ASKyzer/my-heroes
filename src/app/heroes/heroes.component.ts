import { HeroService } from './../services/hero.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: any[]
  currentHeroes: any[]
  character: string;
  offset: number = 0;
  finished = false
  throttle = 100;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';
  isOpen: boolean;

  selectedHero: any

  constructor(private heroService: HeroService) { 
  }

  onScrollDown (e) {
    this.getMoreHeroes()
    this.direction = 'down'
  }
  
  getMoreHeroes() {
    this.offset += 50;    
    this.heroService.getMoreHeroes(this.offset)
      .subscribe(response => {
        const data = response.json()
        const currentHeroes = data.data.results
        this.concatHeroes(currentHeroes)
      })
  }

  concatHeroes(cur) {
    this.heroes = this.heroes.concat(cur)
  }

  ngOnInit() {
    this.isOpen = false;
    this.heroService.getAll()
      .subscribe(response => {
        const data = response.json()
        this.heroes = data.data.results
      })
  }

  classChangeEventFired(eventArgs) {
    this.isOpen = eventArgs
  }

  searchFieldPressed(eventArgs) {
    console.log("search field Pressed")
    console.log(eventArgs)
    this.character = eventArgs
  }

  concatImageUrl(hero) {
    const imgPath = hero.thumbnail.path + "/standard_fantastic"
    const imgExtension = hero.thumbnail.extension
    return imgPath.concat('.', imgExtension)
  }

  openSidePanel(hero) {
    this.isOpen = true
    this.selectedHero = hero
  }
 
}
