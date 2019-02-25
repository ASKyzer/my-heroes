import { HeroService } from './../services/hero.service'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: any[]
  currentHeroes: any[]
  selectedHero: any[]
  character: string = ''
  offset: number = 0
  isOpen: boolean
  
  // Scroll variables
  throttle: number = 100
  scrollDistance: number = 1
  scrollUpDistance: number = 2
  direction = ''

  constructor(private heroService: HeroService) { 
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
    this.heroService.filterSearchByStartsWith(this.character)
      .subscribe(response => {
        const data = response.json()
        this.heroes = data.data.results
      })
    }
    else { this.ngOnInit() }
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

  onAllScroll () {
    this.getMoreHeroes()
    this.direction = 'down'
  }

  onFilterScroll () {
    this.getMoreFilterResults()
    this.direction = 'down'
  }
  
  resetSearch() {
    this.character = ''
    this.offset = 0
    this.ngOnInit()
  }

  classChangeEventFired(eventArgs) {
      this.isOpen = eventArgs
    }

  concatHeroes(currentHeroes) {
    this.heroes = [...this.heroes, ...currentHeroes]
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

  ngOnInit() {
    this.character = ''
    this.heroService.getAll()
      .subscribe(response => {
        const data = response.json()
        this.heroes = data.data.results
      })
  }
}
