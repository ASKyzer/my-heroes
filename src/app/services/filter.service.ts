import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FilterService  {
  
  constructor(private http: Http) { }

  filterSearch(firstLetter) {
    let url: string = "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=" + firstLetter +  "&limit=50&apikey=a2b97ce44d7dfdb3d3410ff2eeb8693b"
    return this.http.get(url);
  }

  getMoreFilterResults(firstLetter, offset) {
    let url: string = "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=" + firstLetter +  "&limit=50&offset=" + offset + "&apikey=a2b97ce44d7dfdb3d3410ff2eeb8693b"
    return this.http.get(url)
  }
}

