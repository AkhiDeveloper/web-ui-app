import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  draw<T>(list: T[]): T{
    if(list.length < 1){
      throw new Error('List is empty');
    }
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
  }
}
