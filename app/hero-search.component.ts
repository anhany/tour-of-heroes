import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { HeroSearchService } from './hero-search.service';
import { Hero } from './hero';

@Component({
  selector: 'hero-search',
  templateUrl: 'app/hero-search.component.html',
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit{
  constructor(private heroSearchService: HeroSearchService,
      private router: Router) {}

  heroes: Observable<Hero>;
  searchSubject = new Subject<string>();
  search(term: string) {
    this.searchSubject.next(term);
  }

  ngOnInit(){
    this.heroes = this.searchSubject
      .asObservable() // cast as observable
      .debounceTime(300) // wait for 300ms pause in events
      .distinctUntilChanged() // ignore if next search term is same as previous
      .switchMap(term => term ? this.heroSearchService.search(term) : Observable.of<Hero[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.throw(error);
      });
  }

  gotoDetail(hero: Hero) {
    this.router.navigate(['/detail',hero.id]);
  }

}