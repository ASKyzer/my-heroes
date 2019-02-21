import { DataService } from './../services/data.service';
import { FilterService } from './../services/filter.service';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  character: string;
  heroes: any[];
  

  constructor(private http: Http) { 
   
  }
  
  filterSearch() {
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
    console.log(hero)
    const imgPath = hero.thumbnail.path
    const imgExtension = hero.thumbnail.extension
    return imgPath.concat('.', imgExtension)
  }

}
