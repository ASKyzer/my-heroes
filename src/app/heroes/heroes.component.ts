import { Http } from '@angular/http';
import { HeroService } from './../services/hero.service';
import { Component, OnInit } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import * as _ from 'lodash'


@Component({
  selector: 'heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: any[]
  newHeroes = []
  currentHeroes: any[]
  character: string;
  offset: number = 0;
  finished = false
  throttle = 150;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';

  constructor(private service: HeroService, private http: Http) { 
  }

  onScrollDown (ev) {
    console.log('scrolled down!!', ev);
    this.getMoreHeroes()
    this.direction = 'down'
  }
  
  getMoreHeroes() {
    this.offset += 50;
    console.log(this.offset)
    let url = "https://gateway.marvel.com:443/v1/public/characters?limit=50&offset=" + this.offset + "&apikey=a2b97ce44d7dfdb3d3410ff2eeb8693b"
    
    this.http.get(url)
      .subscribe(response => {
        const data = response.json()
        const currentHeroes = data.data.results
        console.log(data)
        this.concatHeroes(currentHeroes)
      })
  }

  concatHeroes(cur) {
    console.log("concat")
    this.newHeroes = this.newHeroes.concat(cur)
    console.log(this.newHeroes)
  }

  ngOnInit() {
    this.service.getAll()
      .subscribe(heroes => this.heroes = heroes.data.results)
  }

  filterSearch() {
    console.log(this.heroes)
    console.log(this.character)
    let url = "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=" + this.character +  "&apikey=a2b97ce44d7dfdb3d3410ff2eeb8693b"
    console.log(url)
    this.http.get(url)
      .subscribe(response => {
        const data = response.json()
        this.heroes = data.data.results
        console.log(this.heroes)
      })
  }

  concatImageUrl(hero) {
    const imgPath = hero.thumbnail.path
    const imgExtension = hero.thumbnail.extension
    return imgPath.concat('.', imgExtension)
  }
 
}
