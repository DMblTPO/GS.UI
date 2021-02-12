import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '@app/components/login/login.component';
import { User } from '@app/models';
import { currentUserStor, GameStoreState, logoutUser, orderItemsQtyStor } from '@app/store';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {
  currentUser$: Observable<User>;
  shoppingCartCapacity$: Observable<number>;
  bsModalRef: BsModalRef;

  constructor(
    private readonly store: Store<GameStoreState>,
    private readonly router: Router,
    private readonly modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.store.select(currentUserStor);
    this.shoppingCartCapacity$ = this.store.select(orderItemsQtyStor);
  }

  openLoginModal() {
    this.currentUser$.pipe(first()).subscribe((user) => {
      if (!user) {
        this.bsModalRef = this.modalService.show(LoginComponent, {
          class: 'modal-padding-top',
        });
        this.bsModalRef.content.showAsModal = true;
        return;
      }
      this.router.navigate(['/']);
    });
  }

  logout() {
    this.store.dispatch(logoutUser());
  }
}
