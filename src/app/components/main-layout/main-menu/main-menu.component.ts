import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/models';
import { AuthenticationService } from '@app/services';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe((x) => {
      this.currentUser = x;
      this.changeDetector.markForCheck();
    });
  }

  logout() {
    this.authenticationService.logout();
    // this.router.navigate(['/login']);
  }
}
