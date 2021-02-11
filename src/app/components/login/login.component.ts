import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/services';
import { GameStoreState, loginSuccessUser } from '@app/store';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { first } from 'rxjs/operators';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = null;
  showAsModal = false;

  constructor(
    private readonly store: Store<GameStoreState>,
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService,
    private readonly bsModalRef: BsModalRef
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false, Validators.nullValidator],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  // convenience getter for easy access to form fields
  get frm() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .login(this.frm.username.value, this.frm.password.value)
      .pipe(first())
      .subscribe(
        (user) => {
          this.store.dispatch(loginSuccessUser({ user }));
          if (!this.showAsModal) {
            this.router.navigate([this.returnUrl]);
            return;
          }
          this.bsModalRef.hide();
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
  }
}
