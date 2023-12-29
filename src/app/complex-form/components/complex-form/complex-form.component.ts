import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith, tap } from 'rxjs';
import { ComplexFormService } from '../../services/complex-form.service';
import { validValidator } from '../../validators/valid.validator';
import { confirmEqualValidator } from '../../validators/confirm-equal.validator';

@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.component.html',
  styleUrls: ['./complex-form.component.scss']
})


export class ComplexFormComponent implements OnInit {

  loading = false;
  mainForm!: FormGroup;
  personalInfoForm!: FormGroup;
  contactPrefenceCtrl!: FormControl;
  emailCtrl!: FormControl;
  confirmEmailCtrl!: FormControl;
  emailForm!: FormGroup;
  phoneCtrl!: FormControl;
  passwordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;
  loginInfoForm!: FormGroup;

  showEmailCtrl$!: Observable<boolean>;
  showPhoneCtrl$!: Observable<boolean>;
  showEmailError$!: Observable<boolean>;
  showPasswordError$!: Observable<boolean>;




  constructor(private fb: FormBuilder,
    private complexFormService: ComplexFormService) {

  }


  ngOnInit(): void {
    this.initFormControls();
    this.initMainForm();
    this.intiFormObservables();
  }




  private intiFormObservables() {
    this.showEmailCtrl$ = this.contactPrefenceCtrl.valueChanges.pipe(
      startWith(this.contactPrefenceCtrl.value),
      map(preference => preference === 'email'),
      tap(showEmailCtrl => {
        this.setEmailValidators(showEmailCtrl)
      })
    );
    this.showPhoneCtrl$ = this.contactPrefenceCtrl.valueChanges.pipe(
      startWith(this.contactPrefenceCtrl.value),
      map(preference => preference === 'phone'),
      tap(showPhoneCtrl => {
        this.setPhoneValidators(showPhoneCtrl)
      })
    );
    this.showEmailError$ = this.emailForm.statusChanges.pipe(
      map(status => status === 'INVALID' &&
        this.emailCtrl.value &&
        this.confirmEmailCtrl.value)
    );
    this.showPasswordError$ = this.loginInfoForm.statusChanges.pipe(
      map(status => status === 'INVALID' &&
      this.passwordCtrl.value &&
      this.confirmPasswordCtrl.value &&
      this.loginInfoForm.hasError('confirmEqual')
    ))
  }

  private setEmailValidators(showEmailCtrl: boolean) {
    if (showEmailCtrl) {
      this.emailCtrl.addValidators([Validators.required, Validators.email, validValidator()])
      this.confirmEmailCtrl.addValidators([Validators.required, Validators.email])
    } else {
      this.confirmEmailCtrl.clearValidators();
      this.emailCtrl.clearValidators();
    }
    this.emailForm.updateValueAndValidity();
  }

  private setPhoneValidators(showPhoneCtrl: boolean) {
    if (showPhoneCtrl) {
      this.phoneCtrl.addValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
    } else {
      this.phoneCtrl.clearValidators();
    }
    this.phoneCtrl.updateValueAndValidity();
  }



  private initFormControls(): void {
    this.personalInfoForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      });

    this.contactPrefenceCtrl = this.fb.control('email');

    this.emailCtrl = this.fb.control('');
    this.confirmEmailCtrl = this.fb.control('');

    this.emailForm = this.fb.group({
      email: this.emailCtrl,
      confirm: this.confirmEmailCtrl
    }, {
      validators: [confirmEqualValidator('email', 'confirm')]

    });

    this.phoneCtrl = this.fb.control('');

    this.passwordCtrl = this.fb.control('', Validators.required);
    this.confirmPasswordCtrl = this.fb.control('', Validators.required);

    this.loginInfoForm = this.fb.group({
      username: ['', Validators.required],
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl
    }
    , {
      validators: [confirmEqualValidator('password', 'confirmPassword')],
    });
  }


  private initMainForm(): void {
    this.mainForm = this.fb.group({
      personalInfo: this.personalInfoForm,
      contactPreference: this.contactPrefenceCtrl,
      email: this.emailForm,
      phone: this.phoneCtrl,
      loginInfo: this.loginInfoForm,
    });
  }


  onSubmitForm() {
    console.table(this.mainForm.value);
    this.loading = true;
    this.complexFormService.saveUserInfo(this.mainForm.value).pipe(

      tap(sav => {
        this.loading = false;
        if (sav) {
          this.resetForm();
        } else {
          console.error('echec dans le bec')
        }

      }
      )
    ).subscribe();
  }


  private resetForm() {
    this.mainForm.reset();
    this.contactPrefenceCtrl.patchValue('email',);//('email',{emitEvent:false})
  }

  getFormErrorText(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
      return 'ce champs est requis';
    }
    else if (ctrl.hasError('email')) {
      return 'ce champs doit être un email valide';
    }else if (ctrl.hasError('validValidator')) {
      return 'il manque des quetrus genre VladLead';
    }
    else if (ctrl.hasError('minlength')) {
      return 'il manque des quetrus';
    }
    else if (ctrl.hasError('maxlength')) {
      return 'y a trop poto arrete toi à 10 chiffres';
    }
    else {
      return 'y a une couille dans la pathé';
    }

  }
}
