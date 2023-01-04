import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pipeMethod';

  heros = [
    { name: 'Miller', score: 0 },
    { name: 'John', score: 90 },
    { name: 'King', score: 50 },
    { name: 'Steve', score: 70 },
    { name: 'Sam', score: 100 },
  ]
}
