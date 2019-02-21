import { HeroService } from './../services/hero.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: any[]

  constructor(private service: HeroService) { 
  }

  ngOnInit() {
    this.service.getAll()
      .subscribe(heroes => this.heroes = heroes.data.results)
  }

  getImageUrl(hero) {
    console.log(hero)
    const imgPath = hero.thumbnail.path
    const imgExtension = hero.thumbnail.extension
    return imgPath.concat('.', imgExtension)
  }
 
}
