import { Http } from '@angular/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';

@Injectable()
export class HeroService extends DataService {
  constructor(http: Http) {
    let url = "https://gateway.marvel.com:443/v1/public/characters?limit=50&apikey=a2b97ce44d7dfdb3d3410ff2eeb8693b"
    super(url, http)
   }
}
