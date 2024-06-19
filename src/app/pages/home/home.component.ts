import { NgIf } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControlStatus,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {
  ErrorMsgComponent,
  IErrorMsg
} from "../../components/error-msg/error-msg.component";
import { ClassByStateInputDirective } from "../../directives/class-by-state-input.directive";
import { IMAGES } from "../../helpers/images/index";
import { AuthService } from "../../services/auth/auth.service";
import { VerifyEmailValidatorService } from "../../validators/email/verify-email.service";
import { VerifyPasswordValidatorService } from "../../validators/password/verify-password.service";
import { validations } from "./validations";

@Component({
  selector: "validator-home",
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ErrorMsgComponent,
    ClassByStateInputDirective,
    NgIf
  ],
  providers: [AuthService, VerifyEmailValidatorService],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss"
})
export class HomeComponent {
  form!: FormGroup;
  validations: IErrorMsg = validations;
  clearStates: boolean = false;
  loadingEmail: boolean = false;
  // SHOW PASSWORDS
  showPassword: boolean = false;
  showPasswordConfirm: boolean = false;
  imageShowPassword: string = IMAGES["EYE_SLASH"];
  imageHidePassword: string = IMAGES["EYE"];

  constructor(
    private _fb: FormBuilder,
    private _verifyEmailValidator: VerifyEmailValidatorService,
    private _verifyPasswordValidator: VerifyPasswordValidatorService
  ) {
    this.buildForm();
    this.watchEmail();
  }

  buildForm(): void {
    this.form = this._fb.group(
      {
        name: [
          "",
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20)
          ]
        ],
        age: [
          "",
          [Validators.required, Validators.min(18), Validators.max(120)]
        ],
        email: [
          "",
          {
            validators: [Validators.required, Validators.email],
            asyncValidators: [this._verifyEmailValidator.verify()],
            updateOn: "blur"
          }
        ],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{8,20}$/
            )
          ]
        ],
        confirmPassword: ["", [Validators.required]]
      },
      {
        validators: [
          this._verifyPasswordValidator.verify("password", "confirmPassword")
        ]
      }
    );
  }

  watchEmail(): void {
    this.form
      .get("email")!
      .statusChanges.subscribe((value: FormControlStatus) => {
        if (value === "PENDING") this.loadingEmail = true;
        else this.loadingEmail = false;
      });
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      alert("Form send!");
      this.resetForm();
    }
  }

  resetForm(): void {
    this.form.patchValue({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
    this.form.reset();
    this.clearStates = true;
    setTimeout(() => (this.clearStates = false), 0);
  }
}
