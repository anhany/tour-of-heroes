import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

// import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {
  constructor(private http: Http) {};

  private heroesUrl = 'app/heroes';

  getHeroes() {
    // return Promise.resolve(HEROES);
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(resp => resp.json().data as Hero[])
      .catch(this.handleError);
  }
  getHero(id: number) {
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.id === id));
  }

  private post(hero: Hero): Promise<Hero> { // update an existing
    let headers = new Headers({
      'Content-Type':'application/json'
    });

    return this.http
      .post(this.heroesUrl, JSON.stringify(hero), {headers: headers})
      .toPromise()
      .then(resp => resp.json().data)
      .catch(this.handleError);
  }

  private put(hero: Hero) { // add a new
    let headers = new Headers();
    headers.append('Content-Type','application/json');

    let url = `${this.heroesUrl}/${hero.id}`;

    return this.http
      .put(url, JSON.stringify(hero), {headers: headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  save(hero: Hero) : Promise<Hero> {
    if (hero.id) {
      return this.put(hero);
    }
    return this.post(hero);
  }

  delete(hero: Hero) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');

    let url = `${this.heroesUrl}/${hero.id}`;

    return this.http
      .delete(url, {headers: headers})
      .toPromise()
      .catch(this.handleError);
  }


  private handleError(error: any) {
    console.error('An error has occured', error);
    return Promise.reject(error.message || error);
  }
}