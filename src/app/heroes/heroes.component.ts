import { Http } from '@angular/http';
import { HeroService } from './../services/hero.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: any[]
  character: string;

  constructor(private service: HeroService, private http: Http) { 
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

  getImageUrl(hero) {
    const imgPath = hero.thumbnail.path
    const imgExtension = hero.thumbnail.extension
    return imgPath.concat('.', imgExtension)
  }
 
}
