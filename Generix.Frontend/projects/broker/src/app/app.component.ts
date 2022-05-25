import { Component } from '@angular/core';
import { faArrowLeft as fasArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowRight as fasArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';

@Component({
  selector: 'br-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly fasArrowLeft = fasArrowLeft;
  readonly fasArrowRight = fasArrowRight;
  title = 'broker';
  // currentUser: User = {} as any;

  // constructor(private router: Router, private authenticationService: AuthenticationService) {
  //   this.authenticationService.currentUser.subscribe((x) => (this.currentUser = x));
  // }

  // logout() {
  //   this.authenticationService.logout();
  //   this.router.navigate(['/login']);
  // }
}
