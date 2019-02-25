import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonMethodsService {

  constructor() { }

  concatArrays(arr1, arr2) {
    return [...arr1, ...arr2]
  }

  concatImageUrl(hero) {
    const imgPath = hero.thumbnail.path + "/standard_fantastic"
    const imgExtension = hero.thumbnail.extension
    return imgPath.concat('.', imgExtension)
  }

}
