import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable()
export class FilterService extends DataService {
  
  constructor(http: Http) { 
    super("https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=c&apikey=a2b97ce44d7dfdb3d3410ff2eeb8693b", http) 
  }
}
