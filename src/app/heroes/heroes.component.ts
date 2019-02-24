import { Http } from '@angular/http';
import { HeroService } from './../services/hero.service';
import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash'
import { SidePanelComponent } from '../side-panel/side-panel.component';


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

  constructor(private service: HeroService, private http: Http) { 
  }

  onScrollDown (ev) {
    if (this.heroes.length > 49)
    this.getMoreHeroes()
    this.direction = 'down'
  }
  
  getMoreHeroes() {
    this.offset += 50;
    // console.log(this.offset)
    let url = "https://gateway.marvel.com:443/v1/public/characters?limit=50&offset=" + this.offset + "&apikey=a2b97ce44d7dfdb3d3410ff2eeb8693b"
    
    this.http.get(url)
      .subscribe(response => {
        const data = response.json()
        const currentHeroes = data.data.results
        // console.log(data)
        this.concatHeroes(currentHeroes)
      })
  }

  concatHeroes(cur) {
    // console.log("concat")
    this.heroes = this.heroes.concat(cur)
    // console.log(this.heroes)
  }

  ngOnInit() {
    this.isOpen = false;
    this.service.getAll()
      .subscribe(heroes => this.heroes = heroes.data.results)
  }

  filterSearch() {
    // console.log(this.heroes)
    // console.log(this.character)
    let url = "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=" + this.character +  "&limit=49&apikey=a2b97ce44d7dfdb3d3410ff2eeb8693b"
    // console.log(url)
    this.http.get(url)
      .subscribe(response => {
        const data = response.json()
        this.heroes = data.data.results
        // console.log(this.heroes)
      })
  }

  classChangeEventFired(eventArgs) {
    console.log("Heros Comp: the button was clicked")
    this.isOpen = eventArgs
    console.log(this.isOpen)
  }

  concatImageUrl(hero) {
    const imgPath = hero.thumbnail.path + "/standard_fantastic"
    const imgExtension = hero.thumbnail.extension
    return imgPath.concat('.', imgExtension)
  }

  openSidePanel(hero) {
    // console.log(hero)
    // console.log(this.isOpen)
    this.isOpen = true
    this.selectedHero = hero
    // console.log(this.isOpen)

  }
 
}
