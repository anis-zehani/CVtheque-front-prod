import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Odix : le sourcing rendu facile';
  showHead = false;

  constructor(private router: Router) {
      // showHead = false si la Route = '/'
      router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
          if (event.url === '/' || event.url === '/login') {
            this.showHead = false;
          } else {
            this.showHead = true;
          }
        }
      });
    }
}
