import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '@app/components/login';
import { User } from '@app/models';
import { AuthenticationService } from '@app/services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {
  currentUser: User;
  bsModalRef: BsModalRef;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private changeDetector: ChangeDetectorRef,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    this.authenticationService.currentUser.subscribe((x) => {
      this.currentUser = x;
      this.changeDetector.markForCheck();
    });
  }

  openLoginModal() {
    this.bsModalRef = this.modalService.show(LoginComponent, { class: 'modal-padding-top' });
  }

  logout() {
    this.authenticationService.logout();
    // this.router.navigate(['/login']);
  }
}
