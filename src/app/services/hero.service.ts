import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private http: Http) {}

  getAll() {
    let url = "https://gateway.marvel.com:443/v1/public/characters?limit=50&apikey=a2b97ce44d7dfdb3d3410ff2eeb8693b"
    return this.http.get(url)
  }
    
  getMoreHeroes(offset) {
    let url = "https://gateway.marvel.com:443/v1/public/characters?limit=50&offset=" + offset + "&apikey=a2b97ce44d7dfdb3d3410ff2eeb8693b"
    return this.http.get(url)
  }

  filterSearchByStartsWith(letters) {
    let url: string = "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=" + letters +  "&limit=50&apikey=a2b97ce44d7dfdb3d3410ff2eeb8693b"
    return this.http.get(url);
  }

  getMoreFilterResults(letters, offset) {
    let url: string = "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=" + letters +  "&limit=50&offset=" + offset + "&apikey=a2b97ce44d7dfdb3d3410ff2eeb8693b"
    return this.http.get(url)
  }

}
