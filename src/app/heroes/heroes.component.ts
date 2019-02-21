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
  newHeroes: any[]
  character: string;
  batch = 0;
  offsetCount: number = 0;
  finished = false
  // array = [];
  array = [];
  sum = 100;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';

  constructor(private service: HeroService, private http: Http) { 
    this.appendItems(0, this.sum);
  }

  
  addItems(startIndex, endIndex, _method) {
    for (let i = 0; i < this.sum; ++i) {
      this.array[_method]([i, ' ', this.generateWord()].join(''));
    }
  }
  
  appendItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex, 'push');
  }
  
  
  // prependItems(startIndex, endIndex) {
  //   this.addItems(startIndex, endIndex, 'unshift');
  // }

  onScrollDown (ev) {
    console.log('scrolled down!!', ev);
    // get more movies
    this.getMoreMovies()
    // add another 20 items
    const start = this.sum;
    this.sum += 20;
    this.appendItems(start, this.sum);
    
    this.direction = 'down'
  }
  
  getMoreMovies() {
    this.batch += 50;
    console.log(this.batch)
    let url = "https://gateway.marvel.com:443/v1/public/characters?limit=50&offset="+this.batch+"&apikey=a2b97ce44d7dfdb3d3410ff2eeb8693b"
    console.log(url)
    this.http.get(url)
      .subscribe(response => {
        const data = response.json()
        this.newHeroes = data.data.results
        console.log(this.newHeroes)
      })
  }
  // onUp(ev) {
  //   console.log('scrolled up!', ev);
  //   const start = this.sum;
  //   this.sum += 20;
  //   this.prependItems(start, this.sum);
  
  //   this.direction = 'up';
  // }
  generateWord() {
    return Math.random() * 5000;
  }

  ngOnInit() {
    this.service.getAll()
      .subscribe(heroes => this.heroes = heroes.data.results)
  }

  

  filterSearch(batch, lastKey) {
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

  getImageUrl(hero) {
    const imgPath = hero.thumbnail.path
    const imgExtension = hero.thumbnail.extension
    return imgPath.concat('.', imgExtension)
  }
 
}
