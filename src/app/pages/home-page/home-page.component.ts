import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private router: Router) { }

  startDraw(){
    console.log('startDraw');
    this.router.navigate(['/group-draw']);
  }
}
