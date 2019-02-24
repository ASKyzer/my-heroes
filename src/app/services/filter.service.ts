import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class FilterService  {
  
  constructor(private http: Http) { }

  filterSearch(firstLetter) {
    let url = "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=" + firstLetter +  "&limit=49&apikey=a2b97ce44d7dfdb3d3410ff2eeb8693b"
    return this.http.get(url);
  }
}

