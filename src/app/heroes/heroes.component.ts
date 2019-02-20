import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  url = "https://gateway.marvel.com:443/v1/public/characters?apikey=a2b97ce44d7dfdb3d3410ff2eeb8693b"
  heroes = []

  constructor(http: Http) { 
    
    http.get(this.url)
      .subscribe(response => {
        const data = response.json().data
        this.heroes = data.results
        console.log(this.heroes)
      })
  }


  ngOnInit() {
  }

}
