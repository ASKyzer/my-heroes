import { HeroService } from './../services/hero.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: any[]
  currentHeroes: any[]
  selectedHero: any[]
  character: string = ''
  offset: number = 0
  finished = false
  throttle = 100
  scrollDistance = 1
  scrollUpDistance = 2
  direction = ''
  isOpen: boolean

  constructor(private heroService: HeroService) { 
  }

  onAllScroll (e) {
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

  filterSearch() {
    this.offset = 0
    if (this.character) {
    console.log(this.character)
    this.heroService.filterSearch(this.character)
      .subscribe(response => {
        const data = response.json()
        this.heroes = data.data.results
      })
    }
    else { this.ngOnInit() }
  }

  onFilterScroll () {
    console.log('on filer scroll called')
    this.getMoreFilterResults()
    this.direction = 'down'
  }
  
  getMoreFilterResults() {
    this.offset += 50; 
    this.heroService.getMoreFilterResults(this.character, this.offset)
      .subscribe(response => {
        const data = response.json()
        const currentHeroes = data.data.results
        this.concatHeroes(currentHeroes)
      })
  }


  resetSearch() {
    this.character = ''
    this.offset = 0
    console.log('clicked')
    this.ngOnInit()
  }

  concatHeroes(cur) {
    this.heroes = this.heroes.concat(cur)
  }

  ngOnInit() {
    this.isOpen = false;
    this.character = ''
    this.heroService.getAll()
      .subscribe(response => {
        const data = response.json()
        this.heroes = data.data.results
      })
  }

  classChangeEventFired(eventArgs) {
    this.isOpen = eventArgs
  }

  // searchFieldPressed(eventArgs) {
  //   this.character = eventArgs
  // }

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
