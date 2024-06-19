import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, Observable } from "rxjs";

export interface IVerifyEmailResponse {
  exists: boolean;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  verifyEmail(email: string): Observable<IVerifyEmailResponse> {
    return this._http
      .post<IVerifyEmailResponse>("assets/api/verify-email.json", { email })
      .pipe(delay(2000));
  }
}
