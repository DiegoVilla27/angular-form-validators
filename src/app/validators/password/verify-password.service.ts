import { Injectable } from "@angular/core";
import { AbstractControl, ValidatorFn } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class VerifyPasswordValidatorService {
  constructor() {}

  verify(password: string, confirmPassword: string): ValidatorFn {
    return (group: AbstractControl): { [key: string]: boolean } | null => {
      const passwordControl = group.get(password);
      const confirmPasswordControl = group.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) return null;

      return passwordControl.value === confirmPasswordControl.value
        ? null
        : { verifyPass: true };
    };
  }
}
