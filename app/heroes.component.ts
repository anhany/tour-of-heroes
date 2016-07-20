import { Component } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { HeroDetailComponent } from './hero-detail.component'
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styleUrls: ['app/heroes.component.css'],
  directives: [HeroDetailComponent],
  providers: [],
})

export class HeroesComponent implements OnInit {
  constructor(private router: Router, private heroService: HeroService) { };

  heroes: Hero[];

  selectedHero : Hero;
  
  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero) { this.selectedHero = hero; }
  getHeroes() {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  gotoDetail() {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
} 
