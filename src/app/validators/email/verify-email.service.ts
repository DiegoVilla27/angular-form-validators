import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import {
  AuthService,
  IVerifyEmailResponse
} from "../../services/auth/auth.service";
import { UiService } from "../../services/ui/ui.service";

@Injectable({
  providedIn: "root"
})
export class VerifyEmailValidatorService {
  constructor(
    private authService: AuthService,
    private uiService: UiService
  ) {}

  verify(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: boolean } | null> => {
      if (!control.dirty) {
        return of(null);
      }

      return this.authService.verifyEmail(control.value).pipe(
        map((res: IVerifyEmailResponse) => {
          return res.exists ? { emailExists: true } : null;
        }),
        catchError(() => {
          this.uiService.toastShow(
            "¡No se ha podido validar el correo electrónico!",
            "warning",
            "bottom-right",
            "Intentalo de nuevo..."
          );
          return of({ emailError: true });
        })
      );
    };
  }
}
